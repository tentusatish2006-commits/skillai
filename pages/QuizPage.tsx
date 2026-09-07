import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { getQuizForSkill } from '@/lib/skills';
import { GlowCard, AnimatedButton, fadeUp } from '@/components/ui';
import { HelpCircle, Check, X, Clock, ChevronRight, Trophy, RotateCcw, Zap } from 'lucide-react';
import type { QuizQuestion } from '@/types';

type Phase = 'select' | 'playing' | 'done';

export function QuizPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('select');
  const [skill, setSkill] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: resume } = await supabase
        .from('resumes')
        .select('missing_skills')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (resume?.missing_skills) setMissingSkills(resume.missing_skills as string[]);
    })();
  }, [user]);

  // timer
  useEffect(() => {
    if (phase !== 'playing' || showFeedback) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, showFeedback]);

  const startQuiz = (s: string) => {
    setSkill(s);
    setQuestions(getQuizForSkill(s));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowFeedback(false);
    setTimeLeft(20);
    setPhase('playing');
  };

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const correct = idx === questions[current].correctIndex;
    setAnswers((prev) => [...prev, { correct }]);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      finishQuiz();
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFeedback(false);
      setTimeLeft(20);
    }
  };

  const finishQuiz = async () => {
    const score = answers.filter((a) => a.correct).length;
    if (user) {
      await supabase.from('quiz_attempts').insert({
        user_id: user.id,
        skill_name: skill,
        score,
        total: questions.length,
        answers,
      });
      // mark skill as in_progress in roadmap
      await supabase
        .from('roadmap_progress')
        .update({ status: score / questions.length >= 0.7 ? 'completed' : 'in_progress', updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('skill_name', skill);
    }
    setPhase('done');
  };

  const score = answers.filter((a) => a.correct).length;
  const scorePct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  // --- SELECT PHASE ---
  if (phase === 'select') {
    return (
      <div className="px-4 py-8 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">Skill Quizzes</h1>
          <p className="mt-1 text-ink-400">Test your knowledge and track your progress.</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <GlowCard className="p-6" hover={false}>
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Choose a skill to test</h2>
            </div>
            {missingSkills.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-ink-400">Based on your resume analysis, these are your gap skills:</p>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((s) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startQuiz(s)}
                      className="rounded-xl border border-ink-600/40 bg-ink-800/50 px-4 py-2.5 text-sm font-medium text-ink-100 transition-all hover:border-accent-500/60 hover:bg-accent-500/10 hover:glow-accent"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-ink-400">Upload a resume to see your gap skills, or pick from common skills below.</p>
            )}

            <div className="mt-6 border-t border-ink-700/40 pt-4">
              <p className="mb-3 text-sm text-ink-400">Or try any skill:</p>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Python', 'SQL', 'Docker', 'Git'].map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startQuiz(s)}
                    className="rounded-xl border border-ink-600/40 bg-ink-800/50 px-3 py-2 text-sm text-ink-300 transition-all hover:border-accent-500/40 hover:text-ink-100"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    );
  }

  // --- DONE PHASE ---
  if (phase === 'done') {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <GlowCard className="p-8 text-center" hover={false}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent-500/15 glow-accent"
            >
              <Trophy className="h-10 w-10 text-amber-glow" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-ink-100">Quiz Complete!</h2>
            <p className="mt-1 text-ink-400">{skill}</p>

            <div className="my-6">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                className={`font-display text-5xl font-bold ${scorePct >= 70 ? 'text-success' : 'text-amber-glow'}`}
              >
                {score}/{questions.length}
              </motion.p>
              <p className="mt-1 text-sm text-ink-400">{scorePct}% correct</p>
            </div>

            {scorePct >= 70 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-success">
                Great job! This skill has been marked as completed in your roadmap.
              </motion.p>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-amber-glow">
                Keep practicing — this skill is now marked as in progress.
              </motion.p>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <AnimatedButton variant="secondary" onClick={() => setPhase('select')}>
                <span className="flex items-center gap-2"><RotateCcw className="h-4 w-4" /> Another Quiz</span>
              </AnimatedButton>
              <AnimatedButton onClick={() => navigate('roadmap')}>
                <span className="flex items-center gap-2">Back to Roadmap <ChevronRight className="h-4 w-4" /></span>
              </AnimatedButton>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    );
  }

  // --- PLAYING PHASE ---
  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        {/* header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-accent-400" />
              <h1 className="font-display text-lg font-semibold text-ink-100">{skill}</h1>
            </div>
            <span className="text-sm text-ink-400">Question {current + 1} of {questions.length}</span>
          </div>
          {/* progress dots */}
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i < current ? 'bg-accent-500' : i === current ? 'bg-accent-400' : 'bg-ink-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* timer bar */}
        <motion.div
          className="mb-6 h-2 overflow-hidden rounded-full bg-ink-700"
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: timeLeft > 10 ? 'var(--color-accent-500)' : timeLeft > 5 ? 'var(--color-amber-glow)' : 'var(--color-error)',
            }}
            animate={{ width: `${(timeLeft / 20) * 100}%` }}
            transition={{ ease: 'linear' }}
          />
        </motion.div>

        {/* question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <GlowCard className="p-6" hover={false}>
              <h2 className="mb-6 text-lg font-medium text-ink-100">{q.question}</h2>
              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const isAnswerCorrect = idx === q.correctIndex;
                  let style = 'border-ink-600/40 bg-ink-800/40 text-ink-200 hover:border-accent-500/40';
                  if (showFeedback) {
                    if (isAnswerCorrect) style = 'border-success/50 bg-success/10 text-success glow-success';
                    else if (isSelected) style = 'border-error/50 bg-error/10 text-error glow-error';
                    else style = 'border-ink-600/30 bg-ink-800/30 text-ink-500';
                  } else if (isSelected) {
                    style = 'border-accent-500/60 bg-accent-500/10 text-ink-100';
                  }
                  return (
                    <motion.button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleAnswer(idx)}
                      whileHover={!showFeedback ? { scale: 1.02, x: 4 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                      animate={showFeedback && isSelected && !isCorrect ? { x: [-5, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${style}`}
                    >
                      <span>{opt}</span>
                      {showFeedback && isAnswerCorrect && <Check className="h-5 w-5 shrink-0" />}
                      {showFeedback && isSelected && !isAnswerCorrect && <X className="h-5 w-5 shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center justify-between"
                >
                  <p className={`text-sm font-medium ${isCorrect ? 'text-success' : 'text-error'}`}>
                    {isCorrect ? 'Correct!' : timeLeft === 0 && selected === -1 ? "Time's up!" : 'Incorrect.'}
                  </p>
                  <AnimatedButton onClick={nextQuestion} className="text-sm">
                    {current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight className="h-4 w-4" />
                  </AnimatedButton>
                </motion.div>
              )}
            </GlowCard>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-500">
          <Clock className="h-3.5 w-3.5" />
          {timeLeft}s remaining
        </div>
      </div>
    </div>
  );
}
