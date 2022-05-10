import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useFolders = (params = {}) => {
    const { onlineUser } = useAuthContext()

    const colFoldersRef = params.fetchReviewFolders
    ? collection(db, 'reviewalbums')
    : collection(db,  onlineUser.email)

    const queryKey = params.fetchReviewFolders
    ? [ 'reviewalbums']
    : [ onlineUser.email]

  const queryRef = query(colFoldersRef)


    const FolderQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: '_id',
        subscribe: true,
    }, {
		refetchOnMount: 'always',
	})

    return FolderQuery
}

export default useFolders