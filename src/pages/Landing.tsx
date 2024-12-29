import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Smile, Sun, Moon } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-background to-background" />
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, hsl(var(--brand)) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-3xl mx-auto pt-20"
        >
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Smile className="w-12 h-12 text-brand" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Transform Your Mood with Divine Guidance
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Your daily companion for spiritual growth and emotional well-being
          </p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border"
            >
              <feature.icon className="w-10 h-10 text-brand mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Heart,
    title: 'Daily Inspiration',
    description: 'Receive personalized spiritual guidance tailored to your emotional state',
  },
  {
    icon: Sun,
    title: 'Divine Wisdom',
    description: 'Connect with biblical insights that speak directly to your situation',
  },
  {
    icon: Moon,
    title: 'Peace of Mind',
    description: 'Find comfort and direction through faith-based emotional support',
  },
];