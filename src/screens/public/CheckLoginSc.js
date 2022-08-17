import React from 'react';
import {
	ActivityIndicator,
	Text,
	View,
} from 'react-native';
import firebase from './../../backend/firebase';
import colores from '../../styles/colores';

const CheckLoginSc = (props) => {
	/*
    En cuanto se cargue el componente verificamos si exoste una sesión 
    activa
    */
	React.useEffect(() => {
		checkLoginFirebase();
	}, []);

	const checkLoginFirebase = async () => {
		/*
        Si existe un cambio en el estatus de la sesión 
        direccionamos al screen correspondiente 
        */
		firebase.auth.onAuthStateChanged((user) => {
			if (user !== null) {
				props.navigation.replace('home_container');
			} else {
				props.navigation.replace('login');
			}
		});
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<ActivityIndicator
				size={'large'}
				color={colores.yinMnBlue}
			/>
			<Text
				style={{
					fontSize: 22,
					marginTop: 16,
					color: colores.chineseViolet,
					textAlign: 'center',
				}}>
				Inicializando{'\n'}Por favor espera...
			</Text>
		</View>
	);
};

export default CheckLoginSc;
