import React,  { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
// custom imports
import {
    gif_loading
} from '../common/assets';

export default class LoadingModal extends Component
{
    render()
    {
        const dimensions = Dimensions.get('window');
        let modalWidth = dimensions.width*0.5;
        // let modalHeight = dimensions.height*0.5;
        let modalHeight = modalWidth;
        return(
            <View style={{backgroundColor: "#fdeba3", width: modalWidth, height: modalHeight, borderRadius: 20, borderColor: 'black', borderWidth: 4, padding:10}}>
                <Image source={gif_loading} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                <Text style={{fontFamily: "Schramberg", textAlign: "center"}}>Loading...</Text>
            </View>
        );
    }
}