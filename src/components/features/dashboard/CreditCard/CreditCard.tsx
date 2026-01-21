import { Sparkles } from 'lucide-react';
import { cn } from '@/utils';

interface CreditCardProps {
  usedAmount: number;
  totalAmount: number;
  className?: string;
}

const CreditCard = ({
  usedAmount,
  totalAmount,
  className,
}: CreditCardProps) => {
  const percentage = Math.min((usedAmount / totalAmount) * 100, 100);
  const remaining = totalAmount - usedAmount;

  return (
    <div
      className={cn(
        'rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 p-5 text-white shadow-lg',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">크레딧 사용량</span>
        </div>
        <span className="text-xs opacity-80">이번 달</span>
      </div>

      <div className="mb-3">
        <span className="text-3xl font-bold">
          ₩{usedAmount.toLocaleString()}
        </span>
        <span className="ml-1 text-sm opacity-80">
          / ₩{totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="opacity-80">{percentage.toFixed(0)}% 사용됨</span>
        <span className="font-medium">₩{remaining.toLocaleString()} 남음</span>
      </div>
    </div>
  );
};

export default CreditCard;
