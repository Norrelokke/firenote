import React, { useState } from 'react'
import { db, storage } from '../firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref, getDownloadURL , uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'
import { v4 as uuidv4 } from "uuid";

const useUploadImageToFolder =  () => {

  
  const _id = uuidv4();
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState(null)
    const [url, setUrl] = useState(null)
    const { onlineUser } = useAuthContext()

 const uploadImage = (image, album) => {

    if (!image || image == undefined)
    {
        return
    }

    const storageRef = ref(storage, `${onlineUser.uid}/${album}/${image.name}`);
    const FolderRef = doc(db, onlineUser.email, album);
    
    uploadBytesResumable(storageRef, image).on('state_changed', (snap) => {
      setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))

    }, (e) => {
      setMessage(e);
    }, async () => {
      const url = await getDownloadURL(storageRef);
      setUrl(url);
      await updateDoc(FolderRef, {
        folderImages: arrayUnion({
          name: image.name,
          owner: onlineUser.email,
          path: storageRef.fullPath,
          size: image.size,
          type: image.type,
          url,
          _id,
        }),
      })
    });
   
}
return { progress, url, message, uploadImage }
    
}

export default useUploadImageToFolder
