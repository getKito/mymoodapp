import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/navigation/Sidebar';
import MobileSidebar from '@/components/navigation/MobileSidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <MobileSidebar />
      <main className="lg:pl-[280px] min-h-screen w-full overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-20 lg:pt-4">
        <Outlet />
      </main>
    </div>
  );
}