import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
} from 'react-native';

import {
    img_playerSelectBg,
    img_home,
    img_btnNextPage,
    img_btnPrevPage,
    player_icons,
    // img_p1,
    // img_p2,
    // img_p3,
    // img_p4,
    // img_p5,
    // img_p6,
    // img_p7,
    // img_p8,
    // img_p9,
    // img_p10,
    // img_p11,
    // img_p12,
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

export default class PlayerSelector extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            pageNumber: 0,
        }
    }

    render()
    {
        const dimensions = Dimensions.get("window");
        return(
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
                    style={{height: dimensions.width}}
                    data={PLAYERS}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity
                                style={
                                    {
                                        width: dimensions.width/2,
                                        height: dimensions.width/2,
                                    }
                                }
                                onPress = {async () =>
                                    {
                                        // TODO - change this to pass info back to screen, & further pass as param to Camera (game screen)
                                        // await AsyncStorage.setItem("PLAYER", item.name);
                                        this.props.onSelect(item.name);
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
                        )
                    }
                    keyExtractor={item => item.name}
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
                    onPress={() => console.log("back")}
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
        );
    }
}