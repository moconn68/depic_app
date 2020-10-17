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
    TextInput,
    ImageBackground,
    Image,
    AsyncStorage,
} from 'react-native';
// Custom imports
import FoundGrid from '../components/FoundGrid';
import PopUpModalTemplate from '../components/PopUpModalTemplate';
import QuitEntryModal from '../components/QuitEntryModal';
import PairingModal from '../components/PairingModal';

import styles from '../common/styles';
import {
    img_home,
    img_scorebg,
} from '../common/assets';

 export default class ScoreEntryScreen extends Component
 {

    constructor(props)
    {
        super(props);
        this.state = {
            quitEntryModalVisible: false,
            pairingModalVisible: false,
            currentPair: null,
        };
        this.onQuitEntryModalClose = this.onQuitEntryModalClose.bind(this);
        this.onQuitEntryModalConfirm = this.onQuitEntryModalConfirm.bind(this);

        this.showPairingModal = this.showPairingModal.bind(this);
        this.onPairingModalClose = this.onPairingModalClose.bind(this);

        this.updateSelectedPairing = this.updateSelectedPairing.bind(this);
        
    }
    onQuitEntryModalClose()
    {
        this.setState({
            quitEntryModalVisible: false,
        });
    }

    async onQuitEntryModalConfirm()
    {
        this.setState({
            quitEntryModalVisible: false,
        });
        await AsyncStorage.removeItem("SAVEGAME");
        this.props.navigation.navigate("Home");
    }

    showPairingModal()
    {

    }

    onPairingModalClose()
    {
        this.setState({
            pairingModalVisible: false,
        });
    }

    updateSelectedPairing(letter, word, picture)
    {
        this.setState({
            currentPair: {
                letter: letter,
                word: word,
                picture: picture
            },
            pairingModalVisible: true,
        });
    }

    async componentDidMount()
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
                        // () => this.setState({
                        //     quitEntryModalVisible: true,
                        // })
                        () => this.props.navigation.navigate("Scores")
                    }
                    >
                    <Image source={img_home} style={styles.homeButton} />
                </TouchableOpacity>
            ),
            });
            this.saveNewScore(this.props.route.params.player, this.props.route.params.score);
            AsyncStorage.removeItem("SAVEGAME");
    }
    async saveNewScore(playerName, score)
    {
        // Max amount of scores to retain in high scores table
        const entryLimit = 10;
        var scores = JSON.parse(await AsyncStorage.getItem("SCORES"));
        var newScore = {
            player: playerName,
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
                {/* <TextInput
                  style={styles.entryInput}
                  maxLength={25}
                  placeholder="ENTER YOUR NAME HERE"
                  onSubmitEditing={
                    async (event) => {
                      await this.saveNewScore(event.nativeEvent.text, this.props.route.params.score);
                      this.props.navigation.navigate("Scores");
                    }
                  }
                /> */}
                <Text style={styles.entryText}>Press and hold to see what you found:</Text>
                <FoundGrid
                    pairings={this.props.route.params.foundList}
                    updateSelectedPairing={this.updateSelectedPairing}
                    closePairingModal={this.onPairingModalClose}
                />
              </ImageBackground>
              {/* Modals */}
              <PopUpModalTemplate
                    visible={this.state.quitEntryModalVisible}
                    onClose={this.onQuitEntryModalClose}
                    onConfirm={this.onQuitEntryModalConfirm}
                    modalContent={<QuitEntryModal />}
              />

                <PopUpModalTemplate
                    visible={this.state.pairingModalVisible}
                    // onClose={this.onPairingModalClose}
                    modalContent={<PairingModal pairing={this.state.currentPair} />}
                />
            </View>
          );
    }
 }