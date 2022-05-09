import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Alert, Form, Button } from "react-bootstrap"

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const { signin } = useAuthContext()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null);

        // try to login with the given credentials 
        try {
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            navigate('/')

        } catch (e) {
            setError(e.message)
            setLoading(false)
        }
    }
    return (
        <Container className="col-md-4 py-5" >
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleLogin}>
                {error && (<Alert variant={"danger"}>{error}</Alert>)}

                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group id="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                </Form.Group>

                <Button className="text-center" variant="primary" type="submit">Sign In</Button>

            </Form>

            <div className="text-center mt-3">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </Container>
    );
}

export default Login;