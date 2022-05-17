
import { updateDoc, doc,} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';
import { useParams } from "react-router-dom";

const useUpdateFolder = () => {
  const params = useParams();
  const [FolderId, setFolderId] = useState(params.folderid)
  
  const updateTitle = async (newname) => {

    const FolderRef = doc(db, params.userid, FolderId);

    updateDoc(FolderRef, {
      folderName: newname,
    });
  };

  return { updateTitle }


}

export default useUpdateFolder;