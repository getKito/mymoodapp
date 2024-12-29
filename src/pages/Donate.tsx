import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

export default function Donate() {
  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
        <p className="text-muted-foreground">Help us continue providing spiritual support and guidance to people worldwide.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl font-semibold">Cheerful Donation</h2>
          </div>
          <div className="text-3xl font-bold">$2/month</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Plant a seed of hope with a cheerful heart</li>
            <li>✓ Help 10 more people access this app monthly</li>
            <li>✓ One-time prayer intercession</li>
          </ul><br/>
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-full">
  <Button size="lg" className="w-full">Choose Plan</Button>
</a>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold">Bountiful Donation</h2>
          </div>
          <div className="text-3xl font-bold">$7/month</div>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Reap abundant blessings by giving generously</li>
            <li>✓ Help 50 more people access this app monthly</li>
            <li>✓ Monthly Special Prayer support</li>
            <li>✓ Extra special perks</li>
          </ul><br/>
           <a href="#" target="_blank" rel="noopener noreferrer" className="w-full">
  <Button size="lg" className="w-full">Choose Plan</Button>
</a>
        </Card>
      </div>
    </div>
  );
}