// React Native imports
import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
// React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Custom screen imports
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import RulesScreen from '../screens/RulesScreen';
import ScoreEntryScreen from '../screens/ScoreEntryScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Stack = createStackNavigator();
/**
 *  [Container class for app's stack navigator] 
 */
export default class HomeStackNavigator extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<NavigationContainer>
				<Stack.Navigator
                    screenOptions=
                    {{
                        headerStyle:
                        {
                            backgroundColor: "#EEF4BD",
                        },
                    }}
                >
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Camera" component={CameraScreen} />
                    <Stack.Screen name="Rules" component={RulesScreen} />
                    <Stack.Screen name="ScoreEntry" component={ScoreEntryScreen} />
					<Stack.Screen name="Scores" component={ScoreScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

}
