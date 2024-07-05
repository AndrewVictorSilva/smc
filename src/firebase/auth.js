/* eslint-disable no-unused-vars */
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

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
