import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useImages = (params = {}) => {
  const { onlineUser } = useAuthContext()
	const colImagesRef = collection(db, 'images')

  const queryKey = params.fetchUserImages
  ? ['images', onlineUser.uid]
  : ['images']

  const queryRef = params.fetchUserImages
  ? query(colImagesRef, where('owner', '==', onlineUser.uid), orderBy('created', 'desc'))
  : query(colImagesRef, orderBy('created', 'desc'))


	const imageQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: '_id',
	})

	return imageQuery
}

export default useImages;