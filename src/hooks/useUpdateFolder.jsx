
import { updateDoc, doc, collection, getDocs, } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from '../contexts/AuthContext'

const useUpdateFolder =  () => {
    const { onlineUser } = useAuthContext()

    const colFoldersRef = collection(db, onlineUser.email)

 const updateTitle = async (id, newname) => {
       // get docs from db/userid 
       const querySnapshot = await getDocs(colFoldersRef)
       let docs = []
       // iterate through and push data into docs array
       querySnapshot.forEach((doc) => {
           docs.push({ id: doc.id, name: doc.name, ...doc.data() })
           // find document with the same name as the params
       })
       const FolderToChange = docs.find(folder => folder.folderName === id)
       const FolderRef = doc(db, onlineUser.email, FolderToChange.id);
       console.log(FolderToChange.id)
       updateDoc(FolderRef, {
           folderName: newname,
       });
 };

return { updateTitle }
}

export default useUpdateFolder;