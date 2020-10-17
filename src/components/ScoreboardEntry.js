import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';

export default class ScoreboardEntry extends Component
{
    constructor(props)
    {
        super(props);
        /**
         * Props:
         * rank - Number
         * playerIcon - image
         * score - Number
         */
    }

    render()
    {
        const dims = Dimensions.get('window');
        // console.log(this.props);
        return(
            <View
                style={
                    {
                        borderRadius: 8,
                        borderColor: "#a9d179",
                        borderWidth: 3,
                        height: dims.height/4,
                        flex: 0.5,
                        margin: 5

                    }
                }
            >
                <View
                    style={
                        {
                            flex: 0.5,
                            flexDirection: "row",
                            backgroundColor: "#feeda4",
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                >
                    <Text style={{fontFamily: "Schramberg", fontSize: 48, flex: 0.5, textAlign: "center"}}>#{this.props.rank}</Text>
                    <Image source={this.props.playerIcon} style={{width: "70%", height: "70%", resizeMode: "contain", flex: 0.5}}/>
                </View>

                <View
                    style={
                        {
                            flex: 0.5,
                            backgroundColor: "#a9d179",
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                >
                    <Text style={{fontFamily: "Schramberg", fontSize: 48, textAlign: "center",}}>{this.props.score}</Text>
                </View>
            </View>
        );
    }
}