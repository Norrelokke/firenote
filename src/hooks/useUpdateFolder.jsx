
import { updateDoc, doc, collection, getDocs, } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';
import { useParams } from "react-router-dom";

const useUpdateFolder =  () => {
    const params = useParams();
    const [FolderId, setFolderId] = useState(params.userid)
    const colFoldersRef = collection(db, FolderId)
 const updateTitle = async (id, newname) => {
 
       // get docs from db/userid 
       const querySnapshot =  await getDocs(colFoldersRef)
       let docs = []
       // iterate through and push data into docs array
         querySnapshot.forEach((doc) => {
           docs.push({ id: doc.id, name: doc.name, ...doc.data() })
           // find document with the same name as the params
       })
       const FolderToChange = docs.find(folder => folder.folderName === id)
       const FolderRef = doc(db, FolderId, FolderToChange.id);
       updateDoc(FolderRef, {
           folderName: newname,
       });
 };

return { updateTitle }


}

export default useUpdateFolder;