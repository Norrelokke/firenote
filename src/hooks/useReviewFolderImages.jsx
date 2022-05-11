import { useState} from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'


const useReviewFolderImages = (params = {}) => {

const [FolderId, setFolderId] = useState(params.folderid)

	const colImagesRef = collection(db, "revalbums" )

  const queryKey = [FolderId, params.foldername]

  const queryRef = query(colImagesRef, where('folderName', '==', params.foldername))

	const imageQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: '_id',
    subscribe: true,
	},{
		refetchOnMount: 'always',
  })

	return imageQuery

}

export default useReviewFolderImages;