import React from 'react';
import {
	Button,
	Image,
	ScrollView,
	TextInput,
	View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ProgressDialog from './../../components/ProgressDialog';
import colores from '../../styles/colores';
import estilos from '../../styles/estilos';

import firebase from './../../backend/firebase';

const RegistroSc = (props) => {
	const [progress, setProgess] = React.useState(false);
	const [usuario, setUsuario] = React.useState({
		nombre: '',
		correo: '',
		pass: '',
	});

	/*
    Creamos un efecto para que al salir, 
    se inicie el state con los datos defecto
    */
	React.useEffect(() => {
		return () =>
			setUsuario({
				nombre: '',
				correo: '',
				pass: '',
			});
	}, []);

	const registroFirebase = async () => {
		console.log(usuario);
		setProgess(true);
		/*
        Validamos
        */

		try {
			/*
            Creamos un nuevo usuario en firebase auth
            */
			await firebase.auth.createUserWithEmailAndPassword(
				usuario.correo,
				usuario.pass
			);

			/*
            Al usuario que acabamos de agregar 
            le indicamos su nombre completo
            */
			await firebase.auth.currentUser.updateProfile({
				displayName: usuario.nombre,
			});

			/*
            O_______O

            Si pruebas este ejemplo verás que por defecto después de 
            iniciar sesión en automático nos redirecciona al Home

            Eso es lo que programamos en CheckLoginSc.js
            */

			setProgess(false);
		} catch (exception) {
			console.log(JSON.stringify(exception));
			setProgess(false);
		}
	};

	return (
		<>
			{progress && <ProgressDialog />}
			<ScrollView>
				<Image
					source={require('../../../assets/images/registro.png')}
					style={{
						width: '100%',
						height: 128,
						resizeMode: 'contain',
						marginVertical: 16,
					}}
				/>

				<View
					style={estilos.textInputIconContainer1}>
					<Entypo
						name='user'
						size={22}
						color={colores.yinMnBlue}
					/>
					<TextInput
						// Forma uno de sobreescribir estilos
						style={{
							...estilos.textInputIcon,
							...estilos.textInputIconLine,
						}}
						placeholder='Nombre completo'
						keyboardType='ascii-capable'
						//La primera letra  mayúscula
						autoCapitalize='words'
						//Corrección de palabras
						autoCorrect={true}
						value={usuario.nombre}
						onChangeText={(e) =>
							setUsuario({
								...usuario,
								['nombre']: e,
							})
						}
					/>
				</View>

				<View
					style={estilos.textInputIconContainer1}>
					<Entypo
						name='email'
						size={22}
						color={colores.yinMnBlue}
					/>
					<TextInput
						// Forma uno de sobreescribir estilos
						style={{
							...estilos.textInputIcon,
							...estilos.textInputIconLine,
						}}
						placeholder='Correo electrónico'
						keyboardType='email-address'
						//Evitamos la primera letra  mayúscula
						autoCapitalize='none'
						//Evitamos la corrección de palabras
						autoCorrect={false}
						value={usuario.correo}
						onChangeText={(e) =>
							setUsuario({
								...usuario,
								['correo']: e,
							})
						}
					/>
				</View>

				<View
					style={estilos.textInputIconContainer1}>
					<Entypo
						name='lock'
						size={22}
						color={colores.yinMnBlue}
					/>
					<TextInput
						// Forma uno de sobreescribir estilos
						style={{
							...estilos.textInputIcon,
							...estilos.textInputIconLine,
						}}
						placeholder='Contraseña'
						keyboardType='visible-password'
						secureTextEntry={true}
						//Evitamos la primera letra  mayúscula
						autoCapitalize='none'
						//Evitamos la corrección de palabras
						autoCorrect={false}
						value={usuario.pass}
						onChangeText={(e) =>
							setUsuario({
								...usuario,
								['pass']: e,
							})
						}
					/>
				</View>

				<View
					style={{ margin: 8, marginBottom: 64 }}>
					<Button
						title='Registrarse'
						onPress={() => registroFirebase()}
					/>
				</View>

				<View style={{ margin: 8 }}>
					<Button
						title='Iniciar sesión'
						onPress={() =>
							props.navigation.navigate(
								'login'
							)
						}
					/>
				</View>
			</ScrollView>
		</>
	);
};

export default RegistroSc;
