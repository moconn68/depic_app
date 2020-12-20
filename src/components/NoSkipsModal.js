import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

// AdMob functionality
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';

// Custom Imports
import {
    img_noSkips
} from '../common/assets';

const config = require('../../config');

export default class NoSkipsModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            adRewarded: false
        }
    }

    async componentDidMount()
    {
        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
            this.setState({
                adRewarded: true
            });
        });
        AdMobRewarded.addEventListener('rewardedVideoDidClose', () => {
            if(this.state.adRewarded) {
                // Give user more skips
                this.props.onRewarded();
            }
        });
    }
    async componentWillUnmount()
    {
        AdMobRewarded.removeAllListeners();
    }
    render()
    {
        const dimensions = Dimensions.get('window');
        return(
            <View>
                <View style={{padding: 10, backgroundColor: "#feeda4", width: dimensions.width*0.6, height: dimensions.height*0.3, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    <Image source={img_noSkips} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                    <Text style={{textAlign: 'center', fontFamily: "Schramberg", fontSize: 20, marginBottom: 10,}}>Out Of Skips! Get More?</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#a1cc67",
                            borderRadius: 100,
                            borderColor: "black",
                            borderWidth: 2,
                            justifyContent: "center",
                            height: 40,
                            width: 170,
                            alignSelf: "center"
                        }}
                        onPress={
                            async () => {
                                await AdMobRewarded.setAdUnitID(config.admob.test.REWARDED_VIDEO); // Test ID, Replace with your-admob-unit-id
                                await AdMobRewarded.requestAdAsync();
                                await AdMobRewarded.showAdAsync();
                            }
                        }
                    >
                        <Text style={{textAlign: "center", fontFamily: "Schramberg", fontSize: 20}}>Watch Ad</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}