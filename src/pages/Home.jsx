import React from 'react'
import ImageGrid from '../components/ImageGrid'
import useImages from '../hooks/useImages'
import { useAuthContext } from '../contexts/AuthContext'

const Home = () => {
	const { onlineUser } = useAuthContext()
	const imagesQuery = useImages()
	return (
		<>
			<div className="text-center">{onlineUser ? <p>Upload folders and images under "my profile" in menu </p> : <p>Sign up to upload images!</p>}</div>
			<div className="text-center"><h1>Latest from users</h1></div>
			<ImageGrid query={imagesQuery} />
		</>
	)
}

export default Home
