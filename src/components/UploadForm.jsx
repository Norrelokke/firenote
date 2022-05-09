import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import Images from './images.jsx'

// Form to upload single image
const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && selected.type.includes('image')) {
      setFile(selected);
      setMessage({
        type: "success",
        msg: 'File uploaded'
    });
    } else {
      setFile(null);
      setMessage({
        type: "warning",
        msg: 'File must be an image'
    });
    }
  };

  return (
      <div  className="UploadForm">
    <Form>
        	{message && <Alert variant={message.type}>{message.msg}</Alert>}
          <h2>Upload Image</h2>
      <label>
        <input type="file" onChange={handleChange} />

        <span>+</span>
      </label>
      <div className="output">

        { file && <Images file={file} setFile={setFile}/> }
      </div>
    </Form>
    </div>
  );
}

export default UploadForm;