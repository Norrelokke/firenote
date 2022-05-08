import { useState} from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useFolderImages = (params = {}) => {
  const { onlineUser } = useAuthContext()
  const [FolderId, setFolderId] = useState(onlineUser)
// the collection is retrieved
// with the params so a user without credentials could review the album
	const colImagesRef = collection(db, params.folderid)

  const queryKey = params.fetchAlbumImages
  ? [ FolderId,  FolderId]
  : ['images']

  const queryRef = params.fetchAlbumImages
  ? query(colImagesRef, where('folderName', '==', params.foldername), orderBy('created', 'desc'))
  : query(colImagesRef, orderBy('created', 'desc'))

	const imageQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: '_id',
	})

	return imageQuery
}

export default useFolderImages;