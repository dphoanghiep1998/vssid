import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerNavigation from './DrawerNavigation';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        options={{
          headerShown: false,
        }}
        component={DrawerNavigation}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
