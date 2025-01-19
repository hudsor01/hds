import
    {
        AppBar,
        Badge,
        Box,
        Button,
        Container,
        Drawer,
        Grid,
        IconButton,
        List,
        ListItem,
        ListItemText,
        Tooltip,
        Typography,
        useMediaQuery,
        useTheme
    } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import type { Route } from 'next'
import { useTheme as useNextTheme } from 'next-themes'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import
    {
        ArrowRight,
        BarChart,
        BookOpen,
        Box as BoxIcon,
        ChevronDown,
        Menu,
        MessageCircle,
        Moon,
        Sun,
        Users,
        X,
        Zap
    } from 'react-feather'

// Enhanced menu data with icons and additional information
const featuresMenu = {
  mainFeatures: [
    {
      title: 'Property Management',
      description: 'Complete solution for property operations',
      path: '/features/property-management' as Route,
      icon: <BoxIcon size={20} />,
      badge: 'Popular',
      subItems: [
        { title: 'Maintenance Requests', path: '/features/maintenance' as Route },
        { title: 'Rent Collection', path: '/features/rent-collection' as Route },
        { title: 'Lease Management', path: '/features/lease-management' as Route },
      ]
    },
    {
      title: 'Tenant Portal',
      description: 'Self-service platform for tenants',
      path: '/features/tenant-portal' as Route,
      icon: <Users size={20} />,
      badge: 'New',
      subItems: [
        { title: 'Payment Portal', path: '/features/payment-portal' as Route },
        { title: 'Communication Hub', path: '/features/communication' as Route },
        { title: 'Document Center', path: '/features/documents' as Route },
      ]
    },
    {
      title: 'Financial Tools',
      description: 'Comprehensive financial management',
      path: '/features/financial-tools' as Route,
      icon: <BarChart size={20} />,
      subItems: [
        { title: 'Reporting', path: '/features/reporting' as Route },
        { title: 'Accounting', path: '/features/accounting' as Route },
        { title: 'Analytics', path: '/features/analytics' as Route },
      ]
    },
  ],
  quickLinks: [
    {
      title: 'Getting Started',
      description: 'Quick start guide',
      icon: <Zap size={20} />,
      path: '/getting-started' as Route
    },
    {
      title: 'Documentation',
      description: 'Detailed guides',
      icon: <BookOpen size={20} />,
      path: '/docs' as Route
    },
    {
      title: 'Support',
      description: '24/7 customer service',
      icon: <MessageCircle size={20} />,
      path: '/support' as Route
    }
  ],
  highlight: {
    title: 'New Feature',
    description: 'AI-Powered Property Insights',
    path: '/features/ai-insights' as Route,
    image: '/feature-preview.jpg'
  }
}

// Animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    transformOrigin: 'top'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

interface NavbarProps {
  scrolled?: boolean;
}

interface EnhancedDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'features' | 'solutions';
}

function EnhancedDropdown({ isOpen, onClose, type }: EnhancedDropdownProps) {
  const theme = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-40"
            onClick={onClose}
          />

          {/* Dropdown Menu */}
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 w-full z-50"
          >
            <Box
              className="bg-white border-t border-gray-100 shadow-xl"
              sx={{
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <Box className="container mx-auto py-8">
                <Grid container spacing={4}>
                  {/* Main Features Column */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="overline" className="text-gray-500 mb-4">
                      Main Features
                    </Typography>
                    <Box className="space-y-4">
                      {featuresMenu.mainFeatures.map((feature) => (
                        <motion.div
                          key={feature.title}
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                          className="group"
                        >
                          <Link href={feature.path}>
                            <Box className="p-4 rounded-lg hover:bg-primary/5 transition-all">
                              <Box className="flex items-start gap-3">
                                <Box
                                  className="p-2 rounded-lg bg-primary/10 text-primary"
                                  sx={{ color: theme.palette.primary.main }}
                                >
                                  {feature.icon}
                                </Box>
                                <Box className="flex-1">
                                  <Box className="flex items-center gap-2">
                                    <Typography variant="subtitle1" className="font-medium">
                                      {feature.title}
                                    </Typography>
                                    {feature.badge && (
                                      <Badge
                                        color={feature.badge === 'New' ? 'success' : 'primary'}
                                        badgeContent={feature.badge}
                                        sx={{
                                          '& .MuiBadge-badge': {
                                            fontSize: '0.65rem',
                                            height: '18px',
                                            minWidth: '18px',
                                            padding: '0 6px',
                                          }
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                  </Typography>

                                  {/* Sub-items */}
                                  <Box className="mt-2 flex flex-wrap gap-2">
                                    {feature.subItems.map((subItem) => (
                                      <Tooltip
                                        key={subItem.title}
                                        title="Click to learn more"
                                        arrow
                                      >
                                        <Link
                                          href={subItem.path}
                                          className="text-sm text-gray-600 hover:text-primary"
                                        >
                                          {subItem.title}
                                          {feature.subItems.indexOf(subItem) < feature.subItems.length - 1 &&
                                            <span className="mx-2">•</span>
                                          }
                                        </Link>
                                      </Tooltip>
                                    ))}
                                  </Box>
                                </Box>
                                <ArrowRight
                                  size={20}
                                  className="text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all"
                                />
                              </Box>
                            </Box>
                          </Link>
                        </motion.div>
                      ))}
                    </Box>
                  </Grid>

                  {/* Quick Links & Highlight Column */}
                  <Grid item xs={12} md={6}>
                    {/* Quick Links */}
                    <Typography variant="overline" className="text-gray-500 mb-4">
                      Quick Links
                    </Typography>
                    <Grid container spacing={2}>
                      {featuresMenu.quickLinks.map((link) => (
                        <Grid item xs={12} sm={6} key={link.title}>
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Link href={link.path}>
                              <Box
                                className="p-4 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all"
                                sx={{ height: '100%' }}
                              >
                                <Box className="flex items-center gap-3">
                                  <Box className="text-primary">
                                    {link.icon}
                                  </Box>
                                  <Box>
                                    <Typography variant="subtitle2">
                                      {link.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {link.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Link>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Feature Highlight */}
                    <Box className="mt-6">
                      <Typography variant="overline" className="text-gray-500 mb-4">
                        Featured
                      </Typography>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link href={featuresMenu.highlight.path}>
                          <Box
                            className="rounded-lg overflow-hidden border border-gray-100 hover:border-primary/30 transition-all"
                          >
                            <Box
                              className="h-32 bg-gray-100 relative"
                              sx={{
                                backgroundImage: `url(${featuresMenu.highlight.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            >
                              <Box
                                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                              />
                              <Box className="absolute bottom-0 left-0 p-4">
                                <Typography variant="subtitle1" className="text-white font-medium">
                                  {featuresMenu.highlight.title}
                                </Typography>
                                <Typography variant="body2" className="text-gray-200">
                                  {featuresMenu.highlight.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Link>
                      </motion.div>
                    </Box>
                  </Grid>
                </Grid>

                {/* Footer */}
                <Box className="mt-8 pt-6 border-t border-gray-100">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Need help? Our support team is available 24/7
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className="flex justify-end gap-4">
                        <Button
                          variant="outlined"
                          startIcon={<BookOpen size={16} />}
                          size="small"
                          component={Link}
                          href="/docs"
                        >
                          Documentation
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<MessageCircle size={16} />}
                          size="small"
                          component={Link}
                          href="/support"
                        >
                          Contact Support
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Navbar({ scrolled = false }: NavbarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { theme: currentTheme, setTheme } = useNextTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'solutions' | null>(null)

  // Handle scroll lock for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Mobile menu components
  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '300px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <Box className="p-4">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h6" className="font-bold">
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </IconButton>
        </Box>

        <List>
          {featuresMenu.mainFeatures.map((item) => (
            <div key={item.title}>
              <ListItem
                onClick={() => {
                  setMobileMenuOpen(false)
                }}
              >
                <Link href={item.path} className="w-full">
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </Link>
              </ListItem>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 1 : 0}
      sx={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          className="flex items-center justify-between py-4"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Typography variant="h5" className="font-bold text-gray-900">
                Hudson Digital
              </Typography>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box className="flex items-center gap-6">
              <div
                onMouseEnter={() => setActiveDropdown('features')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="relative"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`nav-link ${activeDropdown === 'features' ? 'text-primary' : ''}`}
                    endIcon={<ChevronDown size={16} />}
                  >
                    Features
                  </Button>
                </motion.div>

                <EnhancedDropdown
                  isOpen={activeDropdown === 'features'}
                  onClose={() => setActiveDropdown(null)}
                  type="features"
                />
              </div>

              <motion.div variants={itemVariants}>
                <Button
                  component={Link}
                  href="/pricing"
                  className="nav-link"
                >
                  Pricing
                </Button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  component={Link}
                  href="/about"
                  className="nav-link"
                >
                  About
                </Button>
              </motion.div>
            </Box>
          )}

          {/* Right Side Actions */}
          <Box className="flex items-center gap-4">
            {/* Theme Toggle */}
            <IconButton
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className="hover:text-primary"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTheme}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </IconButton>

            {/* Authentication Buttons */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                className="mr-2"
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/signup"
                variant="contained"
              >
                Get Started
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden"
              >
                <Menu size={24} />
              </IconButton>
            )}
          </Box>
        </motion.div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu />
    </AppBar>
  )
}
