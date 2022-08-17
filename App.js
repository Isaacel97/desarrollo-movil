import React from 'react';
import { LogBox, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colores from './src/styles/colores';
import CheckLoginSc from './src/screens/public/CheckLoginSc';
import LoginSc from './src/screens/public/LoginSc';
import RegistroSc from './src/screens/public/RegistroSc';
import ListaMascotasSc from './src/screens/private/ListaMascotasSc';
import BtnAgregarMascota from './src/components/BtnAgregarMascota';

import BtnCerrarSesion from './src/components/BtnCerrarSesion';
import AgregaMascotaSc from './src/screens/private/AgregaMascotaSc';
import EditaMascotaSc from './src/screens/private/EditaMascotaSc';
import ChatScreen from './src/screens/private/ChatScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	LogBox.ignoreAllLogs(true);
	return (
		<NavigationContainer>
			<StatusBar
				barStyle='light-content'
				backgroundColor={colores.yinMnBlue}
			/>

			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: colores.yinMnBlue,
					},
					headerTintColor: colores.bone,
				}}>
				<Stack.Screen
					name='chek_login'
					component={CheckLoginSc}
					options={{ title: 'Iniciando...' }}
				/>

				<Stack.Screen
					name='login'
					component={LoginSc}
					options={{
						title: 'Iniciar sesión',
					}}
				/>

				<Stack.Screen
					name='registro'
					component={RegistroSc}
					options={{ title: 'Regístrate' }}
				/>

				<Stack.Screen
					name='home_container'
					component={ListaMascotasSc}
					options={{
						title: 'Mis mascotas',
						headerLeft: () => (
							<BtnCerrarSesion />
						),
						headerRight: () => (
							<BtnAgregarMascota />
						),
					}}
				/>

				<Stack.Screen
					name='agrega_mascota'
					component={AgregaMascotaSc}
					options={{
						title: 'Agregar mascota',
						animation: 'slide_from_bottom',
					}}
				/>

				<Stack.Screen
					name='edita_mascota'
					component={EditaMascotaSc}
					options={{
						title: 'Editar mascota',
						animation: 'slide_from_right',
					}}
				/>

				<Stack.Screen
					name='chat_screen'
					component={ChatScreen}
					options={{
						title: 'Chat',
						animation: 'slide_from_right',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
