/**
 * Component pertaining to the main game screen
 * Contains the logic for photo capture, API communication, and gamestate flow
 * TODO - lint code
 * TODO - consider refactoring out some functionality to other classes to reduce file size & complexity
 */

 // React imports
 import React, { Component } from 'react';
 // React Native imports
 import {
    View,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ActivityIndicator,
    Alert,
 } from 'react-native';
 // Expo imports
 import { Camera } from 'expo-camera';
 import * as ImageManipulator from 'expo-image-manipulator'; 
 // Custom imports
 import styles from '../common/styles';
 import {
    img_home,
    img_skip,
    img_take_pic,
    img_flip,
    
 } from '../common/assets';

// Configuration settings - dev only!
const config = require('../../config');
 // Initialize Clarifai API connection - place your key in a config.js file
const Clarifai = require('clarifai');
const CLARIFAI_KEY = config.clarifai.key;
const detector = new Clarifai.App({
	apiKey: CLARIFAI_KEY,
});
// List of predictions we ignore because they are irrelevant or produce
// unexpected results
const predIgnores = [
  "no person",
  "abstract",
  "dof",
];
 
 export default class CameraScreen extends Component
 {
    constructor(props){
		super(props);
		this.state = {
			hasPermission: null,
			// Back-view camera
			type: Camera.Constants.Type.back,
			loading: false,
      gameData: {
        // must be lowercase
        currentLetter: 'a',
        score: 0,
        numSkips: 3,
        // array of letter-word pairs
        // used to show all of the objects that players correctly identified
        // Structure of pairings:
        // {
        //  letter: "x",
        //  word: "word",
        // }
        foundList: [],
      },
		};
	}

	async componentDidMount(){
    // Request camera access permissions
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({
      hasPermission: status === 'granted',
    });
    // Retrieve saved game data, if any
    const gameData = JSON.parse(await AsyncStorage.getItem("SAVEGAME"));
    if(gameData != null){
      this.setState({gameData: gameData});
      await AsyncStorage.removeItem("SAVEGAME");
    }
    // Set navigation options
    this.props.navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });

	}

	async objectDetection(image64){
		// Timing the execution - dev only
		var start = new Date().getTime();
		var response = await detector.models.predict(Clarifai.GENERAL_MODEL,  {base64: image64});
		let preds = [];
    // degree of tolerance for predictions
    // i.e. API call returns 20 results; store only the top ${tolerance} results
    var tolerance = 10;
    // tolerance must always be <= # of responses (by default this is 20)
    // this is a catch in case the API changes and returns a different #
    if(tolerance > response.outputs[0].data.concepts.length){
      tolerance = response.outputs[0].data.concepts.length;
    }
		for(let i = 0; i < response.outputs[0].data.concepts.length; i++){
      // if we've already used up our desired level of tolerance, don't use any
      // more predictions
      if(tolerance == 0){
        break;
      }
			// by default the response is sorted from greatest to least confidence
      // only add the prediction if it is not marked as ignored/erroneous
      if(!predIgnores.includes(response.outputs[0].data.concepts[i].name)){
        preds.push(response.outputs[0].data.concepts[i].name);
        tolerance = tolerance - 1;
      }
		}
		this.setState({loading: false});
		var end = new Date().getTime();
		console.log(`Execution time: ${end-start}`);
		return preds;
	}

	async takePicture(){
		if(this.camera){
      const photo = await this.camera.takePictureAsync();
      return photo;
		} else {
      Alert.alert("Could not access camera! Make sure to give Depic camera permissions in Settings!");
    }
	}

	render(){

		if(this.state.hasPermission){
			return(
        <>
          <View style={styles.scoreBoard2}>
            <TouchableOpacity
              onPress = {
                () => {
                  Alert.alert(
                    "Quit Game",
                    "Choose one option:",
                    [
                      {
                        text: "Keep Playing",
                        // Do nothing
                      },
                      {
                        text: "Quit and Save Progress",
                        onPress: async () => {
                          const gameData = JSON.stringify(this.state.gameData);
                          await AsyncStorage.setItem("SAVEGAME", gameData);
                          Alert.alert("Game saved successfully.");
                          this.props.navigation.goBack();
                        },
                      },
                      {
                        text: "End Game Now",
                        onPress: async () => {
                          // Clear saved game data
                          await AsyncStorage.removeItem("SAVEGAME");
                          this.props.navigation.navigate("ScoreEntry", {score: this.state.gameData.score, foundList: this.state.gameData.foundList})
                        },
                      },
                    ],
                  );
                }
              }
              >
              <Image source={img_home} style={styles.homeButton, {width: 70, height: 70, marginRight: 40,}} />
            </TouchableOpacity>
            <Text style={styles.cameraScoreBoardText}>{this.state.gameData.currentLetter}</Text>
            <Text style={styles.cameraScoreBoardScoreText}>{this.state.gameData.score}</Text>
          </View>
          <View style={{
            position: 'absolute',
            flexDirection: 'row',
            zIndex: 1,
            top: "23%",
            left: "33%",
          }}>
            <Image source={img_skip} style={{
              width: 35,
              height: 35,
              opacity: this.state.gameData.numSkips >= 1? 1 : 0,
              marginLeft: 5,
              marginRight: 5,
            }} />
            <Image source={img_skip} style={{
              width: 35,
              height: 35,
              opacity: this.state.gameData.numSkips >= 2? 1 : 0,
              marginLeft: 5,
              marginRight: 5,
            }} />
            <Image source={img_skip} style={{
              width: 35,
              height: 35,
              opacity: this.state.gameData.numSkips >= 3? 1 : 0,
              marginLeft: 5,
              marginRight: 5,
            }} />
          </View>
          <View style={{position: 'absolute',
                          top: "47%",
                          left: "47%",
                          zIndex: 1,
                          backgroundColor: this.state.loading ? "#EEF4BD" : "rgba(0,0,0,0)",
                          borderRadius: 10,
                        }}>
            <ActivityIndicator size="large" color="black" animating={this.state.loading} />
          </View>
				    <View style={{ flex: 1 }}>
				      <Camera style={{ flex: 1 }} type={this.state.type}
								ref={ref =>{
										this.camera = ref;
									}
								}
							>
				        <View
				          style={{
				            flex: 1,
				            backgroundColor: 'transparent',
				            flexDirection: 'row',
				          }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    disabled={this.state.loading}
                    onPress={
                      () => {
                        this.setState({
                          type: this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        });
                      }
                    }
                    >
                    <Image source={img_flip} style={styles.flipButton} />
                  </TouchableOpacity>
									<TouchableOpacity
										style={{
											flex: 1,
											alignSelf: 'flex-end',
											alignItems: 'center',
										}}
                    disabled={this.state.loading}
										onPress={async () => {
                      this.setState({loading: true});
                        const image = await this.takePicture();
                        // Need to use ImageManipulator to resize image for two reasons:
                        // 1. Clarifai needs 300x300 image for opimal speed & accuracy balance
                        // 2. Expo Camera API has unresolved bug where specifying image size
                        // does not actually change size of the captured image
                        const imageResized = await ImageManipulator.manipulateAsync(
                          image.uri,
                          [
                            {
                              resize: {
                                width: 300,
                                height: 300,
                              }
                            },
                          ],
                          {
                            base64: true
                          }
                        );
                        const imgBase64 = imageResized.base64;
												const predictions = await this.objectDetection(imgBase64);
												let found = false;
												for(let i = 0; i < predictions.length; ++i){
													if(predictions[i][0] == this.state.gameData.currentLetter){
														found = true;
                            var upperCasedWord = predictions[i].charAt(0).toUpperCase() + predictions[i].slice(1);
														Alert.alert(`You got it! Found word: ${upperCasedWord}`);
                            var dataTemp = this.state.gameData;
                            dataTemp.score = dataTemp.score + 100;
                            this.setState({gameData: dataTemp});
                            let currentCharCode = dataTemp.currentLetter.charCodeAt(0);
                            // Create letter-word pairing for identified object
                            let foundPair = {
                              letter: dataTemp.currentLetter,
                              word: upperCasedWord,
                            };
                            dataTemp.foundList.push(foundPair);
                            if (currentCharCode < 122){
                              // we have not yet hit 'z' (charCode 122); continue the game
                              var nextLetter = String.fromCharCode(currentCharCode + 1);
                              dataTemp.currentLetter = nextLetter;
                              this.setState({
                                gameData: dataTemp,
                              });
                            } else {
                              this.setState(
                                {
                                  gameData: dataTemp,
                                },
                                this.props.navigation.navigate("ScoreEntry", {score: dataTemp.score, foundList: dataTemp.foundList})
                              );
                            }
														break;
													}
												}
												if(!found){
													Alert.alert(`Sorry, we didn't find anything beginning with the letter ${this.state.gameData.currentLetter}. Try again!`);
												}
                        // Save game state after each relevant update
                        await AsyncStorage.setItem("SAVEGAME", JSON.stringify(this.state.gameData))
										}}>
                    <Image source={img_take_pic} style={styles.takePicButton} />
									</TouchableOpacity>
                  <TouchableOpacity
                  disabled={this.state.loading}
				            style={{
				              flex: 1,
				              alignSelf: 'flex-end',
				              alignItems: 'center',
				            }}
				            onPress={async () => {
                        if(this.state.gameData.numSkips == 0){
                          Alert.alert("You are out of skips!");
                        } else {
                          let currentCharCode = this.state.gameData.currentLetter.charCodeAt(0);
                          if (currentCharCode < 122){
                            // we have not yet hit 'z' (charCode 122); continue the game
                            var nextLetter = String.fromCharCode(currentCharCode + 1);
                            var dataTemp = this.state.gameData;
                            dataTemp.currentLetter = nextLetter;
                            dataTemp.numSkips = dataTemp.numSkips - 1;
                            this.setState({
                              gameData: dataTemp,
                            });
                          } else {
                            // we've completed the alphabet; exit game
                            this.props.navigation.navigate("ScoreEntry", {score: this.state.gameData.score, foundList: this.state.gameData.foundList});
                          }
                        }
                        // Save game state after each relevant update
                        await AsyncStorage.setItem("SAVEGAME", JSON.stringify(this.state.gameData))
				            }}>
                    <Image source={img_skip} style={styles.skipButton} />
				          </TouchableOpacity>
				        </View>
				      </Camera>
				    </View>

          </>
			);
		}
		else{
			return(
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Text>Cannot access camera. Please make sure you have given Depic permission to access your phone's camera.</Text>
				</View>
			);
		}

	}

 }