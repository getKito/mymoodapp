import { ArrowDown } from 'lucide-react';

interface Props {
  refreshing: boolean;
}

export function PullToRefreshSpinner({ refreshing }: Props) {
  return (
    <div className="fixed top-16 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div className={`transition-transform duration-300 ${refreshing ? 'animate-spin' : ''}`}>
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </div>
  );
}