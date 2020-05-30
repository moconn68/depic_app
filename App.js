/**
 * Project: Depic
 * Description: A mobile game for young children to learn the alphabet and object-word associations
 * Platform(s): Android, iOS
 * Language(s): JavaScript w/ React Native & Expo
 * Author(s): Matthew O'Connell and Jade Huang 
**/

// React Native imports
import React, { Component } from 'react';
// Custom file imports
import HomeStackNavigator from "./src/navigation/HomeStackNavigator";


export default class App extends Component
{
  render()
  {
    return <HomeStackNavigator />
  }
}

