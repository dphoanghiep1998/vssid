import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserInfo } from '../data/TYPEOBJECT';
import LoginScreen from '../screens/LoginScreen';
import NoticeScreen from '../screens/NoticeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeNavigation from './HomeNavigation';
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const {userInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.name ? (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeNavigation}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false, headerTransparent: true}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false, headerTransparent: true}}
            />
            <Stack.Screen
              name="Notice"
              component={NoticeScreen}
              options={{headerShown: false, headerTransparent: true}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
