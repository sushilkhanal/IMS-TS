import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/animate.css'
import '../styles/item.css'
import Dashboard from './Dashboard'

const LoginPage = ({ setSessionID }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatusMessage, setLoginStatusMessage] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [passwordAnimation, setPasswordAnimation] = useState('')

  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    // Clear the error message and animation when the password is changed
    setLoginStatusMessage('')
    setPasswordAnimation('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password
      })

      if (response.status === 200) {
        const sessionID = response.data.split('Session ID: ')[1]

        console.log('Login successful. Session ID:', sessionID)

        setLoginStatusMessage('')
        setLoginStatus(true)
        setSessionID(sessionID)

        navigate('/dashboard', { state: { username: username } }) // Pass the username as a state object
      }
    } catch (error) {
      console.error('Error:', error)
      setLoginStatusMessage('Incorrect username or password')
      setLoginStatus(false)
      setPasswordAnimation('animate__animated animate__shakeX')
    }
  }

  const handleForgotPassword = () => {
    window.open('https://youtu.be/dQw4w9WgXcQ', '_blank')
  }

  return (
    <>
      <div className="container">
        <div className="image">
          <div className="container d-flex justify-content-center align-items-center vh-100">
            <form
              className="animate__animated animate__fadeInLeft p-4 rounded"
              style={{
                width: '30%',
                height: '50%',
                border: '2px solid BLUE',
                backgroundColor: 'rgb(255, 255, 255, 0.8)'
              }}
              onSubmit={handleSubmit}
            >
              <h2 className="animate__animated animate__bounceInDown">Login</h2>

              <div className="mb-4">
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label className="form-label" htmlFor="form2Example1">
                  Username
                </label>
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  id="form2Example2"
                  className={`form-control ${
                    loginStatus === false && loginStatusMessage
                      ? 'is-invalid'
                      : ''
                  } ${passwordAnimation}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {loginStatus === false && loginStatusMessage && (
                  <div className="invalid-feedback">{loginStatusMessage}</div>
                )}
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
              </div>

              <div className="row mb-4 animate__animated animate__fadeInUp">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example31"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="form2Example31"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="col">
                  <a
                    href="#!"
                    className="animate__animated animate__fadeIn"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 animate__animated animate__fadeIn"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
