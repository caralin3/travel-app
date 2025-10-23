import { Flight, NewFlight } from '@/lib/types/plans';
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

export const addFlight = async (data: NewFlight) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.FLIGHTS),
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

export const updateFlight = async (data: Partial<Flight>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.FLIGHTS, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteFlight = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.FLIGHTS, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getFlights = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.FLIGHTS));
    const querySnapshot = await getDocs(q);
    const flights: Flight[] = [];
    querySnapshot.forEach((doc) => {
      flights.push(Flight.parse(doc.data()));
    });

    return flights;
  } catch (e) {
    console.error('Error getting flights: ', e);
    return [];
  }
};
