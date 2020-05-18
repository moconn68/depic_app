/**
 * Project: Depic
 * Description: A mobile game for young children to learn the alphabet and object-word associations
 * Platform(s): Android, iOS
 * Language(s): JavaScript w/ React Native & Expo
 * Author(s): Matthew O'Connell and Jade Huang 
**/
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	Alert,
	AsyncStorage,
	FlatList,
  TextInput,
  ImageBackground,
  Modal,
 } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from "expo-image-manipulator";

// Configuration settings - dev only!
const config = require('./config');

// Load art assets
const img_background = require('./assets/art/home_screen_bg.jpg');
const img_title = require('./assets/art/depic_title.png');
const img_play = require('./assets/art/play_icon.png');
const img_rules = require('./assets/art/instructions_icon.png');
const img_scores = require('./assets/art/scoreboard_icon.png');
const img_skip = require('./assets/art/skip_icon.png');
const img_flip = require('./assets/art/flip_camera.png');
const img_take_pic = require('./assets/art/take_pic_icon.png');
const img_home = require('./assets/art/home_icon.png');
const img_scorebg = require('./assets/art/scoreboard_bg.png')
const img_highestScorebg = require('./assets/art/highestscoreboard_bg.png')

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

const Stack = createStackNavigator();
// App class is essentially a container class for our Stack navigator
export default class App extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<NavigationContainer>
				<Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#EEF4BD",
            },
          }}
        >
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Rules" component={RulesScreen} />
          <Stack.Screen name="ScoreEntry" component={ScoreEntryScreen} />
					<Stack.Screen name="Scores" component={ScoreScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

}

// Class handling logic & rendering of initial screen
class HomeScreen extends Component {
	constructor(props){
		super(props);
	}

  componentDidMount(){
    this.props.navigation.setOptions({
      headerShown: false,
    });
  }


	render(){

		return(
		    <View style={styles.container} >
		    <ImageBackground  defaultSource={img_background}  style={{width:'100%', height:'100%'}}>
		    <View style={styles.container}>
          <Image source={img_title} style={styles.titleImage}/>
					<TouchableOpacity
						onPress={() => {this.props.navigation.navigate("Camera");} }
						>
            <Image source={img_play} style={styles.playButton} />
					</TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate("Rules");} }
            >
            <Image source={img_rules} style={styles.rulesButton} />
          </TouchableOpacity>
					<TouchableOpacity
						onPress={ () => {this.props.navigation.navigate("Scores")} }
						>
            <Image source={img_scores} style={styles.scoresButton} />
					</TouchableOpacity>
		    </View>
		    </ImageBackground>
		    </View>
		);
	}

}

class RulesScreen extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.navigation.setOptions({
      title: "How to Play",
      headerTitleStyle: {
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

  render(){
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


class CameraScreen extends Component {
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

class ScoreEntryScreen extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.navigation.setOptions({
      title: "Congratulations!",
      headerTitleStyle: {
        fontFamily: 'MarkerFelt-Thin',
        fontSize: 28,
      },
      gestureEnabled: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={
            () => {
              Alert.alert(
                "Are you sure you want to exit?",
                "If you quit now, your score will not be saved!",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await AsyncStorage.removeItem("SAVEGAME");
                      this.props.navigation.navigate("Home");
                    },
                  },
                  {
                    text: "No",
                    onPress: () => console.log("no pressed"),
                  },
                ],

              );
            }
          }
        >
        <Image source={img_home} style={styles.homeButton} />
        </TouchableOpacity>
      ),
    });
  }

  async saveNewScore(name, score){
    // Max amount of scores to retain in high scores table
    const entryLimit = 10;
    var scores = JSON.parse(await AsyncStorage.getItem("SCORES"));
    var newScore = {
      name: name,
      score: parseInt(score),
    };

    if(scores == null){
      // case 1: scoreboard is empty - expects an array
	  scores = [newScore];
    } else if(scores.length < entryLimit){
      // case 2: room to add score normally
      for(let i = 0; i < scores.length; i++){
        if(newScore.score > parseInt(scores[i].score)){
          scores.splice(i, 0, newScore);
          break;
        }
        // still should add at end in this case if not yet added already
        if(i == scores.length - 1){
          scores.push(newScore);
          break;
        }
      }
    } else {
      // case 3: only add if > current lowest score
      if(newScore.score > parseInt(scores[scores.length - 1].score)){
        scores.pop();
        // now, repeat steps from case 2
        for(let i = 0; i < scores.length; i++){
          if(newScore.score > parseInt(scores[i].score)){
            scores.splice(i, 0, newScore);
            break;
          }
          // still should add at end in this case if not yet added already
          if(i == scores.length - 1){
            scores.push(newScore);
            break;
          }
        }
      }
    }
    // update scores in AsyncStorage
    await AsyncStorage.setItem("SCORES", JSON.stringify(scores));

  }

  render(){
    return(
      <View style={styles.entryScreen}>
        <ImageBackground defaultSource={img_scorebg} style={{width: "100%", height: "100%"}}>
          <Text style={styles.entryText}>Your Score: {this.props.route.params.score}</Text>
          <TextInput
            style={styles.entryInput}
            maxLength={25}
            placeholder="ENTER YOUR NAME HERE"
            onSubmitEditing={
              async (event) => {
                await this.saveNewScore(event.nativeEvent.text, this.props.route.params.score);
                this.props.navigation.navigate("Scores");
              }
            }
          />
          <Text style={styles.entryText}>Here are the items you found this game:</Text>
          <FlatList
            data={this.props.route.params.foundList}
            renderItem={ ({ item, index }) => <Text style={styles.scoreRow}>{item.letter.toUpperCase()}{'\t\t\t\t'}{item.word}</Text> }
            keyExtractor={item => item.letter}
          />
        </ImageBackground>
      </View>
    );
  }

}

// Stores & Shows high scores on a user's device
// 1st implementation uses simple AsyncStorage
// if time permits, we will use AWS DB for remote storage, which will allow
// implementation of global high scores (not just per device)
class ScoreScreen extends Component {
	constructor(props){
		super(props);
			this.state = {
			scores: null,
	   };
	}

	async componentDidMount(){
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
				console.log("DEBUG: Retrieval successful.");
			} else {
        console.log("DEBUG: Retrieval successful but null.");
      }
		} catch(error){
			console.error(`Error retrieving scores: ${error}`);
		}

	}

	render(){
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
    marginTop: -100,
    marginBottom: 100,
  },
	titleText: {
		fontSize: 42,
		fontWeight: 'bold',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		fontFamily:'Arial Rounded MT Bold',
	},
  playButton: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  rulesButton: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  scoresButton: {
    width: 100,
    height: 100,
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
    fontFamily:'Arial Rounded MT Bold',
    fontSize: 28,
    padding: 20,
    textShadowColor: 'white',
    textShadowOffset: {
      width: -1,
      height: 1,
    },
    textShadowRadius: 2,
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
  }
});
