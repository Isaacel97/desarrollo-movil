import React from 'react';
import {
	Alert,
	Button,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	View,
} from 'react-native';

// Vinculamos el objeto de navegación actual
// a este screen
import {
	useNavigation,
	useFocusEffect,
} from '@react-navigation/native';

import ProgressDialog from '../../components/ProgressDialog';

import * as ImagePicker from 'expo-image-picker';

import colores from '../../styles/colores';
import estilos from '../../styles/estilos';

import firebase from '../../backend/firebase';

import {
	FontAwesome5,
	MaterialIcons,
} from '@expo/vector-icons';

const EditaMascotaSc = (props) => {
	//Creamos una constante de navegación
	const navigation = useNavigation();

	const mascotaID = props.route.params.mascotaID;

	const [mascota, setMascota] = React.useState({
		nombre: null,
		raza: null,
		foto: 'https://firebasestorage.googleapis.com/v0/b/uteq-awi4-t196-f7624.appspot.com/o/addphoto.png?alt=media&token=adeb1475-a56f-4410-8bd4-bcb3702755e3',
		imagenNueva: false,
	});

	const [progress, setProgress] = React.useState(true);

	useFocusEffect(
		React.useCallback(() => {
			getMascota();
		}, [])
	);

	/*
    Realizamos la información del documento
    a partir del id que recibimos como parámetro
    */
	const getMascota = async () => {
		const query = await firebase.database
			.collection('mascotas')
			.doc(mascotaID)
			.get();

		// Si existe el documento
		if (query.exists) {
			const docMascota = query.data();
			setMascota({
				id: query.id,
				nombre: docMascota.nombre,
				raza: docMascota.raza,
				foto: docMascota.foto,
				imagenNueva: false,
			});

			setProgress(false);
		}
	};

	// Tomamos una foto con la cámara y la guardamos en el state
	// de la mascota
	const tomarFoto = async () => {
		setProgress(true);
		try {
			const { status } =
				await ImagePicker.requestCameraPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Error',
					'El permiso de la cámara es necesario para continuar'
				);

				return;
			}
			/*
            Lanzamos la cámara y la fotografía tomada
             */
			const imagenCamara =
				await ImagePicker.launchCameraAsync({
					// Tipo de elemento de la cámara (img / videos / todo)
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					// Permitimos la edición en función de la relación de aspecto
					allowsEditing: true,
					// Indicamos la relación de aspecto
					aspect: [1, 1],
					// Calidad de la imagen 0 ===> máxima compresión y 1 ===> máxima calidad
					quality: 0.5,
				});

			/*
            Revisamos si la imagen se tomó
            */
			if (!imagenCamara.cancelled) {
				setMascota({
					...mascota,
					['foto']: imagenCamara.uri,
					['imagenNueva']: true,
				});
			}
		} catch (exception) {
			Alert.alert(
				'Ocurrio un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

	// Seleccionamos una imagen de la galería y la guardamos
	// en el statede la mascota
	const seleccionarImagenGaleria = async () => {
		setProgress(true);
		try {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert(
					'Error',
					'El permiso de la cámara es necesario para continuar'
				);

				return;
			}
			/*
            Tomamos una imagen de la galería
             */
			const imagenGaleria =
				await ImagePicker.launchImageLibraryAsync({
					// Tipo de elemento de la galería (img / videos / todo)
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					// Permitimos la edición en función de la relación de aspecto
					allowsEditing: true,
					// Indicamos la relación de aspecto
					aspect: [1, 1],
					// Calidad de la imagen 0 ===> máxima compresión y 1 ===> máxima calidad
					quality: 0.5,
				});

			/*
            Revisamos si la imagen se seleccionó
            */
			if (!imagenGaleria.cancelled) {
				setMascota({
					...mascota,
					['foto']: imagenGaleria.uri,
					['imagenNueva']: true,
				});
			}
		} catch (exception) {
			Alert.alert(
				'Ocurrio un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

	// Editamos el documento de la mascota
	// y en caso de haber cambiado la imagen
	// la subimos al storage
	const editarMascota = async () => {
		setProgress(true);
		try {
			// Si se tomó una foto o se seleccionó de la galería
			// primero subimos la foto
			if (mascota.imagenNueva) {
				/*
                NOTA:
                Asegúrate de agregar storage a los servicios de 
                firebase
                */

				//Generar la cadena binaria del archivo
				//BLOB
				const blob = await (
					await fetch(mascota.foto)
				).blob();

				/*
                Generamos un file para FireStore 
                usando 3 parámetros
                1.- Contenido binario
                2.- nombre del archivo
                3.- config (tipo de archivo MIME)
                */
				const fileMascota = new File(
					[blob],
					`${
						firebase.auth.currentUser.uid
					}_${new Date().getTime()}.jpg`,
					{ type: 'image/jpeg' }
				);
				blob.close();

				/*
                Una vez creado el archivo, lo subimos a firestore storage
                la referencia a storage es desde la raíz
                ref() -------> Home de mi servicio
                child() -----> Referencia a un componente hijo
                put() -------> Crea un recurso en el servicio a partir de un blob
                */
				const subida = await firebase.storage
					.ref()
					.child('mascotas')
					.child(fileMascota.name)
					.put(fileMascota, fileMascota.type);

				// Editamos el documento
				await firebase.database
					.collection('mascotas')
					.doc(mascota.id)
					.update({
						fauid: firebase.auth.currentUser
							.uid,
						nombre: mascota.nombre,
						raza: mascota.raza,
						foto: await subida.ref.getDownloadURL(),
					});
			} else {
				// Editamos el documento
				await firebase.database
					.collection('mascotas')
					.doc(mascota.id)
					.update({
						fauid: firebase.auth.currentUser
							.uid,
						nombre: mascota.nombre,
						raza: mascota.raza,
						foto: mascota.foto,
					});
			}

			Alert.alert(
				'Terminado',
				'Mascota actualizada',
				[
					{
						text: 'Continuar',
						onPress: () =>
							props.navigation.navigate(
								'home_container'
							),
					},
				],
				{ cancelable: false }
			);
		} catch (exception) {
			Alert.alert(
				'Ocurrió un error',
				JSON.stringify(exception)
			);
		} finally {
			setProgress(false);
		}
	};

	return (
		<>
			{progress && <ProgressDialog />}
			<ScrollView>
				<ImageBackground
					source={{ uri: mascota.foto }}
					style={{
						width: 128,
						height: 128,
						resizeMode: 'contain',
						marginVertical: 32,
						alignSelf: 'center',
						borderRadius: 64,
						overflow: 'hidden',
						backgroundColor:
							colores.chineseViolet,
					}}
				/>

				<View
					style={estilos.textInputIconContainer1}>
					<MaterialIcons
						name='pets'
						size={22}
						color={colores.yinMnBlue}
					/>
					<TextInput
						style={{
							...estilos.textInputIcon,
							...estilos.textInputIconLine,
						}}
						placeholder='Nombre de la mascota'
						keyboardType='default'
						autoCapitalize='words'
						autoCorrect={true}
						value={mascota.nombre}
						onChangeText={(e) =>
							setMascota({
								...mascota,
								['nombre']: e,
							})
						}
					/>
				</View>

				<View
					style={estilos.textInputIconContainer1}>
					<FontAwesome5
						name='tag'
						size={22}
						color={colores.yinMnBlue}
					/>
					<TextInput
						style={{
							...estilos.textInputIcon,
							...estilos.textInputIconLine,
						}}
						placeholder='Raza'
						keyboardType='default'
						autoCapitalize='words'
						autoCorrect={true}
						value={mascota.raza}
						onChangeText={(e) =>
							setMascota({
								...mascota,
								['raza']: e,
							})
						}
					/>
				</View>

				<TouchableOpacity
					style={{
						width: null,
						marginVertical: 16,
						paddingVertical: 16,
						paddingHorizontal: 8,
						marginHorizontal: 8,
						backgroundColor: colores.yinMnBlue,
						borderRadius: 8,
					}}
					onPress={tomarFoto}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<MaterialIcons
							name='add-photo-alternate'
							color={colores.bone}
							size={22}
						/>
						<Text
							style={{
								color: colores.bone,
								marginStart: 8,
								fontWeight: 'bold',
							}}>
							Cambiar foto desde la cámara
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						width: null,
						marginVertical: 16,
						paddingVertical: 16,
						paddingHorizontal: 8,
						marginHorizontal: 8,
						backgroundColor: colores.yinMnBlue,
						borderRadius: 8,
					}}
					onPress={seleccionarImagenGaleria}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							alignItems: 'center',
						}}>
						<MaterialIcons
							name='add-photo-alternate'
							color={colores.bone}
							size={22}
						/>
						<Text
							style={{
								color: colores.bone,
								marginStart: 8,
								fontWeight: 'bold',
							}}>
							Cambiar foto desde la galería
						</Text>
					</View>
				</TouchableOpacity>

				<View
					style={{
						marginHorizontal: 8,
						marginVertical: 16,
					}}>
					<Button
						title='Guardar cambios'
						color={colores.middleBlueGreen}
						onPress={editarMascota}
					/>
				</View>
			</ScrollView>
		</>
	);
};

export default EditaMascotaSc;
