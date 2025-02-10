import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../utils/theme'
import { login } from '../../utils/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    if (!email.includes('@utexas.edu')) {
      alert('Please use a valid UT email') // need to implement email verification feature
      return
    } else {
      try {
        await login(email, password)
        navigate('/home')
      } catch (error) {
        // need to implement better error handling (ex: "incorrect password", user dne)
        alert('Email or password incorrect. Please try again.')
      }
    }
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 8 }}
          >
            Horn Deals
          </Typography>
          <Typography
            component="h2"
            variant="h6"
            sx={{ fontWeight: 'bold', mt: 2 }}
          >
            SIGN IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your UT EID"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: { backgroundColor: '#f5f5f5' },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: { backgroundColor: '#f5f5f5' },
              }}
            />
            <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Keep me signed in"
              />
              <Link
                href="#"
                variant="body2"
                sx={{ textDecoration: 'none', ml: 'auto', fontWeight: 'bold' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#A52A2A',
                ':hover': { backgroundColor: '#8b1a1a' },
              }}
            >
              Sign In
            </Button>
            <Box display="flex" justifyContent="center">
              <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                Don’t have an account?{' '}
                <Link
                  href="#"
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
