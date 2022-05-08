import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const useFolders = (params = {}) => {
    const { onlineUser } = useAuthContext()

    const colFoldersRef = params.fetchReviewFolders
    ? collection(db, 'reviewalbums')
    : collection(db,  onlineUser.uid)

    const queryKey = params.fetchReviewFolders
    ? [ 'reviewalbums']
    : [ onlineUser.uid]

  const queryRef = query(colFoldersRef, orderBy('created', 'desc'))


    const FolderQuery = useFirestoreQueryData(queryKey, queryRef, {
        idField: '_id',
    })

    return FolderQuery
}

export default useFolders