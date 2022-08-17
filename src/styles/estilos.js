import { StyleSheet } from 'react-native';
import colores from './colores';

/*
Declaramos un objetos de estilos globales y lo exportamos
para poder añadirlo en otros componentes
*/
const estilos = StyleSheet.create({
	contenedor: {
		backgroundColor: colores.yinMnBlue,
		paddingTop: 60,
		flex: 1,
	},
	titulo: {
		fontSize: 30,
		color: colores.bone,
		paddingVertical: 10,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	subtitulo: {
		fontSize: 30,
		color: colores.lightCyan,
		paddingVertical: 10,
		fontWeight: 'normal',
		alignSelf: 'center',
	},
	contenedorTarjeta: {
		backgroundColor: colores.lightCyan,
		marginVertical: 10,
		padding: 20,
		marginHorizontal: 10,
		borderRadius: 10,
	},
	textoTarjeta: {
		fontSize: 30,
		paddingVertical: 10,
		fontWeight: 'normal',
		alignSelf: 'center',
		color: colores.candyPink,
	},
	contenedorTarjeta2: {
		backgroundColor: colores.chineseViolet,
	},
	textoTarjeta2: {
		color: colores.vividSkyBlue,
	},

	tituloComponente: {
		margin: 16,
		fontSize: 24,
		textAlign: 'center',
		color: colores.yinMnBlue,
		fontWeight: 'bold',
	},

	textInputBase: {
		borderWidth: 1,
		width: null,
	},

	textInputPerso1: {
		borderWidth: 2,
		borderColor: colores.yinMnBlue,
		margin: 8,
		padding: 8,
		borderRadius: 8,
		color: colores.chineseViolet,
		backgroundColor: colores.bone,
	},

	textInputPerso2: {
		borderBottomWidth: 2,
		borderBottomColor: colores.yinMnBlue,
		margin: 8,
		padding: 8,
	},

	textInputIconContainer1: {
		flex: 1,
		flexDirection: 'row',
		borderColor: colores.yinMnBlue,
		backgroundColor: colores.bone,
		borderWidth: 2,
		margin: 8,
		padding: 8,
		borderRadius: 8,
	},

	textInputIconContainer2: {
		flex: 1,
		flexDirection: 'row',
		borderBottomColor: colores.yinMnBlue,
		borderBottomWidth: 2,
		margin: 8,
		padding: 8,
	},
	textInputIcon: {
		flex: 1,
		marginStart: 4,
		color: colores.chineseViolet,
		fontWeight: 'bold',
	},

	textInputIconLine: {
		color: '#000',
		fontWeight: 'normal',
	},

	switchContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
		padding: 8,
	},

	switchText: {
		flex: 1,
	},

	checkBoxContainer: {
		flex: 1,
		flexDirection: 'row',
		margin: 8,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	checkBoxText: {
		flex: 1,
		marginStart: 8,
	},
});

export default estilos;
