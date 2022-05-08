import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const RequireAuth = ({ children, redirectTo }) => {
	const { onlineUser } = useAuthContext()

	return (
		onlineUser
			? children
			: <Navigate to={redirectTo} />
	)
}

export default RequireAuth