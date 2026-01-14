import { useState } from 'react';
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  Users,
  FileText,
} from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/components/common';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface UserInfo {
  name: string;
  email?: string;
  avatar?: string;
}

interface HeaderProps {
  isLoggedIn?: boolean;
  user?: UserInfo;
  currentPath?: string;
  onLogout?: () => void;
  onLogin?: () => void;
  className?: string;
}

const navItems: NavItem[] = [
  { label: '홈', href: '/', icon: <Home className="h-4 w-4" /> },
  { label: '스터디', href: '/studies', icon: <Users className="h-4 w-4" /> },
  {
    label: '문제생성',
    href: '/questions/generate',
    icon: <FileText className="h-4 w-4" />,
  },
];

const Header = ({
  isLoggedIn = false,
  user,
  currentPath = '/',
  onLogout,
  onLogin,
  className,
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const handleProfileToggle = () => setIsProfileOpen((prev) => !prev);
  const handleProfileClose = () => setIsProfileOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-border bg-background',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Left: Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-xl font-bold text-primary">오름</span>
        </a>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                currentPath === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: User Menu (Desktop) */}
        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn && user ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileToggle}
                className="gap-2"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
                <span className="max-w-24 truncate text-sm font-medium">
                  {user.name}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Dropdown */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={handleProfileClose}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-background py-1 shadow-lg">
                    <div className="border-b border-border px-4 py-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      {user.email && (
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <a
                      href="/profile"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent"
                      onClick={handleProfileClose}
                    >
                      <User className="h-4 w-4" />
                      프로필
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        handleProfileClose();
                        onLogout?.();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button size="sm" onClick={onLogin}>
              로그인
            </Button>
          )}
        </div>

        {/* Mobile: Hamburger */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMobileMenuToggle}
          className="md:hidden"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  currentPath === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </a>
            ))}

            <hr className="my-2 border-border" />

            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 rounded-full bg-muted p-1.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    {user.email && (
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
                <a
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  프로필
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </button>
              </>
            ) : (
              <Button
                fullWidth
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogin?.();
                }}
              >
                로그인
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
