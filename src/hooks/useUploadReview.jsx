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

  const UploadReview = (owner, folderimages) => {
    
    const folderId = uuidv4();

    if (owner.folderimages === undefined) {
      folderimages = [];
    }

    const fileRef = ref(storage, `/revfolders/` + folderId )

    uploadBytesResumable(fileRef, owner).on('state_changed', (snap) => {

    }, (e) => {
      setMessage(e);
    }, async () => {
      //reference to the uploaded file 
      // get reference to collection images
      const url = await getDownloadURL(fileRef)
      setUrl(url);
       const collectionRef = collection(db, onlineUser.uid)

       var today = new Date();

var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      // create document in db for the uploaded file
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        folderName: time,
        path: fileRef.fullPath,
        url,
        _id: folderId,
        folderImages: owner.folderimages,
      })
    })
  };
  return { UploadReview, url, message }
}

export default useUploadReviewFolder