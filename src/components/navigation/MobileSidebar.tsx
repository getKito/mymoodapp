import { useState } from 'react';
import { Menu, X, Gift, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { menuItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      setOpen(false);
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 px-4 border-border border-b bg-background flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <span role="img" aria-label="logo" className="text-2xl">😊</span>
          <h2 className="text-xl font-bold text-foreground">MOOD</h2>
        </div>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent side="left" className="p-0 border-border">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span role="img" aria-label="logo" className="text-2xl">😊</span>
              <SheetTitle className="text-xl font-bold text-foreground">MOOD</SheetTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
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
            <Link to="/donate" onClick={() => setOpen(false)}>
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
      </SheetContent>
    </Sheet>
  );
}