import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
} from 'react-native';
// Custom imports
import styles from '../common/styles';
import {
    img_incorrectModal,
} from '../common/assets';

export default class IncorrectModal extends Component
{
    render()
    {
        const dimensions = Dimensions.get('window');
        return(
            <View>
                <View style={{padding: 10, backgroundColor: "#feeda4", width: dimensions.width*0.8, height: dimensions.height*0.4, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    <Image source={img_incorrectModal} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                    <Text style={{textAlign: 'center', fontFamily: "Schramberg", fontSize: 20, marginBottom: 10,}}>Sorry, Try Again</Text>
                </View>
            </View>
        );
    }
}