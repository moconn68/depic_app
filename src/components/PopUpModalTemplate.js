import React, { Component } from 'react';
import {
    Modal,
    View,
} from 'react-native';
// Custom Imports
import styles from '../common/styles';

export default class PopUpModalTemplate extends Component
{
    constructor(props)
    {
        super(props);
        /** Props:
         * ?visible: boolean - is the modal visible?
         * modalContent: actual content of the modal
         * 
         * not sure about the below:
         * ?exitButton: boolean - should there be an exit button?
         * ?confirmButton: boolean - should there be a confirm button?
         */
    }

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
                    </View>
                </View>
            </Modal>
        );
    }
}
