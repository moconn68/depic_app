import React, { Component } from 'react';
import {
    View,
    Modal,
    Text,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';
// Custom imports
import {
    img_quitEntry
} from '../common/assets';

export default class QuitEntryModal extends Component
{
    constructor(props)
    {
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
                }}>

                <Image
                    source={img_quitEntry}
                    width={modalWidth}
                    height={modalHeight}
                    style={{
                        resizeMode: "contain",
                        flex: 1,  
                    }}
                >
                </Image>
                <Text style={{fontSize:24, fontFamily:"Schramberg", textAlign: "center"}}>Are you sure you want to exit?{"\n"}If you quit now, your score will not be saved!</Text>

            </View>
        )
    }
}