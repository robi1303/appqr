import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/component/HomeScreen';
import ScanScreen from './src/component/ScanScreen';
import { NavigationContainer } from '@react-navigation/native';
import GenerateQRScreen from './src/component/GenerateQRScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import { useState } from 'react';
import editScreen from './src/component/editScreen';
import detail from './src/component/detail';
import Splash from './src/component/splash';

const Stack = createStackNavigator();
const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
        <Stack.Screen name="editScreen" component={editScreen} />
        <Stack.Screen name="detail" component={detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({})




