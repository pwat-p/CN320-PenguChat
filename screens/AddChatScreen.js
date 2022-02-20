import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import firebase from 'firebase/app'
import { auth, db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [chatName, setChatName] = useState('')
    const [friendID, setFriendID] = useState('')
    const [groupName, setGroupName] = useState('')

    useLayoutEffect(() => {
         navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'Chats',
         })
    }, [navigation])

    const addFriend = async () => {
        if (chatName.length > 0 && friendID.length > 0) {
            await db.collection('chats')
              .add({
                  type: 'private',
                  chatName: chatName,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  member: [auth.currentUser.displayName.split('-')[1],friendID]
                })
              .then(() => {
                navigation.navigate('Home')
              })
              .catch((error) => alert(error))
         }
    }

    const createGroup = async () => {
        if (groupName.length > 0) {
          await db.collection('chats')
            .add({
                type: 'group',
                chatName: groupName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                member: [auth.currentUser.displayName.split('-')[1]]
              })
            .then(() => {
              navigation.navigate('Home')
            })
            .catch((error) => alert(error))
       }
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter a Chat name"
                value={chatName} 
                onChangeText={(text) => setChatName(text)}
                leftIcon={
                    <FontAwesome name='wechat' size={24} color='black' />
                }
            />
            <Input 
                placeholder="Enter your friend's ID"
                value={friendID} 
                onChangeText={(text) => setFriendID(text)}
                onSubmitEditing={addFriend}
                autoCapitalize='none'
                leftIcon={
                    <Ionicons name='key'  size={24} color='black' />
                }
            />
            <Button onPress={addFriend} title='Create private Chat' />

            <View style={{ height: 100 }} />
            <Input 
                placeholder='Enter a Group name'
                value={groupName} 
                onChangeText={(text) => setGroupName(text)}
                onSubmitEditing={createGroup}
                leftIcon={
                    <FontAwesome name='group' size={24} color='black' />
                }
            />
            <Button onPress={createGroup} title='Create new Group' />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    }
})
