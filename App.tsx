/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from './navigations/AppNavigation';
import { AuthProvider } from './context/AuthContext';




function App(): React.JSX.Element {
  const Drawer = createDrawerNavigator()

  return (
    <AuthProvider>
      <StatusBar backgroundColor={"#06bcee"}/>
      <AppNavigation/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
