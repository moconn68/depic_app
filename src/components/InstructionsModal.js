import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
} from 'react-native';
// Custom Imports
import {
    gif_instructions,
} from '../common/assets';

export default class InstructionsModal extends Component
{
    render()
    {
        const dimensions = Dimensions.get('window');
        let modalWidth = dimensions.width*0.8;
        let modalHeight = dimensions.height*0.5;
        return(
            <View style={{backgroundColor: "#feeda4", width: modalWidth, height: modalHeight, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                <Image source={gif_instructions} style={{width: "100%", height: "100%", resizeMode: "contain"}} />
            </View>
        );
    }
}