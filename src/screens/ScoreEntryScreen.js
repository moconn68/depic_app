/**
 * Screen handling game results overview and score entry
 */

// React imports
import React, { Component } from "react";
// React Native imports
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    ImageBackground,
    Image,
    AsyncStorage,
} from 'react-native';
// Custom imports
import styles from '../common/styles';
import {
    img_home,
    img_scorebg,
} from '../common/assets';
import FoundGrid from '../components/FoundGrid';

 export default class ScoreEntryScreen extends Component
 {
    componentDidMount()
    {
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
    async saveNewScore(name, score)
    {
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
    render()
    {
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
                <FoundGrid pairings={this.props.route.params.foundList} />
              </ImageBackground>
            </View>
          );
    }
 }