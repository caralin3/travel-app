import { Food, NewFood } from '@/lib/types/plans';
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

export const addFood = async (data: NewFood) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.FOOD),
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

export const updateFood = async (data: Partial<Food>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.FOOD, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteFood = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.FOOD, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getFoods = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.FOOD));
    const querySnapshot = await getDocs(q);
    const foods: Food[] = [];
    querySnapshot.forEach((doc) => {
      foods.push(Food.parse(doc.data()));
    });

    return foods;
  } catch (e) {
    console.error('Error fetching food items: ', e);
    return [];
  }
};
