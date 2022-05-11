import React, { useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import useUpdateFolder from '../hooks/useUpdateFolder'
import UploadImageDropzone from '../components/UploadImageDropzone'
import FolderImageGrid from '../components/FolderImageGrid'
import { useAuthContext } from '../contexts/AuthContext'
import useFolderImages from '../hooks/useFolderImages'

const SingleFolder = () => {
  const { onlineUser } = useAuthContext()
  const params = useParams();
  const [showsettings, setShowsettings] = useState(false)
  const foldernameRef = useRef() 
  const { updateTitle } = useUpdateFolder(params.foldername)
  const [name, setName] = useState(params.foldername)
  const [folderurl, setFolderurl] = useState("https://spontaneous-beijinho-8ddd64.netlify.app/#/folders/" + params.foldername + "/" + params.userid )
  const imagesQuery = useFolderImages({
		fetchAlbumImages:true,
    foldername: params.foldername,
    folderid:params.userid,
	}
  )

  const copyText = () => {
    var copyText = document.getElementById("urlInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    updateTitle(params.foldername, foldernameRef.current.value)

    if (params.foldername !== foldernameRef.current.value)
      setName(foldernameRef.current.value)
  }

  return (
    <>
      <Container className="singleFolder">
    <h3> Folder {name}</h3> 

   
 <h2>   <span className="spantext">Url/Upload/NameChange? PRESS COG </span><FontAwesomeIcon icon={faCog} onClick={() => setShowsettings(!showsettings)} /> </h2>
      </Container>

      {onlineUser && showsettings &&
        <Container className='foldername col-md-4 py-5'>
          
          <UploadImageDropzone albumname={params.foldername} />
          <p>Share Folderurl:  <input type="text" value={folderurl}  id="urlInput" readOnly></input> <Button onClick={copyText}>Copy text</Button></p>
          <h3>Change foldername:</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Control type="text" ref={foldernameRef} />
            <Button type="submit"><h3>Submit</h3></Button>
          </Form>
        </Container>}
      <FolderImageGrid query={imagesQuery}/>  
    </>
  )
};

export default SingleFolder;
