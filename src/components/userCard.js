import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native"
import { Icon } from 'react-native-elements';


function UserCard({modalVisible, setModalVisible, beaconMatch, navigation}) {
  if (beaconMatch.img == "") {
    return <View></View>;
  }
  return (
    <Modal transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible)}}>
      <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
        <View style={styles.ModalBox}>
          <Image
            style={styles.ModalImage}
            source={{ uri: beaconMatch.img }}
          />

          <Text style={styles.ModalName}>{beaconMatch.name}</Text>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.ModalText}>{beaconMatch.intro}</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.ModalText}>Gender: {beaconMatch.gender}</Text>
            <Text style={styles.ModalText}>Age: {beaconMatch.age}</Text>
            <Text style={styles.ModalText}>Hobbies: {beaconMatch.hobbies}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
            <View style={styles.IconBoxCheck}>
              <TouchableOpacity
                style={styles.IconButton}
                onPress={() => {
                  navigation.navigate("PairUp");
                  setModalVisible(false)
                }}
              >
                <Icon name='check' color='green' />
              </TouchableOpacity>
            </View>

            <View style={{ paddingLeft: 40 }} />

            <View style={styles.IconBoxClose}>
              <TouchableOpacity style={styles.IconButton}
                onPress={() => {
                  setModalVisible(false)
                }}>
                <Icon name='close' color='red' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileImage: {
    margin: 10,
    height: 300,
    width: 300,
    borderRadius: 150,
    alignSelf: "center"
  },
  box: {
    width: 160,
    height: 80,
    backgroundColor: '#313A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
  Button: {
    width: 160,
    height: 80,
    backgroundColor: '#313A3A',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowColor: 'black',
  },
  textContent: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  ModalBox: {
    flex: 1,
    marginTop: 80,
    marginBottom: 80,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
    backgroundColor: '#EF9C2E',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ModalImage: {
    marginTop: 20,
    height: 160,
    width: 160,
    borderRadius: 150,
    alignSelf: "center"
  },
  ModalName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ModalText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 50
  },
  IconBoxCheck: {
    width: 54,
    height: 54,
    backgroundColor: 'green',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconBoxClose: {
    width: 54,
    height: 54,
    backgroundColor: 'red',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EF9C2E',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
})