'use client'

import {
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, GitHub, Loader, Lock, Mail } from "react-feather"
import { toast } from "sonner"

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
  },
}))

const StyledSocialButton = styled(Button)(({ theme }) => ({
  flex: 1,
  borderColor: theme.palette.divider,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
}))

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
}

export default function LoginPage() {
  const router = useRouter()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
      toast.success('Welcome back!')
    } catch (error) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`)
      setIsLoading(false)
    }
  }

  return (
    <Container
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <StyledPaper elevation={2}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back
          </Typography>
          <Typography color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        <motion.form
          variants={formVariants}
          onSubmit={handleSubmit}
          noValidate
        >
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mb: 3 }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Loader size={20} className="animate-spin" />
                Signing in...
              </Box>
            ) : (
              'Sign in'
            )}
          </Button>

          <Box sx={{ position: 'relative', my: 4 }}>
            <Divider>
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                }}
              >
                Or continue with
              </Typography>
            </Divider>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <StyledSocialButton
              variant="outlined"
              startIcon={<GitHub size={20} />}
              disabled={isLoading}
              onClick={() => handleSocialLogin('github')}
            >
              GitHub
            </StyledSocialButton>
            <StyledSocialButton
              variant="outlined"
              startIcon={<Mail size={20} />}
              disabled={isLoading}
              onClick={() => handleSocialLogin('google')}
            >
              Google
            </StyledSocialButton>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
          >
            Don't have an account?{' '}
            <Link
              href="/register"
              style={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
              }}
            >
              Sign up
            </Link>
          </Typography>
        </motion.form>
      </StyledPaper>
    </Container>
  )
}
