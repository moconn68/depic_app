import React, { Component } from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
// Custom Imports
import styles from '../common/styles';
import {
    img_incorrectModal,
    img_cancelModal,
    img_confirmModal,
} from '../common/assets';

export default class PopUpModalTemplate extends Component
{
    constructor(props)
    {
        super(props);
        /** Props:
         * ?visible: boolean - is the modal visible?
         * modalContent: actual content of the modal
         * onClose: method called when close button pressed
         * onConfirm: method called when confirm button pressed
         */

        // this.onClose = this.onClose.bind(this);
    }

    // onClose()
    // {
    // }

    render()
    {
        return(
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={this.props.visible}
            >
                <View style={styles.popUpModalOuter}>
                    <View>
                        {this.props.modalContent}
                        {this.props.onClose ? 
                            <TouchableOpacity
                                style={{position: "absolute", width: 50, height: 50, right: -25, top: -25}}
                                onPress={this.props.onClose}
                            >
                                <Image source={img_cancelModal} style={{position: "absolute", width: 50, height: 50}} />
                            </TouchableOpacity> 
                             : null    
                        }
                        {this.props.onConfirm ? 
                            <TouchableOpacity
                                style={{position: "absolute", width: 50, height: 50, left: -25, top: -25}}
                                onPress={this.props.onConfirm}
                            >
                                <Image source={img_confirmModal} style={{position: "absolute", width: 50, height: 50}} />
                            </TouchableOpacity>
                            : null
                        }

                    </View>
                </View>
            </Modal>
        );
    }
}
