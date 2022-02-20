import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const EditProfileScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const editProfile = () => {
        auth.currentUser.updateProfile({
            displayName: displayName + '-' + auth.currentUser.displayName.split('-')[1] || auth.currentUser.displayName,
            photoURL: imageUrl || auth.currentUser.photoURL
        }).then(
            navigation.navigate('Home')
        )
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "PenguChat",
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',

        })
    }, [navigation])

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{marginBottom: 50}}>
                Edit Profile
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    label='Email'
                    defaultValue={auth.currentUser.email}
                    disabled
                />
                <Input
                    label='User ID'
                    defaultValue={auth.currentUser.displayName.split('-')[1]}
                    disabled
                />
                <Input 
                    label='DisplayName'
                    type='text'
                    defaultValue={auth.currentUser.displayName.split('-')[0]}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <Input 
                    label='Profile Picture URL (optional)'
                    type='text'
                    defaultValue={auth.currentUser.photoURL}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={editProfile}
                />
            </View>

            <Button
                containerStyle={styles.button}
                onPress={editProfile}
                title='Edit Profile'
                raised
            />
            <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})
