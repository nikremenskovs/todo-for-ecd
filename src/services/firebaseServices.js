import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const tasksCollection = collection(db, "tasks");

export const getTasksFirestore = async () => {
  const tasks = query(tasksCollection, orderBy("dueDate"));
  const tasksSnapshot = await getDocs(tasks);
  const tasksListByDate = tasksSnapshot.docs.map((doc) => {
    return { docId: doc.id, ...doc.data() };
  });
  return tasksListByDate;
};

export const postTaskFirestore = async (taskToAdd) => {
  await addDoc(tasksCollection, taskToAdd);
};

export const putTaskFirestore = async (data) => {
  const { docId, ...relevantData } = data;
  await updateDoc(doc(db, "tasks", docId), relevantData);
};

export const deleteTaskFirestore = async (taskId) => {
  await deleteDoc(doc(db, "tasks", taskId));
};
