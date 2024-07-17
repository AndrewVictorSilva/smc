// roles.js
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

export async function getUserRole(userId) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
        return userDoc.data().role;
    } else {
        throw new Error('No such user!');
    }
}

export async function getAllUsersInfo() {
    try {
        const usersCollection = await getDocs(collection(db, 'users'));
        const usersData = usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched Users Data:", usersData); // Logging fetched data
        return usersData;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}



