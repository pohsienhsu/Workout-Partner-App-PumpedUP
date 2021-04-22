import * as firebase from 'firebase'
require('firebase/firestore')

export async function basePairingAlg(pref, bar) {

  let pairingInfo = {}
  let alreadySent = { uid: [] };

  try {
    alreadySent = await firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("sentInvitations")
      .doc(firebase.auth().currentUser.uid)
      .get()
    alreadySent = alreadySent.data()
    if (alreadySent == undefined) {
      alreadySent = { uid: [] };
    }

    console.log("Already Sent: ", alreadySent);
  }
  catch (e) {
    console.log("There is no already sent")
    alreadySent = { uid: [] };
  }


  // Get all users
  const users = await firebase.firestore()
    .collection("users")
    .get();

  users.forEach(async user => {

    const info = await firebase.firestore().collection("users").doc(user.id).collection("userProfile").doc(user.id).get();

    if (info.exists && user.id != firebase.auth().currentUser.uid && !alreadySent.uid.includes(user.id)) {
      console.log('User id: ', user.id, ' Data name:', info.data().name);

      let score = 0

      info.data().bodyPart.forEach(bodyInfo => {
        const bodyScore = 2.75 / pref.bodyPart.length;
        try {
          if (pref.bodyPart.includes(bodyInfo)) {
            score += bodyScore;
          }
        }
        catch (e) {
          console.log(`Algorithm BodyPart Error: ${bodyInfo}`)
        }
      })

      for (const [range, boolean] of Object.entries(pref.age)) {
        if ((range == "18 ~ 25") && boolean) {
          if ((info.data().age >= 18) && (info.data().age <= 25)) {
            score += 1.5;
            break;
          }
        }

        if ((range == "26 ~ 35") && boolean) {
          if ((info.data().age >= 26) && (info.data().age <= 35)) {
            score += 1.5;
            break;
          }
        }

        if ((range == "36 ~ 45") && boolean) {
          if ((info.data().age >= 36) && (info.data().age <= 45)) {
            score += 1.5;
            break;
          }
        }

        if ((range == "46 ~ 60") && boolean) {
          if ((info.data().age >= 46) && (info.data().age <= 60)) {
            score += 1.5;
            break;
          }
        }

        if ((range == "> 60") && boolean) {
          if (info.data().age > 60) {
            score += 1.5;
            break;
          }
        }
      }

      if ((info.data().experience) == pref.experience) {
        score += 2.5;
      }

      if ((info.data().frequency) == pref.frequency) {
        score += 2.25;
      }

      if (pref.gender[info.data().gender]) {
        score += 2;
      }

      // BeaconMatch Success
      if (score >= bar) {
        pairingInfo = {
          uid: user.id,
          name: info.data().name,
          age: info.data().age,
          gender: info.data().gender,
          img: info.data().pictureURL[0].url,
          intro: info.data().intro,
          hobbies: info.data().hobbies,
          experience: info.data().experience,
          frequency: info.data().frequency
        }
        console.log("pairingInfo: ", pairingInfo)
      }
    }
  })
  return pairingInfo;
}