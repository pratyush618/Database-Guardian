
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const { isAuthenticated } = useAuth();
  const { setTheme, resolvedTheme } = useTheme();
  
  // This effect will check if the theme from useTheme matches the attribute on HTML
  // and force an update if they don't match
  useEffect(() => {
    const root = window.document.documentElement;
    if (resolvedTheme === 'dark' && !root.classList.contains('dark')) {
      root.classList.add('dark');
    } else if (resolvedTheme === 'light' && root.classList.contains('dark')) {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="flex-1 container py-6 md:py-8 px-4">
        {children}
      </div>
      {showFooter && (
        <footer className="py-6 border-t border-border/40 bg-card/30 transition-colors duration-300">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 px-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span>© {new Date().getFullYear()} Guard. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? (
                  <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                )}
              </Button>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
