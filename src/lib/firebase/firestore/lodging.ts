import { Lodging, NewLodging } from '@/lib/types/plans';
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

export const addLodging = async (data: NewLodging) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.LODGING),
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

export const updateLodging = async (data: Partial<Lodging>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.LODGING, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteLodging = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.LODGING, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getLodgings = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.LODGING));
    const querySnapshot = await getDocs(q);
    const lodgings: Lodging[] = [];
    querySnapshot.forEach((doc) => {
      lodgings.push(Lodging.parse(doc.data()));
    });

    return lodgings;
  } catch (e) {
    console.error('Error fetching lodgings: ', e);
    return [];
  }
};
