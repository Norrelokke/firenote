import { useState } from 'react';
import { db, storage } from '../firebase'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from "uuid";

const useUploadReviewFolder = () => {
  const [message, setMessage] = useState(null)
  const [url, setUrl] = useState(null)

  const UploadReview = (owner, folderimages) => {
    
    const _id = uuidv4();

    if (owner.folderimages === undefined) {
      folderimages = [];
    }
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const fileRef = ref(storage, `/revfolders/` + _id )

    uploadBytesResumable(fileRef, time).on('state_changed', (snap) => {

    }, (e) => {
      setMessage(e);
    }, async () => {
      //reference to the uploaded file 
      // get reference to collection images
      const url = await getDownloadURL(fileRef)
      setUrl(url);
       const collectionRef = doc(db, "revalbums", time)



      // create document in db for the uploaded file
      await setDoc(collectionRef, {
        created: serverTimestamp(),
        folderName: time,
        path: fileRef.fullPath,
        url,
        _id,
        folderImages: owner.folderimages,
        owner: owner.owner,
      })
    })
  };
  return { UploadReview, url, message }
}

export default useUploadReviewFolder