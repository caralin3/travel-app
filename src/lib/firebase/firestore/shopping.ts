import { NewShopping, Shopping } from '@/lib/types/plans';
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

export const addShopping = async (data: NewShopping) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.SHOPPING),
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

export const updateShopping = async (data: Partial<Shopping>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.SHOPPING, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteShopping = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.SHOPPING, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getShopping = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.SHOPPING));
    const querySnapshot = await getDocs(q);
    const shoppings: Shopping[] = [];
    querySnapshot.forEach((doc) => {
      shoppings.push(Shopping.parse(doc.data()));
    });

    return shoppings;
  } catch (e) {
    console.error('Error fetching shopping items: ', e);
    return [];
  }
};
