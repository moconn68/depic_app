import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
// custom imports
import styles from '../common/styles';
import {
    img_quitGame,
    img_keepPlaying,
    img_saveGame,
} from '../common/assets';

export default class QuitGameModal extends Component
{

    constructor(props)
    {
        /**
         * onSaveAndQuit() - function handling save and quit
         * onEndGame() - function handling ending game early
         * onKeepPlaying() - function handling game resume
         */
        super(props);
    }

    render()
    {
        const dimensions = Dimensions.get('window');
        return(
            <View>
                <View style={{padding: 10, flexDirection: "column", backgroundColor: "#feeda4", width: dimensions.width*0.8, height: dimensions.height*0.4, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    <View style={{flexDirection:"row", flex: 0.6, marginTop: 30,}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={this.props.onSaveAndQuit}
                        >
                            <Image source={img_saveGame} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{flex: 1}}
                            onPress={this.props.onEndGame}
                        >
                            <Image source={img_quitGame} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{flex: 0.35, marginBottom: 10,}}
                        onPress={this.props.onKeepPlaying}
                    >
                        <Image source={img_keepPlaying} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}