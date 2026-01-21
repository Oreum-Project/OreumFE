import { BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface ActivityItem {
  id: string;
  subject: string;
  description: string;
  progress: number;
  lastStudied: string;
  icon?: React.ReactNode;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  onItemClick?: (id: string) => void;
  onViewAllClick?: () => void;
  className?: string;
}

const RecentActivity = ({
  activities,
  onItemClick,
  onViewAllClick,
  className,
}: RecentActivityProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">최근 학습 활동</h3>
        {onViewAllClick && (
          <button
            onClick={onViewAllClick}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            전체보기
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="divide-y divide-border">
        {activities.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground">
            <BookOpen className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">아직 학습 기록이 없습니다</p>
          </div>
        ) : (
          activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => onItemClick?.(activity.id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {activity.icon || <BookOpen className="h-5 w-5" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium text-foreground">
                    {activity.subject}
                  </p>
                  <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                    {activity.lastStudied}
                  </span>
                </div>

                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {activity.description}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${activity.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {activity.progress}%
                  </span>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
export type { ActivityItem };
