import { cn } from '@/utils';
import { Header } from '../Header';

interface UserInfo {
  name: string;
  email?: string;
  avatar?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  user?: UserInfo;
  currentPath?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  className?: string;
}

const Layout = ({
  children,
  isLoggedIn = false,
  user,
  currentPath = '/',
  onLogout,
  onLogin,
  className,
}: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        currentPath={currentPath}
        onLogout={onLogout}
        onLogin={onLogin}
      />

      <main className={cn('flex-1', className)}>{children}</main>
    </div>
  );
};

export default Layout;
