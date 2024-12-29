import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useRetry } from '@/hooks/useRetry';
import { usePrefetch } from '@/hooks/usePrefetch';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { MoodDisplay } from '@/components/dashboard/MoodDisplay';
import { SkeletonLoader } from '@/components/loading/SkeletonLoader';
import { PullToRefreshSpinner } from '@/components/loading/PullToRefreshSpinner';
import { PageLoader } from '@/components/loading/PageLoader';

export default function Home() {
  const [guidance, setGuidance] = useState('');
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile(user?.id || '');
  
  // Prefetch data for other routes
  usePrefetch(user?.id);
  
  const { execute: refreshProfile } = useRetry(
    async () => {
      if (user?.id) {
        await updateProfile(profile || {});
      }
    },
    { maxAttempts: 3 }
  );

  const { refreshing } = usePullToRefresh({
    onRefresh: async () => {
      await refreshProfile();
      setGuidance('');
    }
  });
  
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
  const day = currentDate.getDate().toString().padStart(2, '0');

  const content = (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      <PullToRefreshSpinner refreshing={refreshing} />
      <div className="grid lg:grid-cols-2 gap-8">
        <WelcomeSection 
          username={profile?.display_name || 'User'} 
          onMoodSubmitted={setGuidance} 
        />
        <MoodDisplay 
          month={month} 
          day={day} 
          guidance={guidance}
        />
      </div>
    </div>
  );

  return (
    <PageLoader fallback={<SkeletonLoader type="home" />}>
      {content}
    </PageLoader>
  );
}