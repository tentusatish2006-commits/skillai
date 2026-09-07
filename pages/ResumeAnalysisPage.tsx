import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { ProgressRing, GlowCard, AnimatedButton, popIn, stagger, fadeUp } from '@/components/ui';
import { FileSearch, Target, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Analysis {
  id: string;
  extracted_skills: string[];
  required_skills: string[];
  missing_skills: string[];
  match_percentage: number;
  target_role: string;
}

export function ResumeAnalysisPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('resumes')
        .select('id, extracted_skills, required_skills, missing_skills, match_percentage, target_role')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      setAnalysis(data as Analysis | null);
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-ink-700 border-t-accent-500 animate-spin" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <FileSearch className="mb-4 h-12 w-12 text-ink-500" />
        <h2 className="text-xl font-semibold text-ink-100">No analysis yet</h2>
        <p className="mt-1 text-ink-400">Upload your resume to see the skill comparison here.</p>
        <AnimatedButton className="mt-6" onClick={() => navigate('upload')}>Upload Resume</AnimatedButton>
      </div>
    );
  }

  const matched = analysis.required_skills.filter((s) => analysis.extracted_skills.includes(s));

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">Resume Analysis</h1>
        <p className="mt-1 text-ink-400">
          Comparing your skills against the requirements for{' '}
          <span className="font-medium text-accent-400">{analysis.target_role}</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* match score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <GlowCard className="flex flex-col items-center p-6" hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Match Score</h2>
            </div>
            <ProgressRing value={analysis.match_percentage} size={180} label="match" />
            <div className="mt-4 flex w-full justify-around text-center">
              <div>
                <p className="font-display text-2xl font-bold text-success">{matched.length}</p>
                <p className="text-xs text-ink-400">Matched</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-error">{analysis.missing_skills.length}</p>
                <p className="text-xs text-ink-400">Missing</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-ink-200">{analysis.required_skills.length}</p>
                <p className="text-xs text-ink-400">Required</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* skill comparison */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <GlowCard className="p-6" hover={false}>
            <h2 className="mb-4 font-display text-lg font-semibold text-ink-100">Skill Comparison</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* your skills */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <h3 className="text-sm font-medium text-ink-300">Your Skills ({analysis.extracted_skills.length})</h3>
                </div>
                <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-wrap gap-2">
                  {analysis.extracted_skills.length === 0 ? (
                    <p className="text-sm text-ink-500">No skills detected</p>
                  ) : (
                    analysis.extracted_skills.map((skill) => {
                      const isMatched = analysis.required_skills.includes(skill);
                      return (
                        <motion.span
                          key={skill}
                          variants={popIn}
                          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                            isMatched
                              ? 'bg-success/15 text-success border border-success/30'
                              : 'bg-ink-700/50 text-ink-300 border border-ink-600/40'
                          }`}
                        >
                          {skill}
                        </motion.span>
                      );
                    })
                  )}
                </motion.div>
              </div>

              {/* missing skills */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-error" />
                  <h3 className="text-sm font-medium text-ink-300">Missing Skills ({analysis.missing_skills.length})</h3>
                </div>
                <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-wrap gap-2">
                  {analysis.missing_skills.length === 0 ? (
                    <p className="text-sm text-success">No gaps — you're fully matched!</p>
                  ) : (
                    analysis.missing_skills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={popIn}
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="rounded-lg bg-error/10 px-3 py-1.5 text-sm font-medium text-error border border-error/30"
                      >
                        {skill}
                      </motion.span>
                    ))
                  )}
                </motion.div>
              </div>
            </div>

            {/* match bar */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-ink-400">
                <span>Required Skills Coverage</span>
                <span>{analysis.match_percentage}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-amber-glow"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.match_percentage}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center gap-4 text-center"
      >
        <div className="flex items-center gap-2 text-ink-300">
          <Sparkles className="h-5 w-5 text-accent-400" />
          <p>Ready to close the gap? Your personalized roadmap is ready.</p>
        </div>
        <AnimatedButton onClick={() => navigate('roadmap')} className="flex items-center gap-2">
          View My Roadmap <ArrowRight className="h-4 w-4" />
        </AnimatedButton>
      </motion.div>
    </div>
  );
}
