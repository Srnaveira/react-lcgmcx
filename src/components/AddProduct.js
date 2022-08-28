import React, { useState } from 'react';
import { db } from '../connectors/Firebase';
import { subirImagen } from '../api/Storage';
import { addDoc, collection } from 'firebase/firestore';

const FIELDS = {
  TITLE: 'title',
  CATEGORY: 'category',
  DESCRIPTION: 'description',
  STOCK: 'stock',
  PRICE: 'price',
  INITIAL: 'initial',
  FILE: 'file',
};

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [initial, setInitial] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState('');

  const updateField = (evt, field) => {
    switch (field) {
      case FIELDS.TITLE:
        setTitle(evt.target.value);
        break;
      case FIELDS.CATEGORY:
        setCategory(evt.target.value);
        break;
      case FIELDS.DESCRIPTION:
        setDescription(evt.target.value);
        break;
      case FIELDS.STOCK:
        setStock(evt.target.value);
        break;
      case FIELDS.PRICE:
        setPrice(evt.target.value);
        break;
      case FIELDS.INITIAL:
        setInitial(evt.target.value);
        break;
      case FIELDS.FILE:
        // para el caso del tipo file, la imagen viene en 'files' no en value (array de archivos)
        setFile(evt.target.files[0]);
        break;
    }
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();
    const imageURL = await subirImagen(file);
    const newProduct = {
      title,
      category,
      description,
      stock,
      price,
      initial,
      imageURL,
    };

    const newResponse = await addDoc(collection(db, 'products'), newProduct);

    console.log('>>---> newID: ', newResponse.id);
  };

  return (
    <div className="col pt-2 bg-success bg-opacity-50">
      <h6 className="text-center py-2 mt-2 bg-success bg-opacity-50">
        Agregar Producto
      </h6>

      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-6">
            <input
              placeholder="Título"
              className="form-control mb-2"
              type="text"
              name="title"
              value={title}
              onChange={(evt) => updateField(evt, FIELDS.TITLE)}
            />

            <select
              name="category"
              className="form-select mb-2"
              onChange={(evt) => updateField(evt, FIELDS.CATEGORY)}
            >
              <option disabled selected>
                - Categoría-
              </option>
              <option value="1">1</option>
            </select>

            <textarea
              placeholder="Descripción"
              className="form-control mb-2"
              type="text"
              as="textarea"
              name="description"
              value={description}
              onChange={(evt) => updateField(evt, FIELDS.DESCRIPTION)}
            ></textarea>

            <input
              placeholder="Precio"
              className="form-control mb-2"
              type="text"
              name="price"
              value={price}
              onChange={(evt) => updateField(evt, FIELDS.PRICE)}
            />
          </div>
          <div className="col-md-6">
            <input
              placeholder="Stock"
              className="form-control mb-2"
              type="text"
              name="stock"
              value={stock}
              onChange={(evt) => updateField(evt, FIELDS.STOCK)}
            />

            <input
              placeholder="Initial"
              className="form-control mb-2"
              type="text"
              name="initial"
              value={initial}
              onChange={(evt) => updateField(evt, FIELDS.INITIAL)}
            />

            <input
              placeholder="Imagen"
              className="form-control mb-2"
              type="file"
              accept="image/*"
              name="file"
              onChange={(evt) => updateField(evt, FIELDS.FILE)}
            />

            <div className="text-center my-1">
              <button type="submit" className="btn btn-success m-2">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
