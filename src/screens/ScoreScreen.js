/**
 * Stores & Shows high scores on a user's device
 * 1st implementation uses simple AsyncStorage
 * if time permits, we will use AWS DB for remote storage, which will allow
 * implementation of global high scores (not just per device)
 */

 // React imports
 import React, { Component } from 'react';
 // React Native imports
 import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
 } from 'react-native';
 // Custom imports
 import styles from '../common/styles';
 import {
    img_home,
    img_highestScorebg,

 } from '../common/assets';

 export default class ScoreScreen extends Component
 {
     constructor(props)
     {
         super(props);
         this.state = {
             scores: null,
         };
     }

     async componentDidMount()
     {
        this.props.navigation.setOptions({
            gestureEnabled: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("Home");
                }}
                >
                <Image source={img_home} style={styles.homeButton} />
              </TouchableOpacity>
            ),
          });
      
        try{
            const highScores = await AsyncStorage.getItem('SCORES');
            if (highScores != null){
                this.setState({scores: JSON.parse(highScores)});
            } else {
            console.log("DEBUG: Retrieval successful but null.");
            }
        } catch(error){
            console.error(`Error retrieving scores: ${error}`);
        }
     }

     render()
     {
        if(this.state.scores != null){
            // default - render high scores
            return(
              <View style={styles.entryScreen}>
                <ImageBackground defaultSource={img_highestScorebg} style={{width: "100%", height: "100%",alignItems: "center"}}>
                <Text style={styles.titleText}>High Scores</Text>
                <FlatList
                  data={this.state.scores}
                  renderItem={ ({ item, index }) => <Text style={styles.scoreRow}>{index+1}. {item.name}{'\t\t\t\t'}{item.score}</Text> }
                  keyExtractor={ (item, index) => index.toString() }
                />
                </ImageBackground>
              </View>
            );
          } else {
            // no scores yet!
            return(
              <View style={styles.entryScreen}>
                 <ImageBackground defaultSource={img_highestScorebg} style={{width: "100%", height: "100%",alignItems: "center"}}>
                <Text style={styles.titleText}>High Scores</Text>
                <Text style={styles.noScores}>There are no scores yet. Play a game and get the first high score!</Text>
                </ImageBackground>
              </View>
            );
          }
     }
 }