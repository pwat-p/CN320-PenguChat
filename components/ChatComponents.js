import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Avatar, Bubble, MessageText, Time, InputToolbar, Send } from 'react-native-gifted-chat'

export const renderAvatar = (props) => (
    <Avatar
      {...props}
      containerStyle={{ 
          left: { zIndex:999 },
          right: { zIndex:999 }
      }}
    />
  )

export const renderBubble = (props) => (
    <Bubble
        {...props}
        textStyle={{
            right: styles.rightText,
            left: styles.leftText
          }}
        wrapperStyle={{
            right: styles.rightBubble,
            left: styles.leftBubble
          }}
    />
  )

export const renderMessageText = (props) => (
    <MessageText
      {...props}
      linkStyle={{
        left: { color: 'orange' },
        right: { color: 'blue' },
      }}
    />
  )

export const renderTime = (props) => (
    <Time 
      {...props}
      timeTextStyle={{
        right: {
          color: "black"
        },
        left: {
          color: "white"
        }
      }}
    />
  )

export const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      primaryStyle={styles.inputBar}
    />
  )

export const renderSend = (props) => (
    <Send
      {...props}
      containerStyle={{
        marginBottom: 8,
        marginRight: 8
      }}
    >
      <Ionicons name='send' size={24} color='#2B68E6' />
    </Send>
  )

const styles = StyleSheet.create({
    rightBubble: {
        padding: 15,
        backgroundColor: '#ECECEC',
        borderRadius: 15,
        alignSelf: 'flex-end',
        marginRight: -35,
        marginBottom: 10,
        maxWidth: '80%',
        position: 'relative',
    },
    rightText: {
        color: 'black',
        fontWeight:'500',
        marginLeft: 10,
    },
    leftBubble: {
        padding: 15,
        backgroundColor: "#2B68E6",
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginLeft: -35,
        marginBottom: 10,
        maxWidth: '80%',
        position: 'relative',
    },
    leftText: {
        color:'white',
        fontWeight:'500',
        marginLeft: 10,
    },
    inputBar: {
      backgroundColor: '#ECECEC',
      height: 40,
      borderRadius: 30,
      marginBottom: 10,
      marginRight: 10,
      marginLeft: 10,
    }
})