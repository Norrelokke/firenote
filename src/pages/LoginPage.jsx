import React from 'react'
import Login from "../components/Login"
import Register from '../components/Register'
import { useAuthContext } from '../contexts/AuthContext'


const LoginPage = () => {
    const { onlineUser } = useAuthContext()

    return (
        <>
            {onlineUser ? <Login /> : <Register />}
        </>
    )
}

export default LoginPage