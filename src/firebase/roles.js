// roles.js
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function getUserRole(userId) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        return userDoc.data().role;
    } else {
        throw new Error('No such user!');
    }
}
