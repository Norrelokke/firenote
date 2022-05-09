import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
    const { signout } = useAuthContext()
    const navigate = useNavigate()

    useEffect(async () => {
        await signout()
		navigate('/')
    }, [])

    return (
        <Container className="col-md-4 py-5" >
            <div className="text-center"><p> You're being signed out</p></div>
        </Container>
    )
}

export default LogoutPage
