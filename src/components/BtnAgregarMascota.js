import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colores from '../styles/colores';

const BtnAgregarMascota = (props) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('agrega_mascota')
			}>
			<Feather
				name='plus-circle'
				size={22}
				color={colores.bone}
			/>
		</TouchableOpacity>
	);
};

export default BtnAgregarMascota;
