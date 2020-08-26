import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';
// Custom Imports

export default class PairingModal extends Component
{
    constructor(props)
    {
        /**
         * pairing{}:  
         *  letter - char representing selected letter
         *  word - string representing word found associated with letter
         *  picture - image taken for associated pairing
         */
        super(props);
    }

    render()
    {
        const dimensions = Dimensions.get('window');
        let modalWidth = dimensions.width*0.9;
        let modalHeight = dimensions.height*0.6;
        return(
            <View
                style={{
                    padding: 10,
                    width: modalWidth,
                    height: modalHeight,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:"#feeda4",
                    borderRadius: 20,
                    borderWidth: 4,
                    borderColor: 'black'
                }}
            >
                <Text style={{fontSize: 62, fontFamily: "Schramberg"}}>{this.props.pairing.letter}</Text>
                <Text style={{fontSize: 26, fontFamily: "Schramberg", textAlign: "center",}}>{this.props.pairing.word}</Text>
                <Image source={this.props.pairing.picture} style={{flex: 1, resizeMode: "contain"}}/>
            </View>
        );
    }
}