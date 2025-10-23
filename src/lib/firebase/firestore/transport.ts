import { NewTransport, Transport } from '@/lib/types/plans';
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

export const addTransport = async (data: NewTransport) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.TRANSPORTS),
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

export const updateTransport = async (data: Partial<Transport>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.TRANSPORTS, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteTransport = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.TRANSPORTS, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getTransports = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.TRANSPORTS));
    const querySnapshot = await getDocs(q);
    const transports: Transport[] = [];
    querySnapshot.forEach((doc) => {
      transports.push(Transport.parse(doc.data()));
    });

    return transports;
  } catch (e) {
    console.error('Error fetching transports: ', e);
    return [];
  }
};
