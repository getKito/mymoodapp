import { useEffect, useRef, useState } from 'react';

interface PullToRefreshConfig {
  onRefresh: () => Promise<void>;
  pullDistance?: number;
  disabled?: boolean;
}

export function usePullToRefresh({ 
  onRefresh, 
  pullDistance = 150,
  disabled = false 
}: PullToRefreshConfig) {
  const [isPulling, setIsPulling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;
      currentY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;
      
      const pullLength = currentY.current - startY.current;
      if (pullLength > pullDistance) {
        setRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setRefreshing(false);
        }
      }
      setIsPulling(false);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, isPulling, onRefresh, pullDistance]);

  return { isPulling, refreshing };
}