import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button } from 'react-native'
import * as firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUserProfile } from "../../redux/actions/index"


// YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])




function ChatRoom(props) {
  const [user, setUser] = useState({})
  // const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  console.log("############  chat room  ############")
  console.log(props);

  const db = firebase.firestore()
  const chatsRef = db.collection('userChat').doc(props.route.params.chatID).collection("chat")

  useEffect(() => {
    const readUser = async() => {
      try {
        await props.fetchUserProfile;
        setUser({_id: firebase.auth().currentUser.uid, name: props.profile.name});
      }
      catch (e) {}
    }
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data()
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() }
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
  }, [])

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

  // async function handlePress() {
  //   const _id = Math.random().toString(36).substring(7)
  //   const user = { _id, name }
  //   await AsyncStorage.setItem('user', JSON.stringify(user))
  //   setUser(user)
  // }
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

  // if (!user) {
  //   return (
  //     <View style={styles.container}>
  //       <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
  //       <Button onPress={handlePress} title="Enter the chat" />
  //     </View>
  //   )
  // }
  return <GiftedChat messages={messages} user={user} onSend={handleSend} />
}

const mapStateToProps = (store) => ({
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUserProfile}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(ChatRoom);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
})
