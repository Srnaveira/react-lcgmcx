import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

export default function AddCategory() {
  const handlerSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="col-4 pt-2 bg-warning bg-opacity-50">
      <h6 className="text-center py-2 mt-2 bg-warning bg-opacity-50">
        Agregar Categoría{' '}
      </h6>

      <Formik
        initialValues={{ name: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Ingrese nombre de categoría';
          }
          return errors;
        }}
        onSubmit={handlerSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              className="form-control my-5"
              type="text"
              name="name"
              placeholder="Nombre de la categoría"
            />
            <ErrorMessage name="name">
              {(msg) => <div className="error">{msg}</div>}
            </ErrorMessage>
            <div className="text-center my-1">
              <button
                type="submit"
                className="btn btn-warning m-2"
                disabled={isSubmitting}
              >
                Agregar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
