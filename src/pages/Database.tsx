import { useEffect, useState, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { SkeletonLoader } from '@/components/loading/SkeletonLoader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { MoodEntry } from '@/types/mood';

function DatabaseContent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    async function fetchMoodHistory() {
      if (!user) return;
      
      try {
        const { data, error: fetchError } = await supabase
          .from('mood_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (fetchError) throw fetchError;
        
        // Add a small delay to prevent flashing
        timeoutId = setTimeout(() => {
          if (mounted) {
            setMoodEntries(data || []);
            setLoading(false);
          }
        }, 100);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch mood history';
        if (mounted) {
          setError(message);
          setLoading(false);
        }
      }
    }

    fetchMoodHistory();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [user]);

  const handleUnlock = () => {
    navigate('/donate');
  };

  if (loading) {
    return <SkeletonLoader type="database" />;
  }

  if (error) {
    return (
      <div className="p-4 lg:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in-50">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Mood History</h1>
        <Button 
          variant="outline" 
          className="hidden md:flex items-center gap-2"
          onClick={handleUnlock}
        >
          <Lock className="h-4 w-4" />
          Unlock More Entries
        </Button>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {moodEntries.length > 0 ? (
          moodEntries.map((entry) => (
            <Card key={entry.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="text-sm text-muted-foreground">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xl font-semibold">{entry.mood}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">
                    Type: {entry.result_type}
                  </div>
                  <div className="mt-1">{entry.guidance}</div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No mood entries yet. Start by sharing your mood on the home page!
          </div>
        )}
      </div>

      <Button 
        variant="outline" 
        className="w-full md:hidden"
        onClick={handleUnlock}
      >
        <Lock className="h-4 w-4 mr-2" />
        Unlock More Entries
      </Button>
    </div>
  );
}

export default function Database() {
  return (
    <Suspense fallback={<SkeletonLoader type="database" />}>
      <DatabaseContent />
    </Suspense>
  );
}