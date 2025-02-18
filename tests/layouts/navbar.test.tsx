import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import Navbar from '@/components/layouts/Navbar';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Navbar', () => {
  const theme = createTheme();
  const renderNavbar = () =>
    render(
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    );

  it('renders the logo', () => {
    renderNavbar();
    expect(screen.getByText('HDS')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
  });

  it('renders auth buttons', () => {
    renderNavbar();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderNavbar();
    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);
    // Check if menu items are visible
    expect(screen.getByText('Home')).toBeVisible();
  });

  it('navigates to sign in page when sign in button is clicked', () => {
    const { push } = require('next/router').useRouter();
    renderNavbar();
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    expect(push).toHaveBeenCalledWith('/auth/sign-in');
  });

  it('navigates to sign up page when sign up button is clicked', () => {
    const { push } = require('next/router').useRouter();
    renderNavbar();
    const signUpButton = screen.getByText('Sign Up');
    fireEvent.click(signUpButton);
    expect(push).toHaveBeenCalledWith('/auth/sign-up');
  });
});
