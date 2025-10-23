import { NewTrip, Trip } from '@/lib/types/trips';
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

export const addTrip = async (data: NewTrip) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS),
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

export const updateTrip = async (data: Partial<Trip>, id: string) => {
  try {
    await updateDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS, id), data);
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteTrip = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getTrips = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS));
    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push(Trip.parse(doc.data()));
    });
    return trips;
  } catch (e) {
    console.error('Error fetching trips: ', e);
    return [];
  }
};
