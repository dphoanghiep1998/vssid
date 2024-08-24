import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PersonalManageScreen from '../screens/PersonalManageScreen';
import TabNavigation from './TabNavigation';
import TheBhytScreen from '../screens/TheBhytScreen';

const Stack = createStackNavigator();
const QLCNNavigation = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName='QLCN' screenOptions={{headerShown:false}}>
      <Stack.Screen name="QLCN" component={PersonalManageScreen} />
      <Stack.Screen name="TabNav" component={TabNavigation} />
      <Stack.Screen name="CARD-BHYT" component={TheBhytScreen} />
    </Stack.Navigator>
  );
};

export default QLCNNavigation;
