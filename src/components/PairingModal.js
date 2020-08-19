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
         * letter - char representing selected letter
         * word - string representing word found associated with letter
         */
        super(props);
    }

    render()
    {
        const dimensions = Dimensions.get('window');
        let modalWidth = dimensions.width*0.8;
        let modalHeight = dimensions.height*0.4;

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
                <Text style={{fontSize: 62, fontFamily: "Schramberg"}}>{this.props.letter}</Text>
                <Text style={{fontSize: 28, fontFamily: "Schramberg", textAlign: "center",}}>{this.props.word}</Text>
            </View>
        );
    }
}