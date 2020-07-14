import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    Text,
    Dimensions,
} from 'react-native';
// Custom imports
import styles from '../common/styles';
import {
    img_incorrectModal,
    img_cancelButton,
} from '../common/assets';

export default class IncorrectModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            width: this.props.width > 0 ? this.props.width : 10,
            height: this.props.height > 0 ? this.props.height : 10,
        }
    }
    render()
    {
        const dimensions = Dimensions.get('window');
        return(
            <View>
                <View style={{backgroundColor: "#feeda4", width: dimensions.width*0.8, height: dimensions.height*0.4, borderRadius: 20, borderColor: 'black', borderWidth: 4,}}>
                    {/* <ImageBackground source={img_incorrectModal} style={{ resizeMode: "auto"}}>
                        <Text style={{fontSize: 28, color: 'red', textAlignVertical: "bottom",}}>Sorry, Try Again?</Text>
                    </ImageBackground> */}
                    {/* <Image source={img_cancelButton} style={{position: "absolute", width: 50, height: 50, right: -25, top: -25}} /> */}
                    <Image source={img_incorrectModal} style={{flex: 1, width: null, height: null, resizeMode: "contain"}} />
                    <Text style={{textAlign: 'center'}}>Sorry, Try Again?</Text>
                </View>
            </View>
        );
    }
}