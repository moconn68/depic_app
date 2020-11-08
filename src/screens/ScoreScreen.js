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
    Dimensions,
 } from 'react-native';
 // Custom imports

 import ScoreboardEntry from '../components/ScoreboardEntry';

 import styles from '../common/styles';
 import {
    img_home,
    img_highestScorebg,
    img_btnNextPage,
    img_btnPrevPage,
    img_scorebg,
 } from '../common/assets';

 import * as playerInfoUtils from '../utils/PlayerInfoUtils';

 export default class ScoreScreen extends Component
 {
     constructor(props)
     {
        super(props);
        this.state = {
          scores: null,
          pageNumber: 0
        };
     }

     async componentDidMount()
     {
        this.props.navigation.setOptions({
            title: "",
            headerStyle: {
                backgroundColor: "#faf0a7",
                shadowColor: "transparent",
            },
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
       if(this.state.scores != null)
       {
        const dimensions = Dimensions.get("window");
        return(
            <ImageBackground
                source={img_scorebg}
                style={{flex: 1, padding: 20}}
            >
            <View style={{flex: 0}}>
                <FlatList
                    style={{height: dimensions.width + 51,}}
                    data={this.state.scores}
                    renderItem={ ({item, index}) => <ScoreboardEntry rank={index+1} playerIcon={playerInfoUtils.getPlayerIcon(item.player)} score={item.score} />}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    horizontal={false}
                    ref={(ref) => { this.flatListRef = ref; }}
                />
                <Text
                    style={
                        {
                            fontFamily: "Schramberg",
                            fontSize: 22,
                            textAlign: "center",
                        }
                    }
                >
                    {this.state.pageNumber/2+1}/{playerInfoUtils.getNumCharacters()/4}</Text>
                <View
                    style={
                        {
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                        }
                    }
                >
                    <TouchableOpacity
                    onPress={
                        () => {
                            if(this.state.pageNumber > 0){
                                let nextNum = this.state.pageNumber - 2;
                                this.flatListRef.scrollToIndex({animated: false, index: nextNum});
                                this.setState({
                                    pageNumber: nextNum
                                })
                            }
                        }
                    }
                    style={
                        {
                            width: 80,
                            height: 80,
                        }
                    }
                >
                    <Image
                        source={img_btnPrevPage}
                        style={
                            {
                                width: "100%",
                                height: "100%",
                            }
                        }    
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        () => {
                            if(this.state.pageNumber < playerInfoUtils.getNumCharacters()/2-2){
                                let nextNum = this.state.pageNumber + 2;
                                this.flatListRef.scrollToIndex({animated: false, index: nextNum});
                                this.setState({
                                    pageNumber: nextNum
                                })
                            }
                        }
                    }
                    style={
                        {
                            width: 80,
                            height: 80,
                        }
                    }
                >
                    <Image
                        source={img_btnNextPage}
                        style={
                            {
                                width: "100%",
                                height: "100%",
                            }
                        }    
                    />
                </TouchableOpacity>
                </View>
                
            </View>
            </ImageBackground>
           );
         }
         else
         {
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