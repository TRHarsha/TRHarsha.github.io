import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}