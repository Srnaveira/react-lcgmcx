import React, { useEffect, useState } from 'react';

import { getCollection, getDocument, getCollectionWithQuery } from './api/DB';

import { addDoc, collection } from 'firebase/firestore';
import { db } from './connectors/Firebase';

import ProductListContainer from './components/ProductListContainer';

import './style.css';

export default function App() {
  const [image, setImage] = useState();
  /*
  useEffect(() => {
    getCollection('productos').then((cols) => {
      console.log('>> cols: ', cols);
    });
    //
    getCollectionWithQuery('productos', ['precio', '>', 100]).then((cols) => {
      console.log('>> cols query: ', cols);
    });
    //
    getDocument('productos', 'GdSVTx3wcFvTvRnXD1kC').then((prod) => {
      console.log('>> prod: ', prod);
    });
  }, []);
*/
  const onSubmitForm = async (evt) => {
    evt.preventDefault();

    let picUrl;
    if (image !== undefined) {
      try {
        const storage = getStorage();
        const imageName = Math.ceil(Math.random() * 1000) + +new Date();
        const storageRef = ref(storage, `images/${imageName}`);
        const uploadTask = await uploadBytes(storageRef, image);
        picUrl = await getDownloadURL(uploadTask.ref);

        const newDocData = {
          name: imageName,
          picUrl,
        };

        const resDoc = await addDoc(collection(db, 'productos'), newDocData); // crea el documento en la bd
        console.log('>> docSaved: ', {
          id: resDoc.id,
          resDoc,
        });
      } catch (e) {
        console.log('>> error: ', e);
      }
    }
    console.log('>> picUrl: ', picUrl);
  };

  const onChangeFile = (evt) => {
    console.log(evt.target.files[0]);
    setImage(evt.target.files[0]);
  };

  return (
    <div className="container-fluid my-2">
      <h1 className="text-center text-white bg-dark p-1">Backoffice</h1>

      {/* <form onSubmit={onSubmitForm}>
        <div>
          <div>
            Título del producto
            <br />
            <input type="text" />
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          name="img"
          id="img"
          onChange={onChangeFile}
        />
        <br />
        <button type="submit">Enviar</button>
      </form> */}
      <div className="p-2">
        <ProductListContainer />
      </div>
    </div>
  );
}
