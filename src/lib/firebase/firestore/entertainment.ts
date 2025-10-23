import { Entertainment, NewEntertainment } from '@/lib/types/plans';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { firebaseDB } from '../config';
import { FIRESTORE_COLLECTIONS } from './constants';

export const addEntertainment = async (data: NewEntertainment) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.ENTERTAINMENT),
      data
    );
    await updateDoc(docRef, {
      id: docRef.id,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const updateEntertainment = async (
  data: Partial<Entertainment>,
  id: number
) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.ENTERTAINMENT, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteEntertainment = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.ENTERTAINMENT, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getEntertainment = async () => {
  try {
    const q = query(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.ENTERTAINMENT)
    );
    const querySnapshot = await getDocs(q);
    const entertainments: Entertainment[] = [];
    querySnapshot.forEach((doc) => {
      entertainments.push(Entertainment.parse(doc.data()));
    });

    return entertainments;
  } catch (e) {
    console.error('Error getting entertainment: ', e);
    return [];
  }
};
