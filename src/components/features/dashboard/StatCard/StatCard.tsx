import { cn } from '@/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subLabel?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  icon,
  label,
  value,
  subLabel,
  trend,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-4 shadow-sm',
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subLabel && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subLabel}</p>
          )}
        </div>

        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
