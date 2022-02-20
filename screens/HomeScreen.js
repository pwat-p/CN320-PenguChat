import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const profilePage = () => {
        navigation.navigate('Profile')
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "PenguChat",
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={profilePage} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
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
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AddChat')} 
                        activeOpacity={0.5}
                    >
                        <Ionicons name="md-chatbox-ellipses-outline" size={35} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName, type, member) => {
        navigation.navigate('Chat', {
            id,
            chatName,
            type,
            member,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName, type, member }}) => (
                    member.includes(auth.currentUser.displayName.split('-')[1])  ? 
                        <CustomListItem 
                            key={id} 
                            id={id} 
                            chatName={chatName}
                            type={type}
                            member={member}
                            enterChat={enterChat}
                        /> : null
                ))}
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})
