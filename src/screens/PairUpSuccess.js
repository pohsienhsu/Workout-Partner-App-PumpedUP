import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from "react-native"

import { fetchUser, fetchUserPref, fetchUserProfile, fetchUserPartner, clearData } from '../../redux/actions/index';
import firebase from 'firebase';
require('firebase/firestore');
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

// export default function PairUpSuccess(props) {

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 0.45 }}>
//         <Image
//           style={styles.profileImage}
//           source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg" }}
//         />
//       </View>
//       <View style={{ flex: 0.1 }}>
//         <Text style={styles.text}>Matched!</Text>
//       </View>
//       <View style={{ flex: 0.45 }}>
//         <Image
//           style={styles.profileImage}
//           source={{ uri: "https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg" }}
//         />
//       </View>
//     </View>
//   )
// }

function PairUpSuccess(props) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [pairURL, setPairURL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await props;
        // await props.fetchUserPartner();

        const { currentUser, profile } = props;
        setUser(currentUser);
        setProfile(profile);
        setAvatar(profile.pictureURL[0].url);
      }
      catch (reject) { }
    }

    const fetchPairUser = async () => {
      try {
        const pairUser = await firebase.firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("sentInvitations")
          .doc(firebase.auth().currentUser.uid)
          .get()
        
        setPairURL(pairUser.data().uid[pairUser.data().uid.length - 1])
      }
      catch (e) {
        console.log(e)
      }
    }

    // null or undefined
    if (props.currentUser == null) {
      const fetchUserData = async () => {
        try {
          await props.fetchUser();
          setUser(props.currentUser);
          console.log("currentUser: ", props.currentUser);
        }
        catch (e) {
          console.log(e);
        }
      }
      fetchUserData();
      fetchPairUser();
    }
    // if user exists
    else {
      console.log("currentUser: ", props.currentUser);
      fetchData();
      fetchPairUser();
    }
  }, [props.currentUser, props.profile, avatar, pairURL])

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.45 }}>
        <Image
          style={styles.profileImage}
          // source={ {uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fw19-trn-projrock-dj-03-0247-1587740368.jpg"} }
          source={ {uri: avatar }}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <Text style={styles.text}>Matched!</Text>
      </View>
      <View style={{ flex: 0.45 }}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg" }}
          // source={{ uri: pairURL }}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  profile: store.userState.profile
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUserProfile, fetchUser }, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(PairUpSuccess)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EF9C2E",
    alignItems: "center"
  },
  profileImage: {
    margin: 20,
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  }
})

