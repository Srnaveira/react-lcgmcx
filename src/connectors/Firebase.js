import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';

const CONFIG = {
  apiKey: 'AIzaSyBLYCVjriFk3e2OBer4MwbOw0WqbjcXMEI',
  authDomain: 'starscape-a.firebaseapp.com',
  projectId: 'starscape-a',
  storageBucket: 'starscape-a.appspot.com',
  messagingSenderId: '876295919370',
  appId: '1:876295919370:web:fae91bdc651c62810cccf3',
};

const app = initializeApp(CONFIG);
const db = getFirestore(app);

export { db, doc, getDocs, getDoc, collection, query, where, limit };
