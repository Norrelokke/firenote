import React from 'react'
import Container from 'react-bootstrap/Container'
import ImageGrid from '../components/ImageGrid'
import useImages from '../hooks/useImages'
import UploadForm from '../components/UploadForm'
import { Link } from 'react-router-dom'
import useFolders from '../hooks/useFolders'
import FolderGrid from '../components/FolderGrid'
import ReviewFolderGrid from '../components/ReviewFolderGrid'

const MyProfile = () => {
    const ImagesQuery = useImages({
        fetchUserImages: true,
    })
    const folderQuery = useFolders()
    const revfolderQuery = useFolders({
        fetchReviewFolders:true,
    })

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
                <ReviewFolderGrid query={revfolderQuery} />
                <ImageGrid query={ImagesQuery} />
            </Container>
        </div>
    )
}

export default MyProfile
