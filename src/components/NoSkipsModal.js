import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Image,
    Text,
} from 'react-native';
// Custom Imports
import {
    img_noSkips
} from '../common/assets';

export default class NoSkipsModal extends Component
{
    render()
    {
        const dimensions = Dimensions.get('window');
        return(
            <View>
                <View style={{padding: 10, backgroundColor: "#feeda4", width: dimensions.width*0.6, height: dimensions.height*0.3, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    <Image source={img_noSkips} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                    <Text style={{textAlign: 'center', fontFamily: "Schramberg", fontSize: 20, marginBottom: 10,}}>Out Of Skips!</Text>
                </View>
            </View>
        );
    }
}