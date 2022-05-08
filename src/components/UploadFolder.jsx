import React, { useRef, useState } from 'react';
import { Form, Button, Container,Alert } from 'react-bootstrap';
import useUploadFolder from '../hooks/useUploadFolder';

// Form to upload single Folder with foldercover image
const UploadFolder = () => {

const { UploadFolder } = useUploadFolder()
const foldernameRef = useRef()
const folderImage = useRef()
const [loading, setLoading] = useState(false)
const [folderCover, setFolderCover] = useState(null)
const [message, setMessage] = useState(null)
const [albumname, setAlbumname] = useState()

const updateName = () => {
const inputName = foldernameRef.current.value;
  setAlbumname(inputName);
  return albumname
}

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && selected.type.includes('image')) {
      setFolderCover(selected);
    } else {
      setFolderCover(null);
      setMessage({
        type: "warning",
        msg: 'File must be an image'
    });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    await UploadFolder ({
      
      name:foldernameRef.current.value,
    },
    folderCover,
    )
    setMessage({
      type: "success",
      msg: 'Folder uploaded, go to folder to upload images'
  });
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Create new Folder</h1>
        <Form.Group id="folder" className="mb-3">
          <Form.Label>Foldername:</Form.Label>
          <Form.Control type="text" ref={foldernameRef} onChange={updateName}/>
          <Form.Label>Upload cover: </Form.Label>
          <input type="file"  ref={folderImage} onChange={handleChange} />
        </Form.Group>
       
        <Button disabled={loading} type="submit"><h4>Create Folder</h4></Button>
        {message && <Alert variant={message.type}>{message.msg}</Alert>}
      </Form>
    </Container>
  )
}

export default UploadFolder