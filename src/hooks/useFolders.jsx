import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useFolders = (params = {}) => {
    const { onlineUser } = useAuthContext()

    const colFoldersRef = params.fetchReviewFolders
    ? collection(db, 'revalbums')
    : collection(db,  onlineUser.uid)

    const queryKey = params.fetchReviewFolders
    ? [ 'revalbums']
    : [ onlineUser.uid]

  const queryRef = params.fetchReviewFolders
  ? query(colFoldersRef, where('owner', '==', onlineUser.uid))
  : query(colFoldersRef)


    const FolderQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: '_id',
        subscribe: true,
    }, {
		refetchOnMount: 'always',
	})

    return FolderQuery
}

export default useFolders