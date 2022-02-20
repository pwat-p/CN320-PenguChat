import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login',
        })
    }, [navigation])

    const register = () => {
        if (email.length == 0 || userId.length == 0 || displayName.length == 0) {
            alert("Please fill all form")
        } else {
            auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: displayName + '-' + userId,
                    photoURL: imageUrl || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
                })
            })
            .catch((error) => alert(error.message))
        }
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{marginBottom: 50}}>
                Create an account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Email'
                    autoCapitalize='none'
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder='User ID'
                    autoCapitalize='none'
                    type='text'
                    value={userId}
                    onChangeText={(text) => setUserId(text)}
                />
                <Input 
                    placeholder='DisplayName'
                    type='text'
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <Input 
                    placeholder='Profile Picture URL (optional)'
                    autoCapitalize='none'
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            <Button
                containerStyle={styles.button}
                onPress={register}
                title='Register'
                raised
            />
            <View style={{ height: 10 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
