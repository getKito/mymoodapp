import { useEffect, useState } from 'react';

interface PageLoaderProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export function PageLoader({ children, fallback }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute inset-0`}>
        {fallback}
      </div>
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}