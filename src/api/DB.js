import {
  db,
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  limit,
} from '../connectors/Firebase';

export async function getCollection(col) {
  const snapshot = await getDocs(collection(db, col));

  return snapshot.docs.map((snapshotDoc) => {
    return {
      id: snapshotDoc.id,
      ...snapshotDoc.data(),
    };
  });
}

export async function getCollectionWithQuery(col, q) {
  const queryCollection = query(collection(db, col), where(...q), limit(1));

  const snapshot = await getDocs(queryCollection);
  console.log(' >>> snapshot.size: ', snapshot.size);
  // if (snapshot.size === 0) {
  //   return [];
  // }

  return snapshot.docs.map((snapshotDoc) => {
    return {
      id: snapshotDoc.id,
      ...snapshotDoc.data(),
    };
  });
}

export async function getDocument(col, id) {
  const docRef = doc(db, col, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
}
