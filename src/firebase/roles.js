// roles.js
import { getDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
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

export const getUserByEmail = async (email) => {
    if (!email) {
        throw new Error('Email is required to fetch user data');
    }

    try {
        const usersCollection = collection(db, 'users'); // Adjust 'users' to your collection name
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null; // No user found with the provided email
        }

        const userData = querySnapshot.docs[0].data();
        return { ...userData, id: querySnapshot.docs[0].id }; // Return user data including document ID
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Failed to fetch user data');
    }
};

