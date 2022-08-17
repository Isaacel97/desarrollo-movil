import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import firebase from '../backend/firebase';
import colores from '../styles/colores';

/*
Componente para cerrar sesión
en firebase 
*/
const BtnCerrarSesion = () => {
	const salirFirebase = async () => {
		try {
			/*
            Invocamos al método logout de firebase 
            */
			await firebase.auth.signOut();

			/*
            O_______O

            Si pruebas este ejemplo verás que por defecto después de 
            iniciar sesión en automático nos reidrecciona al Home

            Eso es lo que programamos en CheckLoginSc.js
            */
		} catch (exception) {
			console.log(exception);
		}
	};

	return (
		<TouchableOpacity
			onPress={salirFirebase}
			style={{ paddingEnd: 16 }}>
			<Feather
				name='power'
				size={22}
				color={colores.bone}
			/>
		</TouchableOpacity>
	);
};

export default BtnCerrarSesion;
