import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, type, enterChat, member }) => {
    const [chatMessages, setChatMessages] = useState('')

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => setChatMessages(
                snapshot.docs.map(doc => doc.data())
        ))

        return unsubscribe
    },[])

    return (
        <ListItem onPress={() => enterChat(id, chatName, type)} key={id} bottomDivider >
                <Avatar
                    rounded
                    source={{ uri: chatMessages?.[0]?.user.avatar }}
                /> 
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800'}}>
                        {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages?.[0]?.user.name}: {chatMessages?.[0]?.text}
                </ListItem.Subtitle>
            </ListItem.Content>
            { type === 'group' ? <FontAwesome name='group' size={24} color='black' /> : null}
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
