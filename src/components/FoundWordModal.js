import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Text,
    Dimensions,
} from 'react-native';
// Custom Imports
import {
    img_foundWord,
} from '../common/assets';

export default class FoundWordModal extends Component
{
    constructor(props)
    {
        /**
         * word - string representing word found for corresponding letter
         */
        super(props);
    }
    render()
    {
        const dimensions = Dimensions.get('window');
        let modalWidth = dimensions.width*0.8;
        let modalHeight = dimensions.height*0.6;
        return(
            <View>
                <View style={{backgroundColor: "#feeda4", width: modalWidth, height: modalHeight, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    <ImageBackground
                        source={img_foundWord}
                        resizeMode="contain"
                        style={{justifyContent: "space-between", width: modalWidth-20, height: modalHeight, marginLeft: 10,}}
                    >
                        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{textAlign: 'center', fontFamily: "Schramberg", fontSize: 40, top: modalHeight/2-115, left: 5, width: modalWidth-50}}>{this.props.word}</Text>
                        <Text style={{textAlign: 'center', fontFamily: "Schramberg", fontSize: 20, marginBottom: 10}}>You have found a word!</Text>

                    </ImageBackground>
                </View>
            </View>
        );
    }
}