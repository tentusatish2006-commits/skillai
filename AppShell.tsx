import { motion } from 'framer-motion';
import { useNavigate, useRouter } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { FloatingBlobs } from '@/components/ui';
import { LayoutDashboard, Upload, FileSearch, Map, BookOpen, HelpCircle, FileText, LogOut, Sparkles } from 'lucide-react';
import type { Page } from '@/types';
import type { ReactNode } from 'react';

const NAV_ITEMS: { page: Page; label: string; icon: ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { page: 'upload', label: 'Upload Resume', icon: <Upload className="h-4 w-4" /> },
  { page: 'analysis', label: 'Analysis', icon: <FileSearch className="h-4 w-4" /> },
  { page: 'roadmap', label: 'Roadmap', icon: <Map className="h-4 w-4" /> },
  { page: 'courses', label: 'Courses', icon: <BookOpen className="h-4 w-4" /> },
  { page: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-4 w-4" /> },
  { page: 'report', label: 'Final Report', icon: <FileText className="h-4 w-4" /> },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { page } = useRouter();
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();

  return (
    <div className="relative min-h-screen bg-ink-950">
      <FloatingBlobs count={2} />

      {/* sidebar desktop */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-ink-700/40 bg-ink-900/70 backdrop-blur-xl lg:flex">
        <button
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-2 px-6 py-5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/15 glow-accent">
            <Sparkles className="h-5 w-5 text-accent-400" />
          </div>
          <span className="font-display text-lg font-bold text-ink-100">SkillGap</span>
        </button>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const active = page === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
                style={{ color: active ? 'var(--color-ink-100)' : 'var(--color-ink-400)' }}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-accent-500/10 border border-accent-500/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-ink-700/40 p-3">
          <div className="mb-2 truncate px-3 text-xs text-ink-400">
            {profile?.full_name || 'User'}
          </div>
          <button
            onClick={() => { signOut(); navigate('login'); }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-400 transition-colors hover:text-error"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-ink-700/40 bg-ink-900/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button onClick={() => navigate('dashboard')} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/15">
            <Sparkles className="h-4 w-4 text-accent-400" />
          </div>
          <span className="font-display font-bold text-ink-100">SkillGap</span>
        </button>
        <button
          onClick={() => { signOut(); navigate('login'); }}
          className="text-ink-400 hover:text-error"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      {/* mobile bottom nav */}
      <div className="fixed bottom-0 z-30 w-full border-t border-ink-700/40 bg-ink-900/85 backdrop-blur-xl lg:hidden">
        <div className="no-scrollbar flex items-center justify-around overflow-x-auto px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const active = page === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="flex min-w-[58px] flex-col items-center gap-1 px-2 py-1.5 text-[10px] font-medium"
                style={{ color: active ? 'var(--color-accent-400)' : 'var(--color-ink-400)' }}
              >
                {item.icon}
                {item.label.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      <main className="relative z-10 lg:pl-60 pt-16 pb-20 lg:pt-0 lg:pb-0">
        {children}
      </main>
    </div>
  );
}
