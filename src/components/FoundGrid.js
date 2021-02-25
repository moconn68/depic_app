/**
 * Component for creating and rendering grid of letter-word pairings found throughout the game
 * 5x5+1 grid for displaying all 26 letters of the alphabet
 * If found, letter is colored and when touched shows letter-word pairing
 * If letter was skipped or not reached, it is greyed out and unable to be pressed
 */

 // React imports
 import React, { Component } from 'react';
 // React native imports
 import {
     View,
     Text,
     Image,
     FlatList,
     TouchableOpacity,
     Alert,
 } from 'react-native';
// Custom imports
import styles from '../common/styles';
import { img_letters } from '../common/assets';


export default class FoundGrid extends Component
{
    /**
     * 
     * @param {Object} props
     * @param {Object[]} props.pairings - Pairings of found letters and words,k and associated picture
     * Pairing format:
     * {
     *    letter: "x",
     *    word: "word",
     *    picture: reference to image
     * } 
     * @param {Function} updateSelectedPairing: function which tracks player-selected letter-word pairing for modal display
     * @param {Function} closePairingModal: hides the modal
     */
    constructor(props)
    {

        super(props);
        this.state = {
            gridDimensions: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        };

    }


    wasLetterFound(letter)
    {
        var ret = false;
        for(let pairing of this.props.pairings)
        {
            if(pairing.letter == letter)
            {
                ret = true;
                break;
            }
        }
        return ret;
    }

    render()
    {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
        return(
            <View style={{flex: 1, justifyContent: "space-evenly", width: "100%"}}
                onLayout={(event) =>
                    {
                        // Gets dimensions of the component for the case of different sized displays
                        const {x, y, width, height} = event.nativeEvent.layout;
                        this.setState({
                            gridDimensions: {
                                x: x,
                                y: y,
                                width: width,
                                height: height,
                            },
                        });
                    }
                }
            >
                <FlatList
                    style={styles.foundGridFlatList}
                    numColumns={5}
                    scrollEnabled={false}
                    data={alphabet}
                    renderItem={
                        ({ item }) => <FoundGridItem
                                        letter={item}
                                        pairing=
                                        {
                                            // note - this will be null if letter was not found
                                            this.props.pairings[this.props.pairings.map
                                            (
                                                (pairing) => {
                                                    return pairing.letter;
                                                }
                                            ).indexOf(item)]
                                        }
                                        viewDimensions={this.state.gridDimensions}
                                        letterFound={this.wasLetterFound(item)}
                                        updateSelectedPairing={this.props.updateSelectedPairing}
                                        closePairingModal={this.props.closePairingModal}
                                      />
                    }
                    keyExtractor={item => item}

                />
            </View>
        );
    }
}

class FoundGridItem extends Component
{
    constructor(props)
    {
        super(props);
        this.displayPairing = this.displayPairing.bind(this);
    }

    displayPairing()
    {
        // TODO - replace with modal!
        Alert.alert
        (
            "Letter: " + this.props.pairing.letter.toUpperCase() + "\n"
            + "Word: " + this.props.pairing.word
        );
    }

    render()
    {
        return(
            <TouchableOpacity
                // onPress={this.displayPairing}
                onPressIn={() => this.props.updateSelectedPairing(this.props.pairing.letter.toUpperCase(), this.props.pairing.word, this.props.pairing.picture)}
                onPressOut={
                    () => {
                        this.props.closePairingModal();
                    }
                }
                pressRetentionOffset={
                    {
                        bottom: 150,
                        top: 150,
                        left: 150,
                        right: 150,
                    }
                }
                disabled={!this.props.letterFound}
                >
                <Image
                    source={img_letters["img_" + this.props.letter]}
                    style={
                        [
                            (this.props.letterFound ? styles.foundLettersActive : styles.foundLettersInactive),
                            {

                                width: Math.round(this.props.viewDimensions.width / 5),
                                height: Math.round(this.props.viewDimensions.height / 7),

                            },
                        ]
                    }
                />
            </TouchableOpacity>
        );
    }
}
              
