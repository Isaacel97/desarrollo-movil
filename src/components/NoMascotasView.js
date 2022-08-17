import { Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import colores from '../styles/colores';

const NoMascotasView = (props) => {
	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 64,
			}}>
			<Entypo
				name='emoji-sad'
				color={colores.candyPink}
				size={64}
			/>
			<Text style={{ fontSize: 22, marginTop: 16 }}>
				Sin mascotas registradas
			</Text>
		</View>
	);
};

export default NoMascotasView;
