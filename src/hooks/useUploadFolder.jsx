import { useState } from 'react';
import { db, storage } from '../firebase'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'
import { v4 as uuidv4 } from "uuid";

const useUploadFolder = () => {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(null)
  const { onlineUser } = useAuthContext()
  const [url, setUrl] = useState(null)

  const UploadFolder = (name, folderCover, folderImages) => {

    const folderId = uuidv4();

    if (folderCover === undefined) {
      folderCover = [];
    }
    if (folderImages === undefined) {
      folderImages = [];
    }

    const fileRef = ref(storage, `folders/` + folderId )

    uploadBytesResumable(fileRef, name, folderCover).on('state_changed', (snap) => {
      setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
    }, (e) => {
      setMessage(e);
    }, async () => {
      //reference to the uploaded file 
      // get reference to collection images
      const url = await getDownloadURL(fileRef)
      setUrl(url);
       const collectionRef = doc(db, onlineUser.uid, name.name)

      // create document in db for the uploaded file

      await setDoc(collectionRef, {
        created: serverTimestamp(),
        folderName: name.name,
        path: fileRef.fullPath,
        owner: onlineUser.uid,
        url,
        _id: folderId,
        folderCover: folderCover.name,
        folderImages: folderImages,
      })
    })
  };
  return { progress, UploadFolder, url, message }
}

export default useUploadFolder