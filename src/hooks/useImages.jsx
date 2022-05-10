import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useImages = (params = {}) => {
  const { onlineUser } = useAuthContext()
	const colImagesRef = collection(db, 'images')

  const queryKey = params.fetchUserImages
  ? ['images', onlineUser.email]
  : ['images']

  const queryRef = params.fetchUserImages
  ? query(colImagesRef, where('owner', '==', onlineUser.uid))
  : query(colImagesRef)


	const imageQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: '_id',
	}, {
    subscribe: true,
  })

	return imageQuery
}

export default useImages;