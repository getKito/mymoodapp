import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OptimizedImage } from '@/components/image/OptimizedImage';

interface MoodDisplayProps {
  month: string;
  day: string;
  guidance: string;
}

export function MoodDisplay({ month, day, guidance }: MoodDisplayProps) {
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(guidance);
      setCopying(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
        duration: 2000,
      });
      
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80"
          alt="Mood background"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4 text-white">
          <div className="text-sm font-medium opacity-80">{month}</div>
          <div className="text-5xl font-bold">{day}</div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Mood Today</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleCopy}
            className="ml-2"
            disabled={!guidance}
          >
            {copying ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
          <p className="text-muted-foreground break-words">
            {guidance || 'Your personalized guidance will appear here after you submit your mood...'}
          </p>
        </div>
      </div>
    </Card>
  );
}