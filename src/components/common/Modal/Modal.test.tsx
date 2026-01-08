import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalFooter } from './index';

describe('Modal', () => {
  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal Content
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Modal Content
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal Title">
        Content
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Title"
        description="Modal description text"
      >
        Content
      </Modal>
    );
    expect(screen.getByText('Modal description text')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: '닫기' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not show close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
        Content
      </Modal>
    );
    expect(
      screen.queryByRole('button', { name: '닫기' })
    ).not.toBeInTheDocument();
  });

  it('calls onClose when clicking overlay', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div data-testid="content">Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking overlay if closeOnOverlay is false', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlay={false}>
        <div data-testid="content">Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when pressing Escape if closeOnEscape is false', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEscape={false}>
        Content
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('applies different size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} size="sm">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="md">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-md');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');

    rerender(
      <Modal isOpen={true} onClose={() => {}} size="xl">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('max-w-xl');
  });

  it('sets body overflow to hidden when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', async () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        Content
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        Content
      </Modal>
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('has correct ARIA attributes', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Title"
        description="Test description"
      >
        Content
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-modal');
  });
});

describe('ModalFooter', () => {
  it('renders children correctly', () => {
    render(<ModalFooter>Footer Content</ModalFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies flex layout', () => {
    render(<ModalFooter data-testid="footer">Footer</ModalFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('flex');
  });

  it('applies custom className', () => {
    render(
      <ModalFooter className="custom-footer" data-testid="footer">
        Footer
      </ModalFooter>
    );
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });
});
