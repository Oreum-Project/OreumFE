import { useState } from 'react';
import { Mail, Lock, Search, ChevronRight } from 'lucide-react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  ModalFooter,
} from '@/components';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            오름 컴포넌트 라이브러리
          </h1>
          <p className="mt-2 text-muted-foreground">
            Button, Input, Card, Modal 공통 컴포넌트 데모
          </p>
        </header>

        {/* Button Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button</h2>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Variants
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                States
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button loading={isLoading} onClick={handleLoadingDemo}>
                  {isLoading ? 'Loading...' : 'Click for Loading'}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                With Icons
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button leftIcon={<Mail className="h-4 w-4" />}>
                  Send Email
                </Button>
                <Button rightIcon={<ChevronRight className="h-4 w-4" />}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Input</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input label="기본 입력" placeholder="텍스트를 입력하세요" />
            <Input
              label="이메일"
              type="email"
              placeholder="example@email.com"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              leftIcon={<Lock className="h-4 w-4" />}
            />
            <Input
              label="검색"
              placeholder="검색어를 입력하세요"
              leftIcon={<Search className="h-4 w-4" />}
            />
            <Input
              label="에러 상태"
              error="이 필드는 필수입니다"
              placeholder="에러 상태 입력"
            />
            <Input
              label="도움말 텍스트"
              helperText="8자 이상 입력해주세요"
              placeholder="도움말이 있는 입력"
            />
            <Input label="비활성화" disabled placeholder="비활성화된 입력" />
          </div>
        </section>

        {/* Card Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Card</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
                <CardDescription>기본 스타일의 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">카드 내용이 들어갑니다.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">자세히 보기</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated 카드</CardTitle>
                <CardDescription>그림자가 강조된 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">카드 내용이 들어갑니다.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>

            <Card variant="outlined" hoverable>
              <CardHeader>
                <CardTitle>Hoverable 카드</CardTitle>
                <CardDescription>호버 효과가 있는 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">마우스를 올려보세요.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Modal Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Modal</h2>

          <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="확인"
            description="이 작업을 진행하시겠습니까?"
          >
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                모달 내용이 여기에 표시됩니다. ESC 키를 누르거나 배경을 클릭하면
                닫힙니다.
              </p>
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>확인</Button>
            </ModalFooter>
          </Modal>
        </section>
      </div>
    </div>
  );
};

export default App;
