/**
 * Styles for use in application components
 * Uses React Native Stylesheets
 */

 // React imports
 import React, { Component } from 'react';
// React Native imports
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    titleImage: {
      width: 300,
      height: 200,
      resizeMode:"contain",
      position: "absolute",
      top: 50,
      // marginTop: -300,
      // marginBottom: 100,
    },
    titleText: {
      fontSize: 42,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      fontFamily:'Schramberg',
      textAlign: "center",
    },
    playButton: {
      width: 130,
      height: 130,
      resizeMode: "contain",
      marginBottom: 10,
    },
    rulesButton: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },
    scoresButton: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },
    buttons: {
      backgroundColor: 'orange',
      borderRadius: 10,
      margin: 4,
      padding: 5,
      borderColor: '#d19119',
      borderWidth: 2,
    },
    buttonText: {
      fontSize: 38,
      fontFamily:'Arial Rounded MT Bold',
    },
    rulesScreen: {
      alignItems: 'center',
    },
    rulesTitle: {
      fontSize: 38,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      fontFamily:'Arial Rounded MT Bold',
      textDecorationLine: 'underline',
    },
    rulesText: {
      fontSize: 24,
      color: 'black',
      textShadowColor: 'white',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 2,
      fontFamily:'Arial Rounded MT Bold',
      marginHorizontal:20
    },
    scoreBoard2: {
      flexDirection: 'row',
      color: 'red',
      backgroundColor: 'rgba(50,50,50,0.0)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: "7%",
      left: "10%",
      zIndex: 1,
    },
    cameraScoreBoard: {
      alignItems: 'center',
    },
    cameraScoreBoardText: {
      fontSize: 128,
      fontFamily:'Arial Rounded MT Bold',
      paddingRight: 10,
      textTransform: 'capitalize',
      color: '#EEF4BD',
      textShadowColor: 'black',
      textShadowRadius: 10,
      textShadowOffset: {
        width: 1,
        height: -1,
      },
      marginRight: 20,
  
    },
    cameraScoreBoardScoreText:{
      fontSize: 42,
      fontFamily:'Arial Rounded MT Bold',
      paddingRight: 10,
      textTransform: 'capitalize',
      color: '#EEF4BD',
      textShadowColor: 'black',
      textShadowRadius: 10,
      textShadowOffset: {
        width: 1,
        height: -1,
      },
    },
    loadingIcon: {
      position: 'absolute',
      top: "40%",
      left: "45%",
      zIndex: 1,
      backgroundColor: "#EEF4BD",
    },
    flipButton : {
      width: 80,
      height: 80,
      resizeMode: "contain",
      // marginLeft: "-22%",
      marginBottom: 30,
    },
    takePicButton: {
      width: 80,
      height: 80,
      resizeMode: "contain",
      // marginLeft: "-22%",
      marginBottom: 30,
    },
    skipButton: {
      width: 80,
      height: 80,
      resizeMode: "contain",
      marginBottom: 30,
      // marginLeft: "1%",
    },
    homeButton: {
      width: 40,
      height: 40,
      resizeMode: "contain",
      marginLeft: 15,
    },
    entryScreen: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    entryText: {
      fontFamily:'Schramberg',
      fontSize: 28,
      padding: 20,
      textShadowColor: 'white',
      textShadowOffset: {
        width: -1,
        height: 1,
      },
      textShadowRadius: 2,
      textAlign: "center",
    },
    entryInput: {
      fontFamily:'Arial Rounded MT Bold',
      fontSize: 25,
      borderColor: 'gray',
      borderWidth: 1,
      width: "95%",
      marginLeft: "2.5%",
      padding: 5,
      backgroundColor: 'white',
    },
      scoreRow: {
        padding: 5,
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 1,
      fontFamily:'Arial Rounded MT Bold',
      fontSize: 28,
      },
    noScores: {
      fontSize: 24,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      fontFamily:'Arial Rounded MT Bold',
    },
    foundGridFlatList: {
      flexDirection: 'column',
    },
    foundLettersActive: {
      marginBottom: 10,
    },
    foundLettersInactive: {
      tintColor: 'gray',
      marginBottom: 10,
    },
    popUpModalOuter: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(1, 1, 1, 0.5)',
    },

  });

  export default styles;