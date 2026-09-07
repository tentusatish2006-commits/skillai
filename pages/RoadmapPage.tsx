import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { getCoursesForSkill, getRoadmapForRole, getSkillCategory } from '@/lib/skills';
import { GlowCard, AnimatedButton, fadeUp, stagger } from '@/components/ui';
import { Map as MapIcon, ChevronDown, CheckCircle2, PlayCircle, BookOpen, Lock, Sparkles, Zap, Target, Layers } from 'lucide-react';

interface RoadmapItem {
  id: string;
  skill_name: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface RoadmapNode {
  skill: string;
  category: string;
  phase: number;
  status: 'pending' | 'in_progress' | 'completed';
  id: string | null;
}

const PHASE_LABELS: Record<number, { label: string; color: string; icon: typeof Layers }> = {
  1: { label: 'Foundation', color: 'text-accent-400', icon: Layers },
  2: { label: 'Core Skills', color: 'text-amber-glow', icon: Target },
  3: { label: 'Advanced & Specialization', color: 'text-success', icon: Sparkles },
};

export function RoadmapPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<RoadmapNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [burst, setBurst] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [resumeSkills, setResumeSkills] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      // Prioritize the target role from the user's most recent resume upload,
      // since that reflects their latest career goal choice. Fall back to the
      // profile role only if no resume has been uploaded yet.
      let role = '';
      let skills: string[] = [];

      const { data: latestResume } = await supabase
        .from('resumes')
        .select('target_role, extracted_skills')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (latestResume?.target_role) {
        role = latestResume.target_role;
        skills = (latestResume.extracted_skills as string[] | null) ?? [];
      } else {
        role = profile?.target_role || '';
      }

      setResumeSkills(skills);
      setTargetRole(role);

      // Get all required skills for this role
      const roleSkills = getRoadmapForRole(role);

      if (roleSkills.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch existing roadmap_progress entries
      const { data: existing } = await supabase
        .from('roadmap_progress')
        .select('id, skill_name, status')
        .eq('user_id', user.id);

      const existingMap = new Map<string, RoadmapItem>();
      (existing as RoadmapItem[] | null)?.forEach((e) => existingMap.set(e.skill_name, e));

      // Build merged nodes: role skills + existing progress + auto-complete matched skills
      const merged: RoadmapNode[] = roleSkills.map((rs) => {
        const existingItem = existingMap.get(rs.skill);
        const hasSkill = skills.includes(rs.skill);
        let status: RoadmapNode['status'] = 'pending';
        let id: string | null = null;

        if (existingItem) {
          status = existingItem.status;
          id = existingItem.id;
        } else if (hasSkill) {
          status = 'completed';
        }

        return { skill: rs.skill, category: rs.category, phase: rs.phase, status, id };
      });

      setNodes(merged);

      // Auto-seed any missing roadmap_progress rows
      const toSeed = merged.filter((n) => !n.id);
      if (toSeed.length > 0) {
        const rows = toSeed.map((n) => ({
          user_id: user.id,
          skill_name: n.skill,
          status: n.status,
        }));
        const { data: seeded } = await supabase
          .from('roadmap_progress')
          .insert(rows)
          .select('id, skill_name, status');
        if (seeded) {
          const seededMap = new Map<string, string>();
          (seeded as RoadmapItem[]).forEach((s) => seededMap.set(s.skill_name, s.id));
          setNodes((prev) => prev.map((n) => ({ ...n, id: n.id ?? seededMap.get(n.skill) ?? null })));
        }
      }

      setLoading(false);
    })();
  }, [user, profile]);

  const cycleStatus = async (node: RoadmapNode) => {
    if (!node.id || !user) return;
    const order: RoadmapNode['status'][] = ['pending', 'in_progress', 'completed'];
    const next = order[(order.indexOf(node.status) + 1) % order.length];
    setNodes((prev) => prev.map((p) => (p.id === node.id ? { ...p, status: next } : p)));
    await supabase
      .from('roadmap_progress')
      .update({ status: next, updated_at: new Date().toISOString() })
      .eq('id', node.id);
    if (next === 'completed') {
      setBurst(node.id);
      setTimeout(() => setBurst(null), 1000);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-ink-700 border-t-accent-500 animate-spin" />
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <MapIcon className="mb-4 h-12 w-12 text-ink-500" />
        <h2 className="text-xl font-semibold text-ink-100">No roadmap yet</h2>
        <p className="mt-1 text-ink-400">
          {targetRole
            ? `No skills found for the role "${targetRole}". Try updating your target role.`
            : 'Set your target role in your profile or upload a resume to generate a personalized learning roadmap.'}
        </p>
        <AnimatedButton className="mt-6" onClick={() => navigate('upload')}>Upload Resume</AnimatedButton>
      </div>
    );
  }

  const completedCount = nodes.filter((n) => n.status === 'completed').length;
  const progressPct = Math.round((completedCount / nodes.length) * 100);

  // Group nodes by phase
  const phases = Array.from(new Set(nodes.map((n) => n.phase))).sort((a, b) => a - b);

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent-400" />
          <span className="text-sm text-ink-400">Target Role</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-ink-100 sm:text-3xl">{targetRole}</h1>
        <p className="mt-1 text-ink-400">Your personalized learning path based on the skills required for this role.</p>
      </motion.div>

      {/* progress bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-ink-300">
          <span>Overall Progress</span>
          <span>{completedCount}/{nodes.length} completed ({progressPct}%)</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-ink-700">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-amber-glow"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* role-based roadmap timeline */}
      <div ref={containerRef} className="relative">
        {/* vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-ink-700/60 sm:left-8" />
        <motion.div
          className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-accent-500 to-amber-glow sm:left-8"
          initial={{ height: 0 }}
          animate={{ height: `${progressPct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
          {phases.map((phase) => {
            const phaseNodes = nodes.filter((n) => n.phase === phase);
            const phaseConfig = PHASE_LABELS[phase] ?? PHASE_LABELS[2];
            const PhaseIcon = phaseConfig.icon;
            const phaseCompleted = phaseNodes.filter((n) => n.status === 'completed').length;

            return (
              <div key={phase}>
                {/* phase header */}
                <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3 pl-16 sm:pl-20">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-ink-800/60 border border-ink-600/40`}>
                    <PhaseIcon className={`h-4 w-4 ${phaseConfig.color}`} />
                  </div>
                  <div>
                    <h2 className={`font-display text-sm font-bold ${phaseConfig.color}`}>
                      Phase {phase}: {phaseConfig.label}
                    </h2>
                    <p className="text-xs text-ink-500">{phaseCompleted}/{phaseNodes.length} completed</p>
                  </div>
                </motion.div>

                {/* phase nodes */}
                <div className="space-y-4">
                  {phaseNodes.map((item, idx) => {
                    const courses = getCoursesForSkill(item.skill);
                    const isOpen = expanded === (item.id ?? item.skill);
                    const statusConfig = {
                      completed: { icon: <CheckCircle2 className="h-5 w-5 text-success" />, ring: 'border-success/40 bg-success/10', label: 'Completed' },
                      in_progress: { icon: <PlayCircle className="h-5 w-5 text-amber-glow" />, ring: 'border-amber-glow/40 bg-amber-glow/10', label: 'In Progress' },
                      pending: { icon: <Lock className="h-5 w-5 text-ink-400" />, ring: 'border-ink-600/40 bg-ink-800/40', label: 'Pending' },
                    }[item.status];

                    const wasMatched = resumeSkills.includes(item.skill);

                    return (
                      <motion.div key={item.id ?? item.skill} variants={fadeUp} className="relative pl-16 sm:pl-20">
                        {/* node marker */}
                        <motion.div
                          drag
                          dragConstraints={containerRef}
                          dragElastic={0.15}
                          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                          whileDrag={{ scale: 1.15, zIndex: 50 }}
                          onClick={() => cycleStatus(item)}
                          className={`absolute left-0 top-2 flex h-12 w-12 cursor-grab items-center justify-center rounded-full border-2 ${statusConfig.ring} backdrop-blur-sm transition-all active:cursor-grabbing sm:h-16 sm:w-16`}
                        >
                          {statusConfig.icon}
                          {burst === item.id && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-success"
                              initial={{ scale: 1, opacity: 0.8 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          )}
                          {item.status === 'in_progress' && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-amber-glow"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>

                        {/* content card */}
                        <GlowCard className="overflow-hidden" hover={false}>
                          <button
                            onClick={() => setExpanded(isOpen ? null : (item.id ?? item.skill))}
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="rounded-md bg-ink-700/50 px-1.5 py-0.5 text-[10px] text-ink-400">{item.category}</span>
                                <h3 className="font-display font-semibold text-ink-100">{item.skill}</h3>
                                {wasMatched && item.status === 'completed' && (
                                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                                    From your resume
                                  </span>
                                )}
                              </div>
                              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                item.status === 'completed' ? 'bg-success/15 text-success' :
                                item.status === 'in_progress' ? 'bg-amber-glow/15 text-amber-glow' : 'bg-ink-700/50 text-ink-400'
                              }`}>
                                {statusConfig.label}
                              </span>
                            </div>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                              <ChevronDown className="h-5 w-5 text-ink-400" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-ink-700/40 p-4">
                                  <div className="mb-3 flex items-center gap-2 text-sm text-ink-300">
                                    <BookOpen className="h-4 w-4 text-accent-400" />
                                    Recommended Resources
                                  </div>
                                  {courses.length > 0 ? (
                                    <div className="space-y-2">
                                      {courses.map((c) => (
                                        <div key={c.id} className="flex items-center justify-between rounded-lg bg-ink-800/40 px-3 py-2">
                                          <div>
                                            <p className="text-sm font-medium text-ink-100">{c.title}</p>
                                            <p className="text-xs text-ink-400">{c.provider} · {c.duration} · {c.type === 'free' ? 'Free' : c.price}</p>
                                          </div>
                                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg bg-accent-500/15 px-3 py-1.5 text-xs font-medium text-accent-400 hover:bg-accent-500/25">
                                            View
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-ink-500">No specific courses found — check the Courses page for general options.</p>
                                  )}
                                  <div className="mt-4 flex gap-2">
                                    <AnimatedButton variant="secondary" onClick={() => navigate('quiz')} className="text-sm">
                                      <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Take Quiz</span>
                                    </AnimatedButton>
                                    <AnimatedButton variant="ghost" onClick={() => navigate('courses')} className="text-sm">
                                      Browse Courses
                                    </AnimatedButton>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </GlowCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {progressPct === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 flex flex-col items-center gap-3 text-center"
        >
          <div className="flex items-center gap-2 text-success">
            <Sparkles className="h-6 w-6" />
            <p className="font-display text-lg font-semibold">All skills completed! You're job-ready!</p>
          </div>
          <AnimatedButton onClick={() => navigate('report')}>View Final Report</AnimatedButton>
        </motion.div>
      )}
    </div>
  );
}
