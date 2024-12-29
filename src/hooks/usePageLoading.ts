import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    // Small timeout to prevent flash of loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading;
}