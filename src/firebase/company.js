import { db } from './firebase';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs
}
    from 'firebase/firestore';

// Create a company
export const createCompany = async (name, description) => {
    try {
        const docRef = doc(db, 'companies', name); // Use name as document ID
        await setDoc(docRef, {
            name,
            description,
        });
        return { name, description };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get a single company by name
export const getCompany = async (name) => {
    try {
        const docRef = doc(db, 'companies', name);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Company not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

// Update a company by name
export const updateCompany = async (name, newData) => {
    try {
        const docRef = doc(db, 'companies', name);
        await updateDoc(docRef, newData);
        return newData;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a company by name
export const deleteCompany = async (name) => {
    try {
        const docRef = doc(db, 'companies', name);
        await deleteDoc(docRef);
        return { name };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all companies
export const getAllCompanies = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'companies'));
        const companies = [];
        querySnapshot.forEach((doc) => {
            companies.push({ id: doc.id, ...doc.data() });
        });
        return companies;
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
