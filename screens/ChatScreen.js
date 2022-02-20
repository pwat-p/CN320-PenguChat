import React, { useState, useLayoutEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { auth, db } from '../firebase'
import { renderAvatar, 
        renderBubble, 
        renderInputToolbar,  
        renderMessageText, 
        renderTime, 
        renderSend } from '../components/ChatComponents'

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
        title: 'Chat',
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#2B68E6'},
        headerTitle: () => (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Avatar 
                    rounded
                    source={{ uri: messages?.[0]?.user.avatar }}
                />
                <Text 
                    style={{
                        color: 'white',
                        marginLeft: 10,
                        fontWeight: '700'
                    }} 
                >
                        {route.params.chatName}
                </Text>
            </View>
        ),
        headerLeft: () => (
            <TouchableOpacity 
                style={{ marginLeft: 10 }}
                onPress={navigation.goBack}
            >
                <AntDesign name='arrowleft' size={24} color='white' />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: -30,
                }}
            >
                <TouchableOpacity onPress={addMember} >
                    { route.params.type === 'group' ? <Ionicons name='person-add-sharp' size={24} color='white' /> : null}
                </TouchableOpacity>
            </View>
        )
    })
}, [navigation, messages])

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
    ));
  return unsubscribe;
  }, [])

  const addMember = () => {
    navigation.navigate('AddMember', {
      id: route.params.id,
      member: route.params.member,
    })
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user,
    } = messages[0]
    db.collection('chats').doc(route.params.id).collection('messages').add({
      _id,
      createdAt,
      text,
      user
    })
  }, [messages])

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      alwaysShowSend
      showUserAvatar
      renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      renderMessageText={renderMessageText}
      renderTime={renderTime}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      renderUsernameOnMessage
      messagesContainerStyle={{ backgroundColor: 'white' }}

      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName.split('-')[0],
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  )
}

const styles = StyleSheet.create({})
