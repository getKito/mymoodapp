import { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoading } from '@/hooks/usePageLoading';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const isLoading = usePageLoading();

  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? 'loading' : 'content'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}