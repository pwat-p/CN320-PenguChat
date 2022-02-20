import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../firebase'

const ProfileScreen = ({ navigation }) => {

    const editProfile = () => {
        navigation.navigate('EditProfile')
    }

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
                })
        })
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
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image 
                source={{ uri: auth?.currentUser?.photoURL }}
                style={{ width: 200, height: 200 }}
                resizeMode={'cover'}
                borderRadius={100}
            />
            <Text style={{marginBottom: 5, fontSize:30}}>
                    {auth.currentUser.displayName.split('-')[0]}
            </Text>
            <Text style={{marginBottom: 45, fontSize:15, color:'gray'}}>
                    ID : {auth.currentUser.displayName.split('-')[1]}
            </Text>
            <Button 
                onPress={editProfile} 
                containerStyle={styles.button} 
                title='Edit Profile'
            />

            <Button 
                onPress={signOutUser} 
                containerStyle={styles.button} 
                title='Logout'
                type='outline'
            />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    profileContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
