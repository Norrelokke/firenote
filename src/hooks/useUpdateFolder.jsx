
import { useEffect } from "react";
import { updateDoc, doc, collection, getDocs, } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from '../contexts/AuthContext'
import { useState } from 'react';
import { useParams } from "react-router-dom";


const useUpdateFolder =  () => {
    const params = useParams();
    console.log(params)

    const [FolderId, setFolderId] = useState(params.userid)

 const updateTitle =  (id, newname) => {
    useEffect(() => {
       // get docs from db/userid 
       const querySnapshot =  getDocs(colFoldersRef)
       let docs = []
       // iterate through and push data into docs array
       const unsubscribe =  querySnapshot.forEach((doc) => {
           docs.push({ id: doc.id, name: doc.name, ...doc.data() })
           // find document with the same name as the params
       })
       const FolderToChange = docs.find(folder => folder.folderName === id)
       const FolderRef = doc(db, FolderId, FolderToChange.id);
       updateDoc(FolderRef, {
           folderName: newname,
       });
       return () => {
        unsubscribe();
      };
    }, []);
 };

return { updateTitle }


}

export default useUpdateFolder;