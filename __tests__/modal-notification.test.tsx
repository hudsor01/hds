import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExampleUsage } from '../components/examples/notification-modal-example'
import { ModalProvider } from '../components/providers/modal-provider'
import { NotificationProvider } from '../components/ui/notification'

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: 'div',
    Alert: 'div'
  }
}))

describe('Modal and Notification System', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <>
        <ModalProvider>
          <NotificationProvider />
          {ui}
        </ModalProvider>
      </>
    )
  }

  it('shows toast notification with correct content and animation', async () => {
    renderWithProviders(<ExampleUsage />)

    const showToastButton = screen.getByText('Show Toast')
    await act(() => userEvent.click(showToastButton))

    const toast = await screen.findByRole('alert')
    expect(toast).toHaveTextContent('This is an animated toast notification')
    expect(toast).toHaveTextContent('Hello')
  })

  it('opens modal with loading state and handles async operation', async () => {
    renderWithProviders(<ExampleUsage />)

    const openModalButton = screen.getByText('Open Modal')
    await act(() => userEvent.click(openModalButton))

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const actionButton = screen.getByText('Trigger Action')
    await act(() => userEvent.click(actionButton))

    // Should show loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    // Wait for operation to complete
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })

  it('handles errors in modal and shows error toast', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.8) // Force error case
    renderWithProviders(<ExampleUsage />)

    const openModalButton = screen.getByText('Open Modal')
    await act(() => userEvent.click(openModalButton))

    const actionButton = screen.getByText('Trigger Action')
    await act(() => userEvent.click(actionButton))

    await waitFor(() => {
      const errorToast = screen.getByText('Simulated error')
      expect(errorToast).toBeInTheDocument()
    })

    jest.spyOn(Math, 'random').mockRestore()
  })

  it('maintains modal state during loading and error transitions', async () => {
    renderWithProviders(<ExampleUsage />)

    const openModalButton = screen.getByText('Open Modal')
    await act(() => userEvent.click(openModalButton))

    const dialog = screen.getByRole('dialog')
    const actionButton = screen.getByText('Trigger Action')

    await act(() => userEvent.click(actionButton))

    // Dialog should persist during loading
    expect(dialog).toBeInTheDocument()

    // Wait for operation to complete
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    // Dialog should still be open
    expect(dialog).toBeInTheDocument()
  })
})
