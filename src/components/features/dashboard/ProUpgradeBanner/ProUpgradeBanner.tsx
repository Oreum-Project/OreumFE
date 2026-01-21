import { Crown, ArrowRight } from 'lucide-react';
import { cn } from '@/utils';

interface ProUpgradeBannerProps {
  monthlyPrice: number;
  onUpgradeClick?: () => void;
  className?: string;
}

const ProUpgradeBanner = ({
  monthlyPrice,
  onUpgradeClick,
  className,
}: ProUpgradeBannerProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 p-4 text-white shadow-md',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Crown className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold">Pro로 업그레이드</p>
          <p className="text-sm opacity-90">
            무제한 문제 생성 · 월 ₩{monthlyPrice.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={onUpgradeClick}
        className="flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-medium text-violet-600 transition-colors hover:bg-white/90"
      >
        업그레이드
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ProUpgradeBanner;
