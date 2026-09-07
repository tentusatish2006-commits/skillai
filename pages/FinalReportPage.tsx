import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { AnimatedCounter, GlowCard, AnimatedButton, ProgressRing, fadeUp, stagger } from '@/components/ui';
import { FileText, CheckCircle2, PlayCircle, Clock, Award, TrendingUp, Download, Share2, ArrowRight, Sparkles } from 'lucide-react';

interface ReportData {
  matchPercentage: number;
  targetRole: string;
  extractedSkills: string[];
  missingSkills: string[];
  roadmap: { completed: number; total: number; inProgress: number };
  quizzes: { skill: string; score: number; total: number }[];
}

export function FinalReportPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: resume } = await supabase
        .from('resumes')
        .select('match_percentage, target_role, extracted_skills, missing_skills')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const { data: rp } = await supabase
        .from('roadmap_progress')
        .select('skill_name, status')
        .eq('user_id', user.id);

      const { data: quizzes } = await supabase
        .from('quiz_attempts')
        .select('skill_name, score, total')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (resume) {
        const rpData = rp ?? [];
        setData({
          matchPercentage: resume.match_percentage as number,
          targetRole: (resume.target_role as string) || profile?.target_role || '',
          extractedSkills: resume.extracted_skills as string[],
          missingSkills: resume.missing_skills as string[],
          roadmap: {
            completed: rpData.filter((p) => p.status === 'completed').length,
            inProgress: rpData.filter((p) => p.status === 'in_progress').length,
            total: rpData.length,
          },
          quizzes: (quizzes ?? []).map((q) => ({ skill: q.skill_name, score: q.score, total: q.total })),
        });
      }
      setLoading(false);
    })();
  }, [user, profile]);

  useEffect(() => {
    if (data && data.matchPercentage >= 70) {
      const t = setTimeout(() => setShowCertificate(true), 1500);
      return () => clearTimeout(t);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-ink-700 border-t-accent-500 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <FileText className="mb-4 h-12 w-12 text-ink-500" />
        <h2 className="text-xl font-semibold text-ink-100">No report yet</h2>
        <p className="mt-1 text-ink-400">Upload your resume and complete some roadmap steps to generate a report.</p>
        <AnimatedButton className="mt-6" onClick={() => navigate('upload')}>Upload Resume</AnimatedButton>
      </div>
    );
  }

  const mastered = data.roadmap.completed;
  const inProgress = data.roadmap.inProgress;
  const pending = data.roadmap.total - mastered - inProgress;
  const avgQuizScore = data.quizzes.length > 0
    ? Math.round((data.quizzes.reduce((acc, q) => acc + q.score / q.total, 0) / data.quizzes.length) * 100)
    : 0;

  const handleDownload = () => {
    const text = `SKILL GAP ANALYZER — FINAL REPORT
================================
Name: ${profile?.full_name || 'User'}
Target Role: ${data.targetRole}
Date: ${new Date().toLocaleDateString()}

READINESS SCORE: ${data.matchPercentage}%

SKILLS MASTERED: ${mastered}
SKILLS IN PROGRESS: ${inProgress}
SKILLS PENDING: ${pending}

EXTRACTED SKILLS: ${data.extractedSkills.join(', ')}

MISSING SKILLS: ${data.missingSkills.join(', ')}

QUIZ PERFORMANCE:
${data.quizzes.map((q) => `  ${q.skill}: ${q.score}/${q.total}`).join('\n') || '  No quizzes taken yet'}

NEXT STEPS:
1. Complete remaining roadmap skills
2. Take quizzes to verify knowledge
3. Enroll in courses for pending skills
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skill-gap-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `I'm ${data.matchPercentage}% job-ready for ${data.targetRole}! Using Skill Gap Analyzer to close my skill gaps.`;
    if (navigator.share) {
      try { await navigator.share({ title: 'My Skill Gap Report', text: shareText }); } catch { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">Final Report</h1>
        <p className="mt-1 text-ink-400">Your upskilling journey summary and next steps.</p>
      </motion.div>

      <div ref={reportRef} className="mx-auto max-w-4xl space-y-6">
        {/* score reveal */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <GlowCard className="flex flex-col items-center p-8" hover={false}>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Overall Readiness</h2>
            </div>
            <div className="relative">
              <ProgressRing value={data.matchPercentage} size={220} stroke={16} />
              {/* shimmer sweep on the number */}
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <div
                  className="text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 1.5s linear',
                  }}
                >
                  {data.matchPercentage}%
                </div>
              </motion.div>
            </div>
            <p className="mt-4 text-center text-ink-300">
              {data.matchPercentage >= 80 ? 'Outstanding! You are well-prepared for your target role.' :
               data.matchPercentage >= 60 ? 'Great progress — a few more skills to go!' :
               data.matchPercentage >= 40 ? 'Good start. Keep working through your roadmap.' :
               'Just getting started. Your roadmap will guide you.'}
            </p>
            <p className="mt-1 text-sm text-ink-400">Target: {data.targetRole}</p>
          </GlowCard>
        </motion.div>

        {/* summary cards */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <motion.div variants={fadeUp}>
            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="text-sm text-ink-300">Mastered</span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-success">
                <AnimatedCounter value={mastered} />
              </p>
              <p className="text-xs text-ink-400">skills completed</p>
            </GlowCard>
          </motion.div>
          <motion.div variants={fadeUp}>
            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-amber-glow" />
                <span className="text-sm text-ink-300">In Progress</span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-amber-glow">
                <AnimatedCounter value={inProgress} />
              </p>
              <p className="text-xs text-ink-400">skills started</p>
            </GlowCard>
          </motion.div>
          <motion.div variants={fadeUp}>
            <GlowCard className="p-5">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-ink-400" />
                <span className="text-sm text-ink-300">Pending</span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-ink-200">
                <AnimatedCounter value={pending} />
              </p>
              <p className="text-xs text-ink-400">not yet started</p>
            </GlowCard>
          </motion.div>
        </motion.div>

        {/* quiz performance */}
        {data.quizzes.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlowCard className="p-6" hover={false}>
              <h2 className="mb-4 font-display text-lg font-semibold text-ink-100">Quiz Performance</h2>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-ink-300">Average Score</span>
                <span className="font-display text-2xl font-bold text-accent-400">{avgQuizScore}%</span>
              </div>
              <div className="space-y-2">
                {data.quizzes.slice(0, 5).map((q, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-ink-800/40 px-3 py-2">
                    <span className="text-sm text-ink-100">{q.skill}</span>
                    <span className={`text-sm font-medium ${q.score / q.total >= 0.7 ? 'text-success' : 'text-amber-glow'}`}>
                      {q.score}/{q.total}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* certificate */}
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <GlowCard className="relative overflow-hidden p-8 text-center" hover={false}>
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(20,216,196,0.3), transparent, rgba(255,181,71,0.3), transparent)',
                  }}
                />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 12 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-glow/15 glow-amber"
                  >
                    <Award className="h-10 w-10 text-amber-glow" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-bold text-gradient">Certificate of Achievement</h2>
                  <p className="mt-2 text-ink-300">This certifies that</p>
                  <p className="font-display text-xl font-semibold text-ink-100">{profile?.full_name || 'User'}</p>
                  <p className="mt-2 text-ink-300">has achieved {data.matchPercentage}% readiness for</p>
                  <p className="font-display text-lg font-semibold text-accent-400">{data.targetRole}</p>
                  <p className="mt-3 text-xs text-ink-500">{new Date().toLocaleDateString()}</p>
                </div>
              </GlowCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* next steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <GlowCard className="p-6" hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Recommended Next Steps</h2>
            </div>
            <ol className="space-y-3">
              {[
                pending > 0 ? `Complete the ${pending} remaining skill${pending > 1 ? 's' : ''} in your roadmap` : 'Review your roadmap to keep skills fresh',
                'Take quizzes for all mastered skills to verify your knowledge',
                'Enroll in courses for any pending skills you haven\'t started',
                data.matchPercentage < 80 ? 'Aim for 80%+ readiness to unlock your certificate' : 'You\'ve unlocked your certificate — congratulations!',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-xs font-bold text-accent-400">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink-200">{step}</span>
                </li>
              ))}
            </ol>
          </GlowCard>
        </motion.div>

        {/* action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4 pb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <AnimatedButton onClick={handleDownload} className="flex items-center gap-2 animate-pulse-glow">
              <Download className="h-4 w-4" /> Download Report
            </AnimatedButton>
            <AnimatedButton variant="secondary" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </AnimatedButton>
          </div>
          <AnimatedButton variant="ghost" onClick={() => navigate('roadmap')} className="flex items-center gap-2 text-sm">
            Continue Learning <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}
