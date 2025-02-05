import {useAuth} from '@/lib/auth';
import {Box, Container, ContainerProps, Stack, StackProps} from '@mui/material';
import {ReactNode} from 'react';

// Page Layout
interface PageLayoutProps extends ContainerProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

export function PageLayout({children, maxWidth = 'lg', centered, ...props}: PageLayoutProps) {
  return (
    <Container
      maxWidth={maxWidth}
      {...props}
      sx={{
        py: 4,
        minHeight: '100vh',
        display: centered ? 'flex' : 'block',
        flexDirection: centered ? 'column' : undefined,
        alignItems: centered ? 'center' : undefined,
        justifyContent: centered ? 'center' : undefined,
        ...props.sx,
      }}
    >
      {children}
    </Container>
  );
}

// Section Layout
interface SectionProps extends StackProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
}

export function Section({children, title, subtitle, fullWidth, ...props}: SectionProps) {
  return (
    <Stack
      component='section'
      spacing={3}
      {...props}
      sx={{
        width: fullWidth ? '100%' : 'auto',
        py: 4,
        ...props.sx,
      }}
    >
      {(title || subtitle) && (
        <Stack spacing={1} sx={{mb: 2}}>
          {title && (
            <Box
              component='h2'
              sx={{
                fontSize: 'h4.fontSize',
                fontWeight: 'bold',
                m: 0,
              }}
            >
              {title}
            </Box>
          )}
          {subtitle && (
            <Box
              component='p'
              sx={{
                fontSize: 'body1.fontSize',
                color: 'text.secondary',
                m: 0,
              }}
            >
              {subtitle}
            </Box>
          )}
        </Stack>
      )}
      {children}
    </Stack>
  );
}

// Auth Guard
interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
}

export function AuthGuard({children, requiredRole}: AuthGuardProps) {
  const {isAuthenticated, role} = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

// Grid Layout
interface GridLayoutProps extends StackProps {
  children: ReactNode;
  columns?: number;
  spacing?: number;
}

export function GridLayout({children, columns = 3, spacing = 3, ...props}: GridLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: columns > 1 ? 'repeat(2, 1fr)' : '1fr',
          md: `repeat(${columns}, 1fr)`,
        },
        gap: spacing,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
