import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Card } from '@/components/ui/card';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export default function Settings() {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile(user?.id || '');

  if (loading) {
    return (
      <div className="p-4 lg:p-8 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-4 lg:p-8">
        <ErrorBoundary>
          <div>Failed to load profile</div>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      <h1 className="text-4xl font-bold">Settings</h1>

      <div className="grid gap-8 max-w-2xl">
        <Card className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          <ProfileForm 
            profile={profile}
            onSubmit={updateProfile}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
}