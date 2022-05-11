import { useState} from 'react';
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'


const useFolderImages = (params = {}) => {

  const [FolderId, setFolderId] = useState(params.FolderId)

	const colImagesRef = collection(db,params.folderid)

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