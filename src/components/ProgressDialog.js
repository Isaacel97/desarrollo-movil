import React from 'react';
import {
	ActivityIndicator,
	Text,
	View,
} from 'react-native';

import colores from './../styles/colores';

const ProgressDialog = (props) => {
	return (
		<View
			style={{
				position: 'absolute',
				alignContent: 'center',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				zIndex: 1001,
			}}>
			<View
				style={{
					position: 'absolute',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
					zIndex: 1,
					backgroundColor: '#000',
					opacity: 0.5,
				}}
			/>

			<View
				style={{
					backgroundColor: '#fff',
					position: 'relative',
					zIndex: 2,
					padding: 50,
					overflow: 'hidden',
					borderRadius: 25,
					opacity: 0.7,
					alignItems: 'center',
					alignContent: 'center',
					justifyContent: 'center',
				}}>
				<ActivityIndicator
					size='large'
					color={colores.yinMnBlue}
				/>
				<Text
					style={{
						color: '#000',
						marginTop: 10,
					}}>
					Por favor espera...
				</Text>
			</View>
		</View>
	);
};

export default ProgressDialog;
