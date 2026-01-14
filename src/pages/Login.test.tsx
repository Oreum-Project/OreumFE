import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Login from './Login';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';

vi.mock('@/services', () => ({
  authService: {
    login: vi.fn(),
  },
}));

vi.mock('axios', async () => {
  const actual = await vi.importActual('axios');
  return {
    ...actual,
    default: {
      ...actual,
      isAxiosError: vi.fn(),
    },
  };
});

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.getState().logout();
  });

  it('renders login form', () => {
    render(<Login />);

    expect(screen.getByText('오름')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    expect(screen.getByText('회원가입')).toBeInTheDocument();
  });

  it('shows email error for empty email', async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('이메일을 입력해주세요.')).toBeInTheDocument();
    });
  });

  it('shows email error for invalid email format', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');

    // 이메일 형식이 아닌 값 입력
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(
        screen.getByText('올바른 이메일 형식이 아닙니다.')
      ).toBeInTheDocument();
    });
  });

  it('shows password error for empty password', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
    });
  });

  it('shows password error for password less than 10 characters', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(
        screen.getByText('비밀번호는 10자 이상이어야 합니다.')
      ).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('비밀번호');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: '' });
    await userEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('calls login API with valid credentials', async () => {
    const mockResponse = {
      accessToken: 'mock-token',
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
    };
    vi.mocked(authService.login).mockResolvedValue(mockResponse);

    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'validpassword123',
      });
    });
  });

  it('shows API error message on login failure', async () => {
    const error = {
      response: { data: { message: '이메일 또는 비밀번호가 틀렸습니다.' } },
    };
    vi.mocked(authService.login).mockRejectedValue(error);
    vi.mocked(axios.isAxiosError).mockReturnValue(true);

    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(
        screen.getByText('이메일 또는 비밀번호가 틀렸습니다.')
      ).toBeInTheDocument();
    });
  });

  it('shows loading state during login', async () => {
    vi.mocked(authService.login).mockImplementation(
      () => new Promise(() => {})
    );

    render(<Login />);

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword123' } });
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
    });
  });
});
