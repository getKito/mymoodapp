import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Smile, Sun } from 'lucide-react';

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Column - Features */}
      <div className="hidden lg:flex lg:w-[55%] bg-accent/10 p-12 pt-16 relative flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-background to-background opacity-50" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <Smile className="w-12 h-12 text-brand" />
            <h1 className="text-4xl font-bold">MOOD</h1>
          </div>

          <div className="space-y-12 max-w-lg">
            <div>
              <h2 className="text-5xl font-bold mb-4 leading-tight">Transform Your Mood with Divine Guidance</h2>
              <p className="text-lg text-muted-foreground">
                Your daily companion for spiritual growth and emotional well-being
              </p>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="flex items-start gap-3"
                >
                  <feature.icon className="w-6 h-6 text-brand mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-muted-foreground mt-16">
          © {new Date().getFullYear()} MOOD. All rights reserved.
        </div>
      </div>

      {/* Right Column - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <Smile className="w-12 h-12 text-brand" />
            </div>
            <h1 className="text-3xl font-bold">MOOD</h1>
            <p className="mt-2 text-muted-foreground">Your daily spiritual companion</p>
          </div>

          <AuthForm />
        </div>
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
    icon: Smile,
    title: 'Peace of Mind',
    description: 'Find comfort and direction through faith-based emotional support',
  },
];