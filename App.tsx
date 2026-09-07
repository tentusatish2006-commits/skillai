import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ResumeUploadPage } from '@/pages/ResumeUploadPage';
import { ResumeAnalysisPage } from '@/pages/ResumeAnalysisPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { CoursesPage } from '@/pages/CoursesPage';
import { QuizPage } from '@/pages/QuizPage';
import { FinalReportPage } from '@/pages/FinalReportPage';
import { PageWrapper } from '@/components/ui';
import { AppShell } from '@/components/AppShell';
import type { Page } from '@/types';

const AUTH_PAGES: Page[] = ['login', 'signup'];

function RoutedApp() {
  const { page } = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <div className="h-10 w-10 rounded-full border-2 border-ink-700 border-t-accent-500 animate-spin" />
      </div>
    );
  }

  if (!user && !AUTH_PAGES.includes(page)) {
    return (
      <PageWrapper k="login">
        <LoginPage />
      </PageWrapper>
    );
  }

  if (user && AUTH_PAGES.includes(page)) {
    return (
      <PageWrapper k="dashboard">
        <DashboardPage />
      </PageWrapper>
    );
  }

  if (AUTH_PAGES.includes(page)) {
    return (
      <AnimatePresence mode="wait">
        <PageWrapper key={page} k={page}>
          {page === 'login' ? <LoginPage /> : <SignupPage />}
        </PageWrapper>
      </AnimatePresence>
    );
  }

  const pageMap: Record<Page, React.ReactNode> = {
    login: <LoginPage />,
    signup: <SignupPage />,
    dashboard: <DashboardPage />,
    upload: <ResumeUploadPage />,
    analysis: <ResumeAnalysisPage />,
    roadmap: <RoadmapPage />,
    courses: <CoursesPage />,
    quiz: <QuizPage />,
    report: <FinalReportPage />,
  };

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <PageWrapper key={page} k={page}>
          {pageMap[page]}
        </PageWrapper>
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <RoutedApp />
      </RouterProvider>
    </AuthProvider>
  );
}
