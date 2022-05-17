import React, { useEffect } from 'react'
import usefileUpload from '../hooks/usefileUpload'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Images = ({ file, setFile }) => {
  const { progress, url } = usefileUpload(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <>
      {progress &&   
      <ProgressBar variant="success" animated now={progress} />
      }
    </>
  );
}

export default Images;