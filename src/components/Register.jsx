import React, { useState, useRef } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Container, Form, Button } from "react-bootstrap"

const Register = () => {
  const { signup } = useAuthContext()
  const [loading, setLoading] = useState()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    // confirm password values matching
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setMessage("The passwords does not match")
    }

    setMessage(null);

    // try to sign up with the given credentials 
    try {
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (e) {
      setMessage(e.message)
      setLoading(false)
    }
  }

  return (
    <Container className="col-md-4 py-5" >
      <h1 className="text-center">Sign up</h1>
      <Form onSubmit={handleSignup}>
        {message && (<Alert variant={"danger"}>{message}</Alert>)}
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Email" required />
        </Form.Group>

        <Form.Group id="password">
          <Form.Label>Create a password</Form.Label>
          <Form.Control ref={passwordRef} type="password" name="password" placeholder="Password" required />
        </Form.Group>

        <Form.Group id="password">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control ref={passwordConfirmRef} type="password" placeholder="Confirm Password" required />
        </Form.Group>

        <Button disabled={loading} className="text-center" variant="primary" type="submit">Submit</Button>

      </Form>
      <div className="text-center mt-3">
        Already a member? <Link to="/login">Log In</Link>
      </div>
    </Container>
  );
}

export default Register;