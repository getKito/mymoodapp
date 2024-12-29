import { Gift, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-background border-r border-border hidden lg:block fixed left-0">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-3 mb-8">
          <span role="img" aria-label="logo" className="text-2xl">😊</span>
          <h2 className="text-xl font-bold text-foreground">Mood</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors",
                    "text-muted-foreground hover:bg-accent/50",
                    location.pathname === item.href && "bg-accent text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <Link to="/donate">
            <Button
              size="lg"
              className="justify-start gap-4 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Gift className="h-5 w-5" />
              <span>Donate</span>
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={handleLogout}
            className="justify-start gap-4 w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}