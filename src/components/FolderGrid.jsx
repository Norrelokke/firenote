import React from 'react';
import Container from 'react-bootstrap/Container'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext'

const FolderGrid = ({ query }) => {
    const navigate = useNavigate();
    const { onlineUser } = useAuthContext()

    return (
        <Container>
            <div className="text-center"> <h1>Folders</h1> </div>
            <div className="folder-grid">
                {query.data && query.data.map(folder => (
                    <div className="folder-wrap" key={folder._id} onClick={() => navigate("/folders/" + folder.folderName + "/" + onlineUser.uid)}>
                        <h2>  {folder.folderName} </h2>
                    </div>
                ))
                }
            </div>

        </Container>
    )
}

export default FolderGrid;