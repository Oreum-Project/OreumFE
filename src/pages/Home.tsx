import { Layout } from '@/components';
import { useAuthStore } from '@/stores';

const Home = () => {
  const { isLoggedIn, user, logout } = useAuthStore();

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <Layout
      isLoggedIn={isLoggedIn}
      user={user ? { name: user.name, email: user.email } : undefined}
      currentPath="/"
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      <div className="mx-auto max-w-7xl">
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold text-foreground">
            오름에 오신 것을 환영합니다
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            AI 기반 스터디 플랫폼으로 효율적인 학습을 시작하세요
          </p>

          {!isLoggedIn && (
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                로그인
              </a>
              <a
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                회원가입
              </a>
            </div>
          )}

          {isLoggedIn && user && (
            <p className="mt-8 text-muted-foreground">
              {user.name}님, 환영합니다!
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
