import React from 'react'
import Container from 'react-bootstrap/Container'
import ImageGrid from '../components/ImageGrid'
import useImages from '../hooks/useImages'
import UploadForm from '../components/UploadForm'
import { Link } from 'react-router-dom'
import useFolders from '../hooks/useFolders'
import FolderGrid from '../components/FolderGrid'

const MyProfile = () => {
    const ImagesQuery = useImages({
        fetchUserImages: true,
    }, {
        subscribe: true,
    })
    const folderQuery = useFolders()

    return (

        <div className="myprofile">
            <Container className="py-3">
                <h1>Profile</h1>
                <UploadForm />
                <div className="text-center">
                    <h2> Upload Folder</h2>
                    <Link to="/uploadfolder"><span className="plus">+</span></Link>
                </div>
                <FolderGrid query={folderQuery} />
                <ImageGrid query={ImagesQuery} />
            </Container>
        </div>
    )
}

export default MyProfile
