import React from 'react'
import {
  SafeAreaView, // for iphone XR or later version 
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Modal
} from "react-native"

import { Icon } from 'react-native-elements'

export default function Home(props) {

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg" }}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.boxText}>Beacon Match</Text>
          <View style={{ paddingTop: 8}}/>
          <Text style={styles.ButtonText}>+3</Text>
        </TouchableOpacity>

        <View style={{ paddingLeft: 8}}/>
        
        <TouchableOpacity 
          style={styles.Button}
          // onPress={() => this.setState({show: true})}
        >
          <Text style={styles.boxText}>Invitation</Text>
          <View style={{ paddingTop: 8}}/>
          <Text style={styles.ButtonText}>+2</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 8}}/>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.boxText}>Daily Goal</Text>
          <View style={{ paddingTop: 8}}/>
          <Text style={styles.ButtonText}>+2</Text>
        </TouchableOpacity>

        <View style={{ paddingLeft: 8}}/>
        
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.boxText}>Schedule</Text>
          <View style={{ paddingTop: 8}}/>
          <Text style={styles.ButtonText}>+0</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={false}>
        <View style={{ backgroundColor: '#000000aa', flex: 1}}>
          <View style={styles.ModalBox}>
            <Image
              style={styles.ModalImage}
              source={{ uri: "https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg" }}
            />

            <Text style={styles.ModalName}>Kevin Hart</Text>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.ModalText}>Tallest and Fastest Man on Earth</Text>
              <Text style={styles.ModalText}>Never mess with me!</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.ModalText}>Gender: Male</Text>
              <Text style={styles.ModalText}>Age: 40</Text>
              <Text style={styles.ModalText}>Weight: 150 lb</Text>
              <Text style={styles.ModalText}>Hobby: Cat Car Movies</Text>
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
                  onPress={() => props.navigation.navigate("PairUp")}
                >
                  <Icon name='check' color='green'/>
                </TouchableOpacity>
              </View>

              <View style={{ paddingLeft: 40}}/>

              <View style={styles.IconBoxClose}>
                <TouchableOpacity style={styles.IconButton}>
                  <Icon name='close' color='red'/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}

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
