import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Button, Image } from "react-native"
import {
  Dropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { RadioButton } from 'react-native-paper';
import BeaconCheckBox from "../components/BeaconCheckBox";
import * as ImagePicker from 'expo-image-picker';

import { fetchUser, fetchUserPref, fetchUserProfile, clearData } from '../../redux/actions/index';

import firebase from 'firebase'
require('firebase/firestore')
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"



function EditProfile(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [pref, setPref] = useState();

  const [intro, setIntro] = useState("");
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [age, setAge] = useState("");
  const [pictureURL, setPictureURL] = useState([]);
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [bodyPart, setBodyPart] = useState([]);
  const [location, setLocation] = useState({ "In-Person": false, "Remote": false });
  const [frequency, setFrequency] = useState('3 ~ 5 / week');
  // const [distance, setDistance] = useState(1);

  const [pic1, setPic1] = useState("https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640")
  const [pic2, setPic2] = useState("https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640")
  const [pic3, setPic3] = useState("https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640")

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    const { currentUser, pairingPref, profile } = props;

    setUser(currentUser);
    setPref(pairingPref);

    const fetchProfile = async () => {
      try {
        await profile;
        setGender(profile.gender);
        setExperience(profile.experience);
        setBodyPart(profile.bodyPart);
        setFrequency(profile.frequency);
        setAge(profile.age);
        setHobbies(profile.hobbies);
        setIntro(profile.intro);
        setName(profile.name);
        setPictureURL(profile.pictureURL);
        setProfile(profile);
        setLocation(profile.location);
        setPic1(profile.pictureURL[0].url);
        setPic2(profile.pictureURL[1].url);
        setPic3(profile.pictureURL[2].url);
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      }
      catch (r) { }
    }

    fetchProfile()
  }, [])

  // console.log("#####################  Edit Profile  ######################")
  // console.log(props.profile.pictureURL)

  const profileDetails = {
    name,
    gender,
    experience,
    bodyPart,
    frequency,
    age,
    hobbies,
    intro,
    pictureURL,
    location
  }

  const onSave = async () => {
    await firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("userProfile")
      .doc(firebase.auth().currentUser.uid)
      .set(profileDetails)
      .then(() => {
        props.fetchUserProfile()
        setProfile(profileDetails)
      })
  }

  const pickImage = async (num) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      const uri = result.uri
      if (num == 1) {
        setPic1(uri)
        uploadImage(num, uri)
      }
      else if (num == 2) {
        setPic2(uri)
        uploadImage(num, uri)
      }
      else if (num == 3) {
        setPic3(uri)
        uploadImage(num, uri)
      }
    }
  };

  const uploadImage = async (num, uri) => {
    const childPath = `pictures/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    // console.log(childPath)

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob);

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        let profilePicArr = pictureURL
        profilePicArr[num - 1] = {url: snapshot}
        setPictureURL(profilePicArr)
        // console.log(snapshot)
      })
    }

    const taskError = snapshot => {
      console.log(snapshot)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  }

  return (
    <ScrollView style={styles.view}>
      {/* <View style={styles.container}>
        <Text style={styles.title}>Upload Profile Picture URL</Text>
        <Text style={{ marginHorizontal: 12, marginTop: 10 }}>Pic1 (Avatar)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => {
            let newArr = [...pictureURL];
            newArr[0] = { url: input };
            setPic1(input);
            setPictureURL(newArr)
          }}
          value={pic1}
        />
        <Text style={{ marginHorizontal: 12 }}>Pic2</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => {
            let newArr = [...pictureURL];
            newArr[1] = { url: input };
            setPic2(input);
            setPictureURL(newArr)
          }}
          value={pic2}
        />
        <Text style={{ marginHorizontal: 12 }}>Pic3</Text>
        <TextInput
          style={styles.input}
          onChangeText={(input) => {
            let newArr = [...pictureURL];
            newArr[2] = { url: input };
            setPic3(input);
            setPictureURL(newArr)
          }}
          value={pic3}
        />
      </View> */}
      <View style={styles.container}>
        <Text style={styles.title}>Profile Image</Text>
        <Text style={styles.imageDescription}>Press pictures to upload </Text>
        <View style={styles.imageRow}>
          <TouchableOpacity
            onPress={() => {
              pickImage(1)

            }}
          >
            <Image
              style={styles.image}
              source={{ uri: pic1 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage(2)
              // console.log(pic2)
            }}
          >
            <Image
              style={styles.image}
              source={{ uri: pic2 }}
            />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage(3)

            }}
          >
            <Image
              style={styles.image}
              source={{ uri: pic3 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>About Me</Text>
        <TextInput
          style={styles.introInput}
          onChangeText={setIntro}
          value={intro}
          multiline={true}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Gender </Text>
        <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
          <RadioButton.Item
            label="Male"
            value="Male"
            color="black"
          />
          <RadioButton.Item
            color="black"
            label="Female"
            value="Female"
          />
          <RadioButton.Item
            color="black"
            label="Others"
            value="Others"
          />
        </RadioButton.Group>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Age</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          keyboardType="number-pad"
          value={age}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Hobbies</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHobbies}
          value={hobbies}
        />
      </View>


      <View style={styles.container}>
        <Text style={styles.title}> Workout Body Part </Text>
        <MultiselectDropdown
          label="Select workout parts"
          data={bodyData}
          // enableSearch
          // enableAvatar
          chipType="outlined"
          value={bodyPart}
          onChange={setBodyPart}
          disableSort
          itemContainerStyle={{ height: 40 }}
          parentDDContainerStyle={{ height: "80%" }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Experience </Text>
        <Dropdown
          label="Select workout experience"
          data={experienceData}
          // enableSearch
          value={experience}
          // mainContainerStyle={styles.dropDown}
          onChange={setExperience}
          parentDDContainerStyle={{ height: "80%" }}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Frequency </Text>
        <RadioButton.Group onValueChange={newValue => setFrequency(newValue)} value={frequency}>
          <RadioButton.Item
            label="1 ~ 2 / week"
            value="1 ~ 2 / week"
            color="black"
          />
          <RadioButton.Item
            color="black"
            label="3 ~ 5 / week"
            value="3 ~ 5 / week"
          />
          <RadioButton.Item
            color="black"
            label="6 ~ 7 / week"
            value="6 ~ 7 / week"
          />
        </RadioButton.Group>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}> Mode </Text>
        <BeaconCheckBox
          option="In-Person"
          state={location}
          setState={setLocation}
          containerStyle={styles.checkbox}
        />
        <BeaconCheckBox
          option="Remote"
          state={location}
          setState={setLocation}
          containerStyle={styles.checkbox}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.saveBtn}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              onSave().then(() => {
                props.navigation.navigate("Main");
              })
            }}
          >
            <Text style={styles.ButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 50 }}></View>
    </ScrollView >
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  pairingPref: store.userState.pairingPref,
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  // fetchUser, 
  // clearData, 
  // fetchUserPref,
  fetchUserProfile
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(EditProfile)

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    backgroundColor: "#fff",
    marginVertical: 0,
  },
  container: {
    marginTop: 20,
    marginHorizontal: '10%'
  },
  Title: {
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#313A3A"
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: "#EF9C2E",
    fontWeight: "bold"
  },
  saveBtn: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    height: 46,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10
  },
  introInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "3%"
  },
  image: {
    // marginTop: 20,
    height: 100,
    width: 100,
    // borderRadius: 150,
    // alignSelf: "center"
  },
  imageDescription: {
    fontSize: 12,
    color: "grey",
    marginTop: "5%"
  }
})

const bodyData = [
  { value: 'chest', label: 'chest' },
  { value: 'legs', label: 'legs' },
  { value: 'shoulders', label: 'shoulders' },
  { value: 'back', label: 'back' },
  { value: 'core', label: 'core' },
  { value: 'arms', label: 'arms' },
  { value: 'others', label: 'others' }
]

const experienceData = [
  { label: 'Less than 3 months', value: "Less than 3 months" },
  { label: 'About 1 year', value: "About 1 year" },
  { label: '1 to 3 years', value: "1 to 3 years" },
  { label: '3 to 5 years', value: "3 to 5 years" },
  { label: '5 to 10 years', value: '5 to 10 years' },
  { label: 'More than 10 years', value: 'More than 10 years' }
]