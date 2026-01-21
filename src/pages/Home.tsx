import {
  Clock,
  CheckCircle,
  Flame,
  Database,
  Code,
  Binary,
  Users,
  Sparkles,
  FileText,
  Check,
} from 'lucide-react';
import heroImage from '@/assets/hero.webp';
import {
  Layout,
  CreditCard,
  StatCard,
  ProUpgradeBanner,
  RecentActivity,
} from '@/components';
import type { ActivityItem } from '@/components';
import { useAuthStore } from '@/stores';

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    subject: '데이터베이스',
    description: 'SQL 기초 및 정규화 이론',
    progress: 75,
    lastStudied: '2시간 전',
    icon: <Database className="h-5 w-5" />,
  },
  {
    id: '2',
    subject: 'Node.js',
    description: 'Express.js RESTful API 설계',
    progress: 45,
    lastStudied: '1일 전',
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: '3',
    subject: '알고리즘',
    description: '동적 프로그래밍 기초',
    progress: 30,
    lastStudied: '2일 전',
    icon: <Binary className="h-5 w-5" />,
  },
];

const Home = () => {
  const { logout } = useAuthStore();

  // TODO: 테스트용 - 나중에 제거
  const isLoggedIn = false;
  const user = { id: '1', name: '현진', email: 'test@example.com' };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleUpgrade = () => {
    // TODO: 결제 페이지로 이동
  };

  const handleActivityClick = (id: string) => {
    window.location.href = `/study/${id}`;
  };

  const handleViewAllActivities = () => {
    window.location.href = '/studies';
  };

  // 비로그인 상태의 랜딩 페이지
  if (!isLoggedIn) {
    return (
      <Layout
        isLoggedIn={isLoggedIn}
        user={undefined}
        currentPath="/"
        onLogin={handleLogin}
        onLogout={handleLogout}
      >
        {/* 히어로 섹션 */}
        <section
          className="relative flex min-h-[600px] items-center justify-center bg-cover bg-top bg-no-repeat px-4 py-20 text-white lg:min-h-[700px]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
              AI와 함께하는
              <br />
              스마트한 학습의 시작
            </h1>
            <p className="mt-6 text-lg text-white/90 drop-shadow-md sm:text-xl">
              PDF 자료를 업로드하면 Claude AI가 자동으로 시험 문제를 생성합니다.
              <br className="hidden sm:block" />
              스터디 그룹과 함께 효율적인 학습을 경험하세요.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/register"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-orange-500 px-8 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-600 sm:w-auto"
              >
                무료로 시작하기
              </a>
              <a
                href="/login"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:w-auto"
              >
                로그인
              </a>
            </div>
          </div>
        </section>

        {/* 기능 소개 섹션 */}
        <section className="bg-background px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                오름이 특별한 이유
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                학습 효율을 극대화하는 핵심 기능들
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* 기능 1 */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  AI 문제 자동 생성
                </h3>
                <p className="mt-3 text-muted-foreground">
                  PDF 학습 자료를 업로드하면 Claude AI가 핵심 내용을 분석하여
                  객관식, 주관식, OX 문제를 자동으로 생성합니다.
                </p>
              </div>

              {/* 기능 2 */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  스터디 그룹 관리
                </h3>
                <p className="mt-3 text-muted-foreground">
                  스터디 그룹을 만들고 친구들과 함께 학습하세요. 문제 공유, 진도
                  관리, 랭킹 시스템으로 동기부여를 받을 수 있습니다.
                </p>
              </div>

              {/* 기능 3 */}
              <div className="rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
                  <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  학습 기록 분석
                </h3>
                <p className="mt-3 text-muted-foreground">
                  풀었던 문제와 오답을 분석하여 취약점을 파악하고, 맞춤형 복습
                  자료를 제공받아 효과적으로 학습할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 사용 방법 섹션 */}
        <section className="bg-muted/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                간편한 3단계로 시작
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  PDF 업로드
                </h3>
                <p className="mt-2 text-muted-foreground">
                  학습할 PDF 자료를 업로드하세요
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  AI 문제 생성
                </h3>
                <p className="mt-2 text-muted-foreground">
                  AI가 자동으로 문제를 생성합니다
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  문제 풀이
                </h3>
                <p className="mt-2 text-muted-foreground">
                  생성된 문제로 학습을 시작하세요
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 가격 정책 섹션 */}
        <section className="bg-background px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                합리적인 가격 정책
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                필요에 맞는 플랜을 선택하세요
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              {/* 무료 플랜 */}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-xl font-semibold text-foreground">
                  무료 플랜
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">₩0</span>
                  <span className="ml-2 text-muted-foreground">/월</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  오름을 처음 시작하는 분들에게 적합합니다
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">
                      월 3,000 크레딧 제공
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">PDF 업로드 5회/월</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">
                      스터디 그룹 1개 참여
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">기본 학습 분석</span>
                  </li>
                </ul>
                <a
                  href="/register"
                  className="mt-8 block rounded-lg border border-orange-500 py-3 text-center font-semibold text-orange-500 transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/20"
                >
                  무료로 시작하기
                </a>
              </div>

              {/* Pro 플랜 */}
              <div className="relative rounded-2xl border-2 border-orange-500 bg-card p-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-white">
                  인기
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Pro 플랜
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    ₩9,900
                  </span>
                  <span className="ml-2 text-muted-foreground">/월</span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  본격적으로 학습하고 싶은 분들에게 추천합니다
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">무제한 크레딧</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">무제한 PDF 업로드</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">스터디 그룹 무제한</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">AI 심층 분석 리포트</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-orange-500" />
                    <span className="text-foreground">우선 고객 지원</span>
                  </li>
                </ul>
                <a
                  href="/register"
                  className="mt-8 block rounded-lg bg-orange-500 py-3 text-center font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Pro 시작하기
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-linear-to-r from-orange-500 to-orange-600 px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-lg text-white/90">
              3분이면 가입 완료! 오늘부터 스마트한 학습을 경험하세요.
            </p>
            <a
              href="/register"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-base font-semibold text-orange-600 shadow-lg transition-transform hover:scale-105"
            >
              무료로 시작하기
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  // 로그인 상태의 대시보드
  return (
    <Layout
      isLoggedIn={isLoggedIn}
      user={user ? { name: user.name, email: user.email } : undefined}
      currentPath="/"
      onLogin={handleLogin}
      onLogout={handleLogout}
    >
      {/* 인사말 섹션 */}
      <div className="bg-linear-to-br from-orange-400 to-orange-500 px-4 py-8 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">
            안녕하세요, {user?.name || '사용자'}님!
          </h1>
          <p className="mt-1 text-white/90">오늘도 화이팅하세요</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* 크레딧 카드 & Pro 배너 */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <CreditCard usedAmount={520} totalAmount={3000} />
          <ProUpgradeBanner
            monthlyPrice={9900}
            onUpgradeClick={handleUpgrade}
          />
        </div>

        {/* 통계 카드 */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="이번 주 학습시간"
            value="12.5시간"
            subLabel="지난 주 대비"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5" />}
            label="완료 문제"
            value="127개"
            subLabel="이번 달 총"
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            icon={<Flame className="h-5 w-5" />}
            label="연속 학습"
            value="14일"
            subLabel="연속 일수"
          />
        </div>

        {/* 최근 학습 활동 */}
        <RecentActivity
          activities={mockActivities}
          onItemClick={handleActivityClick}
          onViewAllClick={handleViewAllActivities}
        />
      </div>
    </Layout>
  );
};

export default Home;
