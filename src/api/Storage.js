import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function generarNombreRandomDeImagen() {
  return Math.ceil(Math.random() * 1000) + +new Date();
}

export async function subirImagen(image) {
  let picUrl = false;
  if (image !== undefined) {
    try {
      //obtengo instancia de Firebase-Storage
      const storage = getStorage();
      // creo un nombre random para la imagen
      const imageName = generarNombreRandomDeImagen();
      // creo una referencia a la imagen ('path' donde sera guardada en Firebase-Storage)
      const storageRef = ref(storage, `images/${imageName}`);
      // subo la imagen al 'path' creado
      const uploadTask = await uploadBytes(storageRef, image);
      // obtendo la url de descarga de la imagen (esta url servira para usarla <img src='...'/>)
      picUrl = await getDownloadURL(uploadTask.ref);
      console.log('>> pic subida: ', picUrl);
    } catch (err) {
      console.log('>> Error al intentar subir un imagen: ', err);
    }
  }
  // si todo salio bien, se regresara una url (del tipo https://.... donde esta almacenada la imagen)
  // si algo falla regresara el valor por defecto de picUrl (false)
  return picUrl;
}
