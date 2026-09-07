import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { ProgressRing, Typewriter, GlowCard, AnimatedButton, fadeUp, stagger } from '@/components/ui';
import { Upload, Map, HelpCircle, TrendingUp, Target, Clock, BookOpen, CheckCircle2, Circle, PlayCircle } from 'lucide-react';

interface ResumeData {
  match_percentage: number;
  extracted_skills: string[];
  missing_skills: string[];
  target_role: string;
}

export function DashboardPage() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [roadmapProgress, setRoadmapProgress] = useState<{ completed: number; total: number } | null>(null);
  const [latestQuiz, setLatestQuiz] = useState<{ skill_name: string; score: number; total: number } | null>(null);
  const [whatIf, setWhatIf] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: r } = await supabase
        .from('resumes')
        .select('match_percentage, extracted_skills, missing_skills, target_role')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (r) setResume(r as ResumeData);

      const { data: rp } = await supabase
        .from('roadmap_progress')
        .select('skill_name, status')
        .eq('user_id', user.id);
      if (rp && rp.length > 0) {
        setRoadmapProgress({
          completed: rp.filter((p) => p.status === 'completed').length,
          total: rp.length,
        });
      }

      const { data: q } = await supabase
        .from('quiz_attempts')
        .select('skill_name, score, total')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (q) setLatestQuiz(q as { skill_name: string; score: number; total: number });
    })();
  }, [user]);

  const readinessScore = resume?.match_percentage ?? 0;
  const previewScore = Math.min(100, readinessScore + whatIf);
  const hasData = !!resume;

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">
          Welcome back,{' '}
          <Typewriter text={profile?.full_name?.split(' ')[0] || 'Learner'} className="text-gradient" />
        </h1>
        <p className="mt-1 text-ink-400">
          {hasData
            ? `Targeting ${resume.target_role} — let's close those gaps.`
            : 'Upload your resume to begin your journey to job-ready.'}
        </p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* readiness ring with draggable what-if marker */}
        <motion.div variants={fadeUp} className="lg:col-span-1">
          <GlowCard className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Job Readiness</h2>
            </div>
            <div className="flex flex-col items-center">
              <div ref={ringRef} className="relative">
                <ProgressRing
                  value={previewScore}
                  size={180}
                  label={whatIf > 0 ? 'projected' : 'current'}
                />
                {/* draggable what-if marker */}
                {hasData && (
                  <motion.div
                    drag="y"
                    dragConstraints={ringRef}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                    whileDrag={{ scale: 1.2 }}
                    onDrag={(_, info) => {
                      const delta = Math.round(-info.offset.y / 4);
                      setWhatIf(Math.max(0, Math.min(100 - readinessScore, delta)));
                    }}
                    className="absolute -right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-ink-950 shadow-lg glow-accent active:cursor-grabbing"
                    title="Drag to preview 'what if I complete more skills'"
                  >
                    ↕
                  </motion.div>
                )}
              </div>
              {whatIf > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-center text-xs text-accent-300"
                >
                  If you close {whatIf}% more, you'd reach {previewScore}%
                </motion.p>
              )}
              {!hasData && (
                <p className="mt-3 text-center text-xs text-ink-400">
                  Upload a resume to calculate your score
                </p>
              )}
            </div>
          </GlowCard>
        </motion.div>

        {/* stat cards */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GlowCard className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-glow" />
                  <span className="text-sm text-ink-300">Target Role</span>
                </div>
              </div>
              <p className="mt-3 font-display text-lg font-semibold text-ink-100">
                {profile?.target_role || 'Not set'}
              </p>
            </GlowCard>

            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-ink-300">Skills You Have</span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-ink-100">
                {resume?.extracted_skills?.length ?? 0}
              </p>
            </GlowCard>

            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-error" />
                <span className="text-sm text-ink-300">Skills to Learn</span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-ink-100">
                {resume?.missing_skills?.length ?? 0}
              </p>
            </GlowCard>

            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-accent-400" />
                <span className="text-sm text-ink-300">Roadmap Progress</span>
              </div>
              <p className="mt-3 font-display text-2xl font-bold text-ink-100">
                {roadmapProgress ? `${roadmapProgress.completed}/${roadmapProgress.total}` : '—'}
              </p>
              {roadmapProgress && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                  <motion.div
                    className="h-full rounded-full bg-accent-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(roadmapProgress.completed / roadmapProgress.total) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              )}
            </GlowCard>
          </div>
        </motion.div>
      </motion.div>

      {/* quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="mb-4 font-display text-lg font-semibold text-ink-100">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <QuickAction
            icon={<Upload className="h-6 w-6" />}
            label="Upload Resume"
            desc="Extract your skills with AI"
            onClick={() => navigate('upload')}
          />
          <QuickAction
            icon={<Map className="h-6 w-6" />}
            label="View Roadmap"
            desc="Your personalized learning path"
            onClick={() => navigate('roadmap')}
          />
          <QuickAction
            icon={<HelpCircle className="h-6 w-6" />}
            label="Take Quiz"
            desc="Test your knowledge"
            onClick={() => navigate('quiz')}
          />
        </div>
      </motion.div>

      {/* recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="mb-4 font-display text-lg font-semibold text-ink-100">Recent Activity</h2>
        <GlowCard className="divide-y divide-ink-700/40" hover={false}>
          {latestQuiz ? (
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15">
                <PlayCircle className="h-5 w-5 text-accent-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-100">Quiz: {latestQuiz.skill_name}</p>
                <p className="text-xs text-ink-400">Scored {latestQuiz.score}/{latestQuiz.total}</p>
              </div>
              <Clock className="h-4 w-4 text-ink-500" />
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 text-ink-400">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm">No activity yet — upload your resume to get started!</p>
            </div>
          )}
          {hasData && (
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-glow/15">
                <Target className="h-5 w-5 text-amber-glow" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-100">Resume analyzed</p>
                <p className="text-xs text-ink-400">{resume.extracted_skills.length} skills found, {resume.missing_skills.length} gaps identified</p>
              </div>
            </div>
          )}
        </GlowCard>
      </motion.div>
    </div>
  );
}

function QuickAction({ icon, label, desc, onClick }: { icon: React.ReactNode; label: string; desc: string; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass card-trace group rounded-2xl p-5 text-left"
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400 transition-all group-hover:bg-accent-500/25 group-hover:glow-accent">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-ink-100">{label}</h3>
      <p className="mt-1 text-sm text-ink-400">{desc}</p>
    </motion.button>
  );
}
