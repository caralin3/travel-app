import { Activity, NewActivity } from '@/lib/types/plans';
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

export const addActivity = async (data: NewActivity) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.ACTIVITIES),
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

export const updateActivity = async (data: Partial<Activity>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.ACTIVITIES, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteActivity = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.ACTIVITIES, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getActivities = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.ACTIVITIES));
    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];
    querySnapshot.forEach((doc) => {
      activities.push(Activity.parse(doc.data()));
    });

    return activities;
  } catch (e) {
    console.error('Error fetching activities: ', e);
    return [];
  }
};
