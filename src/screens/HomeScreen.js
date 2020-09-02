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
    Text,
    PushNotificationIOS,
    Linking,
} from 'react-native';
import Font, {loadAsync} from 'expo-font';
import * as Permissions from 'expo-permissions';
// Custom imports
import styles from '../common/styles';
import {
    img_camera_permissions,
    img_background,
    img_play,
    img_title,
    img_scores,
    img_rules,
 } from '../common/assets';

 import PopUpModalTemplate from '../components/PopUpModalTemplate';
 import InstructionsModal from '../components/InstructionsModal';
import { Camera } from 'expo-camera';

export default class HomeScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true,
            cameraPermissions: null,
            instructionsModalVisible: false,
        }
        this.onInstructionsModalClose = this.onInstructionsModalClose.bind(this);
    }

    onInstructionsModalClose()
    {
        this.setState({
            instructionsModalVisible: false,
        });
    }
    async componentDidMount()
    {
        this.props.navigation.setOptions
        ({
            headerShown: false,
        });
        
        // load fonts
        await loadAsync({
            "Schramberg": require('../../assets/fonts/SchrambergSans.otf'),
        });

        // check camera permissions
        const { status } = await Permissions.getAsync(Permissions.CAMERA);
        console.log(status)

        this.setState({
            loading: false,
            cameraPermissions: status,
        });
    }

    render()
    {
        console.log(this.state);
        if(this.state.loading){
            return <></>;
        }
        if(this.state.cameraPermissions !== "granted")
        {
            return(
                <View style={{flex: 1, backgroundColor: "#feeda4", alignItems: "center", justifyContent: "center" }}>
                    <Image source={img_camera_permissions} style={{width: "100%", height: "33%", resizeMode: "cover", marginVertical: 30,}} />
                    <Text style={{fontFamily: "Schramberg", fontSize: 22, textAlign: "center", marginVertical: 20,}}>This app requires camera access to play!</Text>
                    <TouchableOpacity
                        onPress={async () => {
                            // first, prompt directly for access
                            const { status } = await Camera.requestPermissionsAsync();
                            if(status === "granted")
                            {
                                this.setState({
                                    cameraPermissions: status,
                                });
                            }
                            // if this fails, send user to settings to enable directly
                            else
                            {
                                await Linking.openURL("app-settings:");
                            }
                        }}
                        style={{
                            backgroundColor: "#ec5b24",
                            borderRadius: 5,
                            borderWidth: 4,
                            borderColor: "black",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 10,
                        }}
                    >
                        <Text style={{fontFamily: "Schramberg", fontSize: 22, textAlign: "center", textAlignVertical: "center"}}>Enable Camera</Text>
                    </TouchableOpacity>
                </View>
            );
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
                            // onPress={() => {this.props.navigation.navigate("Rules");} }
                            onPress={() => {this.setState({instructionsModalVisible: true})} }
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

                {/* MODALS */}
                <PopUpModalTemplate
                    visible={this.state.instructionsModalVisible}
                    modalContent={<InstructionsModal />}
                    onClose={() => this.onInstructionsModalClose()}
                />
		    </View>
        );
    }
}