import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import firebase from 'firebase/app'
import { db } from '../firebase'

export default function AddMemberScreen( { navigation, route } ) {
    const [input, setInput] = useState([])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add Member' ,
            headerBackTitle: 'Chats',
        })
   }, [navigation, route])

    const addMember = async () => {
        if (input.length > 0) {
          await db.collection('chats').doc(route.params.id)
            .update({
                 "member": firebase.firestore.FieldValue.arrayUnion(input)
            })
            .then(() => {
                setInput('')
                navigation.navigate('Chat')
            })
            .catch((error) => alert(error))
       }
    }

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Enter User's ID"
                value={input} 
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={addMember}
                leftIcon={
                    <Ionicons name="person-add-sharp" size={24} color="black" />
                }
            />
            <Button onPress={addMember} title={'Add Member'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    }
})

