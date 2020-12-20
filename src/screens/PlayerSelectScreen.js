import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

// AdMob
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

import PlayerSelector from '../components/PlayerSelector';

import {
    img_playerSelectBg,
    img_home,
    img_p1,
    img_p2,
    img_p3,
    img_p4,
    img_p5,
    img_p6,
    img_p7,
    img_p8,
    img_p9,
    img_p10,
    img_p11,
    img_p12,
} from '../common/assets';
import styles from '../common/styles';

const config = require('../../config');

export default class PlayerSelectScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.onPlayerSelect = this.onPlayerSelect.bind(this);
    }

    onPlayerSelect(playerName)
    {
        this.props.navigation.navigate("Camera", {
            player: playerName,
        });
    }

    async componentDidMount()
    {
        // Set navigation options
        this.props.navigation.setOptions({
            headerShown: false,
            gestureEnabled: false,
        });
    }

    render()
    {
        return(
            <>
            <ImageBackground
                source={img_playerSelectBg}
                resizeMode="cover"
                style={
                    {
                        flex: 1
                    }
                }
            >
                <TouchableOpacity
                    style={
                        [
                            styles.homeButton, 
                            {
                                marginTop: 45,
                            },
                        ]
                    }
                    onPress={ () => this.props.navigation.navigate("Home")}
                >
                    <Image
                        source={img_home}
                        style={
                            {
                                width: "100%",
                                height: "100%",

                            }
                        }
                    />
                </TouchableOpacity>
                <Text style={{fontFamily: "Schramberg", fontSize: 22, textAlign: "center", paddingVertical: 20}}>Select Your Character</Text>
                <PlayerSelector 
                    onSelect={this.onPlayerSelect}
                />

            </ImageBackground>
            <AdMobBanner
                adUnitID={config.admob.test.BANNER} // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={this.bannerError}
            />
            </>
        );
    }
}