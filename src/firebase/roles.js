import { getDoc, doc, getDocs, collection, query, where, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth, deleteUser } from 'firebase/auth';
import { getAuthUserByEmail } from './auth';

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
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return { ...userData, id: userDoc.id, uid: userData.uid }; // Assuming UID is stored
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Failed to fetch user data');
    }
};

export const deleteUserInfo = async (email) => {
    if (!email) {
      throw new Error('Email is required to delete user data');
    }
  
    try {
      // Step 1: Get the user's uid
      const uid = await getAuthUserByEmail(email);
  
      // Step 2: Delete user from Firestore
      const userRef = doc(db, 'users', uid);
      await deleteDoc(userRef);
  
      // Step 3: Delete the user from Firebase Authentication
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user && user.uid === uid) {
        throw new Error('Cannot delete the currently logged-in user.');
      } else {
        const userToDelete = await auth.getUser(uid);
        await deleteUser(userToDelete);
      }
  
      console.log(`User with email ${email} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
