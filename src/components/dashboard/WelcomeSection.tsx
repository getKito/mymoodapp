import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, AlertCircle } from 'lucide-react';
import { submitMood } from '@/lib/api/mood';
import { getErrorMessage } from '@/lib/utils/error';
import { useToast } from '@/hooks/use-toast';
import { useRetry } from '@/hooks/useRetry';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { MoodResultType } from '@/types/mood';

interface WelcomeSectionProps {
  username: string;
  onMoodSubmitted: (guidance: string) => void;
}

export function WelcomeSection({ username, onMoodSubmitted }: WelcomeSectionProps) {
  const [mood, setMood] = useState('');
  const [resultType, setResultType] = useState<MoodResultType | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
  const isMakeWebhookConfigured = Boolean(webhookUrl);

  const { execute: submitMoodWithRetry } = useRetry(
    async () => {
      if (!mood || !resultType) {
        throw new Error('Please fill in all fields');
      }
      return await submitMood({
        mood,
        resultType,
      });
    },
    { maxAttempts: 3 }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isMakeWebhookConfigured) {
      toast({
        title: 'Configuration Error',
        description: 'Make.com webhook URL is not configured',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitMoodWithRetry();
      if (response) {
        onMoodSubmitted(response.guidance);
        toast({
          title: 'Success',
          description: 'Your mood has been submitted',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto lg:mx-0">
      {/* Ad Container */}
      <div className="h-[50px] w-full bg-accent/10 rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Advertisement Space</span>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Welcome back, {username}</h1>
        <p className="text-muted-foreground">Let's make your day better.</p>
      </div>

      {!isMakeWebhookConfigured && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Make.com webhook URL is not configured. Please set VITE_MAKE_WEBHOOK_URL in your environment.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="p-6 border-border w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">How are you feeling today?</label>
              <Input
                placeholder="Express your mood (e.g., anxious, joyful, sad)"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="h-12"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">What kind of support would you like?</label>
              <Select value={resultType} onValueChange={setResultType} disabled={isSubmitting}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select result type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="mindOfGod">Mind of God</SelectItem>
                  <SelectItem value="sermon">Sermon</SelectItem>
                  <SelectItem value="prayer">Prayer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 rounded-lg"
            disabled={isSubmitting}
          >
            <Wand2 className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Processing...' : 'Make it Better'}
          </Button>
        </form>
      </Card>
    </div>
  );
}