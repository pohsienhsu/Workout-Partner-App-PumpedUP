// run 'npm start' in the path folder in terminal

import React, { Component } from 'react';
import { 
  StatusBar,
  StyleSheet, 
  Text, 
  View, //<div>
  SafeAreaView, // for iphone XR or later version
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import Card from './Card'


class Game extends Component {

  state = {
    cardSymbols: [
      '😎', '😱', '🤡', '👻', '👀', '🐶', '🥃', '🏀',
    ],
    cardSymbolsInRand: [],
    isOpen: [],
    firstPickedIndex: null,
    secondPickedIndex: null,
    steps: 0,
    isEnded: false,
  }

  initGame = () => {
    let newCardsSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols]
    let cardSymbolsInRand = this.shuffleArray(newCardsSymbols)

    let isOpen = []

    for (let i = 0; i < newCardsSymbols.length; i++) {
      isOpen.push(false)
    }

    this.setState({
      cardSymbolsInRand,
      isOpen,
    })

    firebase.auth().signInWithEmailAndPassword("rli342@gatech.edu", "tester")
            .then(() => { }, (error) => { Alert.alert(error.message); });
  }

  componentDidMount() {
    this.initGame()
  }

  shuffleArray = (arr) => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
  }

  cardPressHandler = (index) => {
    let isOpen = [...this.state.isOpen]

    // deal with the problem of double clicking on the card which is already opened
    if (isOpen[index]) {
      return;
    }

    isOpen[index] = true

    if (this.state.firstPickedIndex == null && this.state.secondPickedIndex == null) {
      this.setState({
        isOpen,
        firstPickedIndex: index,
      })
    } else if (this.state.firstPickedIndex != null && this.state.secondPickedIndex == null){
      this.setState({
        isOpen,
        secondPickedIndex: index,
      })
    }

    this.setState({
      steps: this.state.steps + 1,
    })
  }

  calculateGameResult = () => {
    if (this.state.firstPickedIndex != null && this.state.secondPickedIndex != null) {
      
      if (this.state.cardSymbolsInRand.length > 0) {
        let totalOpens = this.state.isOpen.filter((isOpen) => isOpen)
        if (totalOpens.length === this.state.cardSymbolsInRand.length) {
          this.setState({
            isEnded: true,
          })

          return 
        }
      }


      let firstSymbol = this.state.cardSymbolsInRand[this.state.firstPickedIndex]
      let secondSymbol = this.state.cardSymbolsInRand[this.state.secondPickedIndex]

      if (firstSymbol != secondSymbol) {
        setTimeout(() => {
          let isOpen = [...this.state.isOpen]
          isOpen[this.state.firstPickedIndex] = false
          isOpen[this.state.secondPickedIndex] = false

          this.setState({
            firstPickedIndex: null,
            secondPickedIndex: null,
            isOpen,
          })
        }, 1000)
      } else {
        this.setState({
          firstPickedIndex: null,
          secondPickedIndex: null,
        })
      }
    }
  }

  componentDidUpdate(prevPops, prevState) {
    if (prevState.secondPickedIndex != this.state.secondPickedIndex) {
      this.calculateGameResult()
    }
  }

  resetGame = () => {
    this.initGame()

    this.setState({
      firstPickedIndex: null,
      secondPickedIndex: null,
      steps: 0,
      isEnded: false,
    })
  }

  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={ styles.container }>
          <View style={ styles.header }>
            <Text style={ styles.heading }> Matching Game </Text>
          </View>
          <View style={ styles.main }>
            <View style={ styles.gameBoard}>
              {this.state.cardSymbolsInRand.map((symbol, index) =>
                <Card key={index} onPress={ () => this.cardPressHandler(index)} style={ styles.button } fontSize={30} title={symbol} cover="❓" isShow={this.state.isOpen[index]}/>
              )}
            </View>
          </View>
          <View style={ styles.footer }>
            <Text style={ styles.footing }> {
              this.state.isEnded 
                ? `Congrats! You have completed in ${this.state.steps} steps.`
                : `You have tried ${this.state.steps} times(s).`
            }</Text>
            {this.state.isEnded ?
              <TouchableOpacity onPress={ this.resetGame } style={ styles.tryAgainButton}>
                <Text style={ styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
              : null
            }
            <Text style={ styles.footing }>   </Text>
            <Text style={ styles.footing }> Published by Andy & Ryan </Text>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading : {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 3,
    backgroundColor: '#fff',
  },
  buttonText: {

  },
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footing : {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: (Dimensions.get('window').width - (48*4)) / (5*2),
  },
  buttonText: {
    fontSize: 30,
  },
  tryAgainButton: {
    backgroundColor: 'steelblue',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  tryAgainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})