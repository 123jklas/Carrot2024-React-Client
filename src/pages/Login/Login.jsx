import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import carrot from '../../assets/images/carrot.png'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    if (!email.includes('@utexas.edu')) {
      alert('Please use a valid UT email')
      return
    }
    console.log({ email, password })
    navigate('/home/')
  }

  const handleSignupClick = () => {
    navigate('/signup/') // Navigate to the signup page
  }

  return (
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
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
          }}
          alt="carrot icon"
          src={carrot}
        />

        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={handleSignupClick} // Call the navigate function on click
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
