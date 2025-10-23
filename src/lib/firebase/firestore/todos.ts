import { NewTodoList, TodoList } from '@/lib/types/todos';
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

export const addTodo = async (data: NewTodoList) => {
  try {
    const docRef = await addDoc(
      collection(firebaseDB, FIRESTORE_COLLECTIONS.TODOS),
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

export const updateTodo = async (data: Partial<TodoList>, id: number) => {
  try {
    await updateDoc(
      doc(firebaseDB, FIRESTORE_COLLECTIONS.TODOS, id.toString()),
      data
    );
    console.log('Document written with ID: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(firebaseDB, FIRESTORE_COLLECTIONS.TODOS, id));
    console.log('Document deleted with ID: ', id);
  } catch (e) {
    console.error('Error removing document: ', e);
  }
};

export const getTodos = async () => {
  try {
    const q = query(collection(firebaseDB, FIRESTORE_COLLECTIONS.TODOS));
    const querySnapshot = await getDocs(q);
    const todos: TodoList[] = [];
    querySnapshot.forEach((doc) => {
      todos.push(TodoList.parse(doc.data()));
    });

    return todos;
  } catch (e) {
    console.error('Error fetching todos: ', e);
    return [];
  }
};
