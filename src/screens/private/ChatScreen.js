import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useCallback,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../../backend/firebase';

const ChatScreen = (props) => {
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		getChats();
	}, []);

	const getChats = async () => {
		const query = await firebase.database
			.collection('chats')
			.orderBy('createdAt', 'desc')
			.onSnapshot((querySnapshot) => {
				setMessages(
					querySnapshot.docs.map((doc) => ({
						_id: doc.data()._id,
						createdAt: doc
							.data()
							.createdAt.toDate(),
						text: doc.data().text,
						user: doc.data().user,
					}))
				);
			});
	};

	const onSend = useCallback(async (messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		// setMessages([...messages, ...messages]);
		const { _id, createdAt, text, user } = messages[0];
		await firebase.database.collection('chats').add({
			_id,
			createdAt,
			text,
			user,
		});
	}, []);

	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={false}
			showUserAvatar={false}
			onSend={(messages) => onSend(messages)}
			messagesContainerStyle={{
				backgroundColor: '#fff',
			}}
			textInputStyle={{
				backgroundColor: '#fff',
				borderRadius: 20,
			}}
			user={{
				_id: firebase.auth.currentUser.email,
				avatar: 'https://i.pravatar.cc/300',
			}}
		/>
	);
};

export default ChatScreen;
