import { useState} from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useFolderImages = (params = {}) => {
  const { onlineUser } = useAuthContext()
  const [FolderId, setFolderId] = useState(onlineUser.email)
// the collection is retrieved
// with the params so a user without credentials could review the album
	const colImagesRef = collection(db, onlineUser.email)

  const queryKey = params.fetchAlbumImages
  ? [ FolderId,  params.foldername]
  : ['images']

  const queryRef = params.fetchAlbumImages
  ? query(colImagesRef, where('folderName', '==', params.foldername))
  : query(colImagesRef)

	const imageQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: '_id',
    subscribe: true,
	},{
		refetchOnMount: 'always',
  })

	return imageQuery
}

export default useFolderImages;