import React, { useState } from 'react'
import { db, storage } from '../firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref, getDownloadURL , uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'

const useUploadImageToFolder =  () => {
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
    const FolderRef = doc(db, onlineUser.uid, album);
    
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
          owner: onlineUser.uid,
          path: storageRef.fullPath,
          size: image.size,
          type: image.type,
          url,
        }),
      })
    });
   
}
return { progress, url, message, uploadImage }
    
}

export default useUploadImageToFolder
