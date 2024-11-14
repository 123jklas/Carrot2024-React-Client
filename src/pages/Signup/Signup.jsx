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

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const handleToLoginClick = () => {
    navigate('/')
  }
  const handleSubmit = event => {
    event.preventDefault()
    // Basic validation for passwords match
    if (!email.includes('@utexas.edu')) {
      alert('Please use a valid UT email')
      return
    } else if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Handle signup logic here
    console.log({ email, password })
    navigate('/home/')
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
          Sign Up
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
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={handleToLoginClick}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Signup
