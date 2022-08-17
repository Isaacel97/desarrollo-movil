import React from 'react';
import {
	Alert,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
} from 'react-native';
import colores from '../styles/colores';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import firebase from '../backend/firebase';

/*
Componente para documento de la colección mascotas
*/
const MascotaItem = (props) => {
	const navigation = useNavigation();

	// Función para eliminar un documento
	// a partir de su id
	const eliminarMascota = async () => {
		Alert.alert(
			`¿Eliminar a ${props.mascota.nombre}?`,
			'Esta acción no puede deshacerse',
			[
				{
					text: 'Eliminar',
					onPress: async () => {
						props.setProgress(true);
						await firebase.database
							.collection('mascotas')
							.doc(props.mascota.id)
							.delete();

						props.cargaMascotas();
						props.setProgress(false);
					},
					style: 'destructive',
				},
				{
					text: '¡No, espera!',
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				alignItems: 'center',
				width: null,
				backgroundColor: colores.tumbleweed,
				margin: 8,
				padding: 8,
				borderRadius: 16,
			}}>
			<ImageBackground
				source={{ uri: props.mascota.foto }}
				style={{
					width: 64,
					height: 64,
					marginVertical: 8,
					alignSelf: 'center',
					resizeMode: 'center',
					borderRadius: 32,
					overflow: 'hidden',
					backgroundColor: colores.chineseViolet,
				}}
			/>

			<View style={{ flex: 1 }}>
				<Text
					style={{
						color: colores.inactiveTab,
						fontSize: 20,
						marginStart: 8,
						marginBottom: 4,
						fontWeight: 'bold',
					}}>
					{props.mascota.nombre}
				</Text>
				<Text style={{ marginStart: 8 }}>
					{props.mascota.raza}
				</Text>
			</View>

			<View style={{ flexDirection: 'row' }}>
				{/* Boton para editar */}
				<TouchableOpacity
					// Enviamos como parámetro de navegación
					// el id del documento
					onPress={() =>
						navigation.navigate(
							'edita_mascota',
							{
								mascotaID: props.mascota.id,
							}
						)
					}
					style={{
						padding: 8,
						backgroundColor: colores.yinMnBlue,
						borderRadius: 8,
						marginEnd: 8,
					}}>
					<AntDesign
						name='edit'
						size={22}
						color={'#fff'}
					/>
				</TouchableOpacity>

				{/* Boton para eliminar */}
				<TouchableOpacity
					style={{
						padding: 8,
						backgroundColor: colores.candyPink,
						borderRadius: 8,
					}}
					onPress={eliminarMascota}>
					<AntDesign
						name='delete'
						size={22}
						color={'#FFF'}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MascotaItem;
