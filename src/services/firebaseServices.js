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
  apiKey: "AIzaSyBERldQ8dptEJv1Dzf8286euqIDw4s9JH8",
  authDomain: "todo-for-ecd-1c83f.firebaseapp.com",
  projectId: "todo-for-ecd-1c83f",
  storageBucket: "todo-for-ecd-1c83f.appspot.com",
  messagingSenderId: "179488307606",
  appId: "1:179488307606:web:d361fa977e2421013445b7",
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
