import React from 'react';
import {
	Alert,
	Button,
	Image,
	ScrollView,
	TextInput,
	View,
} from 'react-native';
import firebase from './../../backend/firebase';
import { Entypo } from '@expo/vector-icons';
import ProgressDialog from './../../components/ProgressDialog';
import colores from '../../styles/colores';
import estilos from '../../styles/estilos';
const Login = (props) => {
	const [progress, setProgess] = React.useState(false);

	/*
    State para los datos del inicio de sesión
    */
	const [usuario, setUsuario] = React.useState({
		correo: '',
		pass: '',
	});

	/*
    Creamos un efecto que regrese los valores 
    del state como al inicio cuando este screen 
    se quite d ela pantalla 
    */
	React.useEffect(() => {
		return () =>
			setUsuario({
				correo: '',
				pass: '',
			});
	}, []);

	const loginFirebase = async () => {
		setProgess(true);
		/*
        Validaciones
        */
		if (
			usuario.correo.length < 5 ||
			usuario.pass.length < 8
		) {
			Alert.alert(
				'Ups',
				'Correo o contraseña inválidos'
			);
			setProgess(false);

			return;
		}

		try {
			/*
            Invocamos a la función de firebase 
            que busca un usuario por emial y contraseña
            */
			usuarioFirebase =
				await firebase.auth.signInWithEmailAndPassword(
					usuario.correo,
					usuario.pass
				);

			/*
            Saludamos al usuario
            */
			Alert.alert(
				'¡Bienvenido!',
				`Hola de nevo ${usuarioFirebase.user.displayName}`
			);

			console.log('User Firebase', usuarioFirebase);
			setProgess(false);

			/*
            O_______O

            Si pruebas este ejemplo verás que por defecto después de 
            iniciar sesión en automático nos redirecciona al Home

            Eso es lo que programamos en CheckLoginSc.js
            */

			console.log(usuarioFirebase);
		} catch (exception) {
			console.log('Error', JSON.stringify(exception));
			setProgess(false);
		}
	};

	return (
		<>
			{progress && <ProgressDialog />}
			<ScrollView>
				<Image
					source={require('../../../assets/images/login.png')}
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
						title='Iniciar sesión'
						onPress={() => loginFirebase()}
					/>
				</View>

				<View style={{ margin: 8 }}>
					<Button
						title='Regístrate'
						onPress={() =>
							props.navigation.navigate(
								'registro'
							)
						}
					/>
				</View>
			</ScrollView>
		</>
	);
};

export default Login;
