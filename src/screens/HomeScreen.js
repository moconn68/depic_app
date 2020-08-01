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
    Button,
    Text,
    Alert,
} from 'react-native';
import Font, {loadAsync} from 'expo-font';
// Custom imports
import styles from '../common/styles';
import { 
    img_background,
    img_play,
    img_title,
    img_scores,
    img_rules,
 } from '../common/assets';
 // Modal test
 import PopUpModalTemplate from '../components/PopUpModalTemplate';
 import IncorrectModal from '../components/IncorrectModal';

export default class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            testModalVisible: false,
        }
        this.onIncorrectModalClose = this.onIncorrectModalClose.bind(this);
    }
    async componentDidMount()
    {
        this.props.navigation.setOptions
        ({
            headerShown: false,
        });
        
        await loadAsync({
            "Schramberg": require('../../assets/fonts/SchrambergSans.otf'),
        });

        this.setState({
            loading: false,
        });
    }

    onIncorrectModalClose()
    {
        this.setState({
            testModalVisible: false,
        })
    }

    render()
    {
        if(this.state.loading){
            return <></>;
        }
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
                        <TouchableOpacity
                            onPress={() => this.setState({testModalVisible: true})}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                borderColor: 'black',
                                borderWidth: 4,

                            }}
                        >
                            <Text style={{fontSize: 28, padding: 5,}}>Modal Test</Text>
                        </TouchableOpacity>
                        <PopUpModalTemplate
                            visible={this.state.testModalVisible}
                            onClose={this.onIncorrectModalClose}
                            onConfirm={() => {Alert.alert("Confirmed!");
                                this.onIncorrectModalClose();
                        }}
                            modalContent={<IncorrectModal/>}
                        />
                    </View>
                </ImageBackground>
		    </View>
        );
    }
}