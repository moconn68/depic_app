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
    player_icons,
    img_btnNextPage,
    img_btnPrevPage,
    img_scorebg,
 } from '../common/assets';

 const PLAYERS = [
  {
      name: "p1",
      icon: player_icons.p1,
  },
  {
      name: "p2",
      icon: player_icons.p2,
  },
  {
      name: "p3",
      icon: player_icons.p3,
  },
  {
      name: "p4",
      icon: player_icons.p4,
  },
  {
      name: "p5",
      icon: player_icons.p5,
  },
  {
      name: "p6",
      icon: player_icons.p6,
  },
  {
      name: "p7",
      icon: player_icons.p7,
  },
  {
      name: "p8",
      icon: player_icons.p8,
  },
  {
      name: "p9",
      icon: player_icons.p9,
  },
  {
      name: "p10",
      icon: player_icons.p10,
  },
  {
      name: "p11",
      icon: player_icons.p11,
  },
  {
      name: "p12",
      icon: player_icons.p12,
  },
  
];

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

     getPlayerIcon(playerName)
     {
       for(let player of PLAYERS)
       {
         if(player.name == playerName)
         {
           return player.icon;
         }
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
                style={{flex: 1}}
            >
            <View style={{flex: 0}}>
                {/* <ScrollView
                    horizontal={true}
                >
                    {
                        PLAYERS.map((item) => {
                            return <TouchableOpacity
                            style={
                                {
                                    width: dimensions.width/2,
                                    height: dimensions.width/2,
                                }
                            }
                            onPress = {async () =>
                                {
                                    await AsyncStorage.setItem("PLAYER", item.name);
                                    this.props.onSelect();
                                }
                            }
                        >
                            <Image
                                source={item.icon} 
                                style={
                                    {
                                        width: "100%",
                                        height: "100%",
                                    }
                                }
                            />
                        </TouchableOpacity>
                        })
                    }
                </ScrollView> */}
                <FlatList
                    style={{height: dimensions.width + 50}}
                    data={this.state.scores}
                    renderItem={ ({item, index}) => <ScoreboardEntry rank={index+1} playerIcon={this.getPlayerIcon(item.player)} score={item.score}/>}
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
                    {this.state.pageNumber/2+1}/{PLAYERS.length/4}</Text>
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
                                // this.flatListRef.scrollToOffset({animated: true, offset: 0})
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
                            if(this.state.pageNumber < PLAYERS.length/2-2){
                                let nextNum = this.state.pageNumber + 2;
                                this.flatListRef.scrollToIndex({animated: false, index: nextNum});
                                // this.flatListRef.scrollToOffset({animated: true, offset: 0})
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
         








    //  render()
    //  {
    //     if(this.state.scores != null){
    //         // default - render high scores
    //         // return(
    //         //   <View style={styles.entryScreen}>
    //         //     <ImageBackground defaultSource={img_highestScorebg} style={{width: "100%", height: "100%",alignItems: "center"}}>
    //         //     <Text style={styles.titleText}>High Scores</Text>
    //         //     <FlatList
    //         //       data={this.state.scores}
    //         //       renderItem={ ({ item, index }) => <Text style={styles.scoreRow}>{index+1}. {item.name}{'\t\t\t\t'}{item.score}</Text> }
    //         //       keyExtractor={ (item, index) => index.toString() }
    //         //     />
    //         //     </ImageBackground>
    //         //   </View>
    //         // );
    //           const dims = Dimensions.get('window');
    //           console.log(dims);
    //           return(
    //           <ImageBackground
    //             source={img_highestScorebg}
    //             style={
    //               {
    //                 // width: "100%",
    //                 // height: "100%",
    //                 flex: 1,
    //               }
    //             }
    //           >
    //             <Text
    //               style={styles.titleText}
    //             >
    //               High Scores
    //             </Text>
    //             <View
    //               style={
    //                 {
    //                   // flex: 0.5,
    //                   height: dims.height/2 + 20,
    //                 }
    //               }
    //             >
    //             <FlatList
    //               data={this.state.scores}
                  // renderItem={ ({item, index}) => <ScoreboardEntry rank={index+1} playerIcon={this.getPlayerIcon(item.player)} score={item.score}/>}
    //               keyExtractor={ (item, index) => index.toString() }
    //               numColumns={2}
    //               horizontal={false}
    //               scrollEnabled={false}
    //               ref={(ref) => { this.flatListRef = ref; }}

    //             />
    //             </View>

    //           </ImageBackground>
    //           );
    //       } else {
            // // no scores yet!
            // return(
            //   <View style={styles.entryScreen}>
            //      <ImageBackground defaultSource={img_highestScorebg} style={{width: "100%", height: "100%",alignItems: "center"}}>
            //     <Text style={styles.titleText}>High Scores</Text>
            //     <Text style={styles.noScores}>There are no scores yet. Play a game and get the first high score!</Text>
            //     </ImageBackground>
            //   </View>
            // );
    //       }
    //  }
 }