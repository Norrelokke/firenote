import  { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL , uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'

const usefileUpload = (file) => {
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState(null)
    const [url, setUrl] = useState(null)
    const { onlineUser } = useAuthContext()
    useEffect(() => {
        // reference to file inside firebase storage bucket
        // file doesnt exist yet, but when it is created it will have this name
        // so i can later use the .on method and put it in the bucket
        const storageRef = ref(storage, `${onlineUser.uid}/images/ ${file.name}`);
        const collectionRef = collection(db, 'images');
        
        uploadBytesResumable(storageRef, file).on('state_changed', (snap) => {
          setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
        }, (e) => {
          setMessage(e);
        }, async () => {
          const url = await getDownloadURL(storageRef);
          setUrl(url);
          await addDoc(collectionRef, {
            created: serverTimestamp(),
            name: file.name,
            owner: onlineUser.uid,
            path: storageRef.fullPath,
            size: file.size,
            type: file.type,
            url,
          })
        });
      }, [file]);
        return { progress, url, message }
}

export default usefileUpload
