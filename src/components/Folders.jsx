import React, { useEffect, useState } from 'react';
import useUploadFolder from '../hooks/useUploadFolder';

const Folders = ({ name, setName, folderCover, setFolderCover }) => {
  const { url, progress } = useUploadFolder(name, folderCover);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (url) {
      setName(null);
      setFolderCover(null);
    }
  }, [url, setName, setFolderCover]);

  return (
    <>
      {loading && <div className={progress} style={{ width: progress }}>{progress}</div>}
    </>
  );
}

export default Folders;