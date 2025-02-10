const login = async (email, password) => {
  // Implement login logic here
  // Example: send a request to your backend API
  const response = await fetch('http://127.0.0.1:8000/api/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  // Save token or user data to localStorage or context
  localStorage.setItem('token', data.token)
  return data
}

const signup = async (firstname, lastname, email, password) => {
  console.log(firstname, lastname, email, password)
  const response = await fetch('http://127.0.0.1:8000/api/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    }),
  })

  if (!response.ok) {
    throw new Error('Signup failed')
  }

  const data = await response.json()
  localStorage.setItem('token', data.token)
  return data
}

const logout = () => {
  // Implement logout logic here
  localStorage.removeItem('token')
}

const fetchProtectedData = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('http://127.0.0.1:8000/api/protected/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Not authorized')
  }

  const data = await response.json()
  return data
}

export { login, signup, logout, fetchProtectedData }
