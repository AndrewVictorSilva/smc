/* eslint-disable no-unused-vars */
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const doCreateUserWithEmailAndPassword = async (email, password, role, company) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role,
      company: company
    });

    // Trigger password reset email
    await sendPasswordResetEmail(auth, email);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserData = async (uid, data) => {
  try {
      await setDoc(doc(db, 'users', uid), data, { merge: true });
      console.log('User data updated successfully');
  } catch (error) {
      console.error('Error updating user data:', error.message);
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

/**
 * Updates a user's role and company information in the Firestore database.
 * @param {string} userId - The ID of the user to update.
 * @param {object} updateData - An object containing the role and company to update.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export const updateUser = async (userId, updateData) => {
  if (!userId || !updateData) {
    throw new Error('User ID and update data are required');
  }

  try {
    const userDocRef = doc(db, 'users', userId); // Adjust 'users' to your collection name

    // Check if the document exists
    const docSnapshot = await getDoc(userDocRef);
    if (!docSnapshot.exists()) {
      throw new Error('Document does not exist');
    }

    // Update the document
    await updateDoc(userDocRef, updateData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Failed to update user data');
  }
};

export const updateUserByEmail = async (email, updatedFields) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, 'users', userDoc.id), updatedFields);
  } else {
    throw new Error(`No document found for email: ${email}`);
  }
};