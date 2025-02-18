import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Close as CloseIcon,
} from '@mui/icons-material';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
  { name: 'Testimonials', href: '/testimonials' },
];

export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleAuthAction = (action: 'signin' | 'signup') => {
    router.push(`/auth/${action === 'signin' ? 'sign-in' : 'sign-up'}`);
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HDS
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMobileMenuToggle}
              color="inherit"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navigationLinks.map((item) => (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    handleMenuClose();
                  }}
                >
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navigationLinks.map((item) => (
              <Button
                key={item.name}
                component={Link}
                href={item.href}
                sx={{
                  my: 2,
                  mx: 1,
                  color: 'inherit',
                  display: 'block',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              color="inherit"
              onClick={() => handleAuthAction('signin')}
              sx={{ mr: 1 }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAuthAction('signup')}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
