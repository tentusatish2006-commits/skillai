import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Page } from '@/types';

interface RouterContextValue {
  page: Page;
  navigate: (page: Page) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.slice(1) as Page;
    return hash || 'login';
  });

  const navigate = (p: Page) => {
    window.location.hash = p;
    setPage(p);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (hash) setPage(hash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <RouterContext.Provider value={{ page, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

export function useNavigate() {
  return useRouter().navigate;
}
