import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useReviewFolders = (params = {}) => {
    const { onlineUser } = useAuthContext()

    const colFoldersRef = params.fetchReviewFolders
    ? collection(db, 'reviewalbums')
    : collection(db,  onlineUser.uid)

    const queryKey = params.fetchReviewFolders
    ? [ 'reviewalbums']
    : [ onlineUser.uid]

  const queryRef = query(colFoldersRef)


    const revFolderQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: '_id',
        subscribe: true,
    }, {
		refetchOnMount: 'always',
	})

    return revFolderQuery
}

export default useReviewFolders