import { useEffect, useState, useRef, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { COURSE_CATALOG, getCoursesForSkill } from '@/lib/skills';
import { GlowCard, AnimatedButton, fadeUp, stagger, popIn } from '@/components/ui';
import { BookOpen, Star, Clock, Bookmark, BookmarkCheck, ExternalLink, Filter, Sparkles } from 'lucide-react';
import type { Course } from '@/types';

type FilterType = 'all' | 'free' | 'paid';

export function CoursesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [draggedCourse, setDraggedCourse] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

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

  const filtered = COURSE_CATALOG.filter((c) => {
    if (filter === 'free') return c.type === 'free';
    if (filter === 'paid') return c.type === 'paid';
    return true;
  });

  // prioritize courses for missing skills
  const sorted = [...filtered].sort((a, b) => {
    const aMissing = missingSkills.includes(a.skill) ? 0 : 1;
    const bMissing = missingSkills.includes(b.skill) ? 0 : 1;
    return aMissing - bMissing;
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onDragStart = (e: DragEvent, id: string) => {
    setDraggedCourse(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (draggedCourse) {
      setSavedIds((prev) => new Set(prev).add(draggedCourse));
      setDraggedCourse(null);
    }
  };

  const savedCourses = COURSE_CATALOG.filter((c) => savedIds.has(c.id));

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">Courses</h1>
        <p className="mt-1 text-ink-400">Free and paid resources to close your skill gaps. Drag cards to save them.</p>
      </motion.div>

      {/* filter toggle */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-ink-300">
          <Filter className="h-4 w-4" />
          <span>Filter:</span>
        </div>
        <div className="relative flex rounded-xl bg-ink-800/60 p-1">
          {(['all', 'free', 'paid'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="relative z-10 rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors"
              style={{ color: filter === f ? 'var(--color-ink-950)' : 'var(--color-ink-400)' }}
            >
              {filter === f && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-accent-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>
        <span className="text-sm text-ink-500">{sorted.length} courses</span>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* course grid */}
        <div className="lg:col-span-2">
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sorted.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                saved={savedIds.has(course.id)}
                isGap={missingSkills.includes(course.skill)}
                onToggleSave={() => toggleSave(course.id)}
                onDragStart={(e) => onDragStart(e, course.id)}
              />
            ))}
          </motion.div>
          {sorted.length === 0 && (
            <p className="text-center text-ink-400 py-12">No courses match this filter.</p>
          )}
        </div>

        {/* saved drop zone */}
        <div className="lg:col-span-1">
          <div
            ref={dropRef}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`sticky top-6 rounded-2xl border-2 border-dashed p-5 transition-all ${
              dragOver ? 'border-accent-500 bg-accent-500/10 scale-[1.02]' : 'border-ink-600/40 glass'
            }`}
          >
            <div className="mb-4 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-accent-400" />
              <h2 className="font-display text-lg font-semibold text-ink-100">Saved for Later</h2>
            </div>
            <p className="mb-4 text-xs text-ink-400">
              {dragOver ? 'Drop to save!' : 'Drag course cards here to bookmark them.'}
            </p>
            <AnimatePresence mode="popLayout">
              {savedCourses.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center text-sm text-ink-500"
                >
                  No saved courses yet.
                </motion.div>
              ) : (
                <motion.div layout className="space-y-2">
                  {savedCourses.map((c) => (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 rounded-lg bg-ink-800/50 p-3"
                    >
                      <BookmarkCheck className="h-4 w-4 shrink-0 text-accent-400" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-ink-100">{c.title}</p>
                        <p className="text-xs text-ink-400">{c.provider} · {c.type === 'free' ? 'Free' : c.price}</p>
                      </div>
                      <button onClick={() => toggleSave(c.id)} className="text-ink-500 hover:text-error">
                        <span className="text-lg">×</span>
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {savedCourses.length > 0 && (
              <div className="mt-4 text-center">
                <AnimatedButton variant="secondary" onClick={() => navigate('roadmap')} className="text-sm">
                  Back to Roadmap
                </AnimatedButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  saved,
  isGap,
  onToggleSave,
  onDragStart,
}: {
  course: Course;
  saved: boolean;
  isGap: boolean;
  onToggleSave: () => void;
  onDragStart: (e: DragEvent) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="glass card-trace group cursor-grab rounded-2xl p-4 transition-all hover:-translate-y-1 hover:scale-[1.02] active:cursor-grabbing"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            course.type === 'free' ? 'bg-success/15 text-success' : 'bg-amber-glow/15 text-amber-glow'
          }`}>
            {course.type === 'free' ? 'FREE' : 'PAID'}
          </span>
          {isGap && (
            <span className="flex items-center gap-1 rounded-full bg-error/10 px-2 py-0.5 text-xs text-error">
              <Sparkles className="h-3 w-3" /> Gap
            </span>
          )}
        </div>
        <button onClick={onToggleSave} className={`transition-all ${saved ? 'text-accent-400' : 'text-ink-500 hover:text-ink-300'}`}>
          {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
        </button>
      </div>

      <h3 className="font-display font-semibold text-ink-100">{course.title}</h3>
      <p className="mt-1 text-sm text-ink-400">{course.provider}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-400">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-amber-glow" />
          {course.rating}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {course.duration}
        </span>
        <span className="rounded-full bg-ink-700/50 px-2 py-0.5">{course.level}</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-ink-300">{course.type === 'free' ? 'Free' : course.price}</span>
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-accent-500/15 px-3 py-1.5 text-xs font-medium text-accent-400 transition-all hover:bg-accent-500/25 hover:glow-accent"
        >
          {course.type === 'free' ? 'Start' : 'Enroll'}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
