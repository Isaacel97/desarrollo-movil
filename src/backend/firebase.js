/*
Una vez agregada la configuración tanto de Android como de iOS
en el archivo app.json, configuramos una conexión genérica para 
ambos sistemas operativos basados en  la conexión WEb (Javascript)

instalamos firebase con el comando
expo install firebase
*/
import firebase from 'firebase';

//importamos el motor de base de datos
//NoSQL
import 'firebase/firestore';

/*
Reutilizamos el objeto de conexión de la versión web
de firebase
*/
const firebaseConfig = {
	apiKey: "AIzaSyBXCAwfNEwK59TIG7EcUuECbRUwm6M1O6E",
	authDomain: "protipo-95d98.firebaseapp.com",
	projectId: "protipo-95d98",
	storageBucket: "protipo-95d98.appspot.com",
	messagingSenderId: "810150107919",
	appId: "1:810150107919:web:5e049c2336644bd0d57c7a"
};

//Inicializamos el servicio de Firebase
firebase.initializeApp(firebaseConfig);

/*
Exportamos los servicios de firebase que vamos a ocupar
*/
const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default {
	firebase,
	database,
	auth,
	storage,
};
