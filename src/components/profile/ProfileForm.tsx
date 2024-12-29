import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/loading/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import type { Profile } from '@/types/auth';

const profileSchema = z.object({
  display_name: z.string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name cannot exceed 50 characters'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: Profile;
  onSubmit: (data: Partial<Profile>) => Promise<void>;
  loading?: boolean;
}

export function ProfileForm({ profile, onSubmit, loading = false }: ProfileFormProps) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: profile.display_name,
    },
  });

  const handleFormSubmit = async (data: ProfileFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="display_name">Display Name:</Label>
        <Input
          id="display_name"
          {...register('display_name')}
          placeholder="Enter your display name"
          className={errors.display_name ? 'border-destructive' : ''}
        />
        {errors.display_name && (
          <p className="text-sm text-destructive">{errors.display_name.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
        Save Changes
      </Button>
    </form>
  );
}