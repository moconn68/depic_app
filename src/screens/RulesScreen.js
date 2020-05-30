/**
 * RulesScreen.js
 * Screen displaying rules for game
 */
// React imports
import React, { Component } from 'react';
// React Native imports
import {
    TouchableOpacity,
    Image,
    ImageBackground,
    Text,
    View,
} from 'react-native';
// Custom imports
import styles from '../common/styles';
import {
  img_home,
  img_scorebg,

} from '../common/assets';

 export default class RulesScreen extends Component
 {
     componentDidMount()
     {
        this.props.navigation.setOptions
        ({
            title: "How to Play",
            headerTitleStyle:
            {
              fontFamily: 'Arial Rounded MT Bold',
              fontSize: 28,
            },
            gestureEnabled: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={
                  () => {
                    this.props.navigation.navigate("Home");
                  }
                }
              >
                <Image source={img_home} style={styles.homeButton} />
              </TouchableOpacity>
            ),
          });
     }

     render()
     {
        return(
            <ImageBackground  defaultSource={img_scorebg}  style={{width:'100%', height:'100%'}}>
            <View style={styles.rulesScreen}>
              <Text style={styles.rulesTitle}>How to Play Depic!</Text>
              <Text style={styles.rulesText}>
                Depic is an app version of the classic ABC game! {"\n\n"}
                The goal is to find an object that begins with the same letter shown on the screen and take a picture of it!{"\n\n"}
                If you capture the correct items, you will get points and move on to the next letter!
                If not, you will need to try again! You can also use the "Skip" button up to three times per game for any letters you get stuck on.{"\n\n"}
                Once you make it through all the letters of the alphabet, you win!
              </Text>
            </View>
            </ImageBackground>
          );
     }
 }