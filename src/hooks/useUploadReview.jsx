import { useState } from 'react';
import { db, storage } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from '../contexts/AuthContext'

const useUploadReviewFolder = () => {
  const [message, setMessage] = useState(null)
  const { onlineUser } = useAuthContext()
  const [url, setUrl] = useState(null)

  const UploadReview = (folder, folderimages) => {
console.log(folder.folderimages)

    const folderId = uuidv4();

    if (folder.folderimages === undefined) {
      folderimages = [];
    }

    const fileRef = ref(storage, `/revfolders/` + folderId )

    uploadBytesResumable(fileRef, folder).on('state_changed', (snap) => {

    }, (e) => {
      setMessage(e);
    }, async () => {
      //reference to the uploaded file 
      // get reference to collection images
      const url = await getDownloadURL(fileRef)
      setUrl(url);
       const collectionRef = collection(db, onlineUser.email)

       var today = new Date();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      // create document in db for the uploaded file
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        folderName: time,
        path: fileRef.fullPath,
        url,
        folderId,
        folderImages: folder.folderimages,
      })
    })
  };
  return { UploadReview, url, message }
}

export default useUploadReviewFolder