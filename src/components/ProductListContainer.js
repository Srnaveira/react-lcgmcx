import React, { useEffect, useState } from 'react';
import { getCollection } from '../api/DB';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';

import { db, collection } from '../connectors/Firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import './products.css';

export default function ProductListContainer() {
  const [prods, setProds] = useState([]);
  const [cats, setCats] = useState([]);

  const query = collection(db, 'products');

  //useCollection actualiza/y-carga en la app los datos de la coleccion cuando ocurren en la DB (de manera instantanea)
  const [products2] = useCollection(query);

  useEffect(() => {
    async function getAllProds() {
      const [products, categories] = await Promise.all([
        getCollection('products'),
        getCollection('categories'),
      ]);
      setProds(products);
      setCats(categories);
    }
    getAllProds();
  }, []);

  return (
    <>
      <div className="row">
        <AddProduct />
        <AddCategory />
      </div>
      <hr />
      <div className="row">
        <div className="col-7 pt-2 bg-success bg-opacity-25">
          <h4>Productos</h4>
          <ul>
            {products2 &&
              products2.docs
                .map((p) => ({ id: p.id, ...p.data() }))
                .map((p) => (
                  <li key={p.id}>
                    {p.title}{' '}
                    <div>
                      <img src={p.imageURL} style={{ maxWidth: '50px' }} />
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        <div className="col-7 pt-2 bg-success bg-opacity-25">
          <h4>Productos</h4>
          <div className="list-prod">
            {products2 &&
              products2.docs
                .map((p) => ({ id: p.id, ...p.data() }))
                .map((p) => (
                  <div className="list-prod-item" key={p.id}>
                    <div>{p.title} </div>
                    <div>{p.description} </div>
                    <div>
                      <img src={p.imageURL} style={{ maxWidth: '50px' }} />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="col-5 pt-2 bg-warning bg-opacity-25">
          <h4>Categories</h4>
          <ul>
            {cats.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
