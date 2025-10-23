import { NewTrip, Trip } from '@/lib/types/trips';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firebaseDB } from '../config';
import { FIRESTORE_COLLECTIONS } from './constants';

export const addTrip = async (data: NewTrip) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS),
      data
    );
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const updateTrip = async (data: Partial<Trip>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS, id.toString()),
      data
    );
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

export const getTrips = async (userId: string) => {
  const q = query(
    collection(firebaseDB, FIRESTORE_COLLECTIONS.TRIPS),
    where('userId', '==', userId)
  );
  const querySnapshot = await getDocs(q);
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    trips.push(Trip.parse(doc.data()));
  });

  return trips;
};
