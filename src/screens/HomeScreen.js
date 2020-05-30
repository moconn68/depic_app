/**
 * HomeScreen.js
 * Component containing the application's home screen
 * Handles navigation to main functional components of app
 */
// React imports
import React, { Component } from 'react';
// React Native imports
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
// Custom imports
import styles from '../common/styles';
import { 
    img_background,
    img_play,
    img_title,
    img_scores,
    img_rules,
 } from '../common/assets';

export default class HomeScreen extends Component
{
    componentDidMount()
    {
        this.props.navigation.setOptions
        ({
            headerShown: false,
        });
    }

    render()
    {
        return(
            <View style={styles.container} >
                <ImageBackground  defaultSource={img_background}  style={{width:'100%', height:'100%'}}>
                    <View style={styles.container}>
                        <Image source={img_title} style={styles.titleImage}/>
                        <TouchableOpacity
                            onPress={() => {this.props.navigation.navigate("Camera");} }
                            >
                            <Image source={img_play} style={styles.playButton} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {this.props.navigation.navigate("Rules");} }
                            >
                            <Image source={img_rules} style={styles.rulesButton} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => {this.props.navigation.navigate("Scores")} }
                            >
                            <Image source={img_scores} style={styles.scoresButton} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
		    </View>
        );
    }
}