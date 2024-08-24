import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import PersonalManageScreen from '../screens/PersonalManageScreen';
import BottomTabNavigation from './BottomTabNavigation';
import {COLORS} from '../constants';
import PublicServiceScreen from '../screens/PublicServiceScreen';
import ResearchScreen from '../screens/ResearchScreen';
import HelpScreen from '../screens/HelpScreen';
import DetailBHScreen from '../screens/DetailBHScreen';
import NoticeScreen from '../screens/NoticeScreen';
import ThongTinHuongScreen from '../screens/ThongTinHuongScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          flex: 1,
        },
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'PersonalManage'}}
      />
      <Drawer.Screen
        name="QLCN-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'PersonalManage'}}
      />
      <Drawer.Screen
        name="BHYT-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'BHYT'}}
      />
      <Drawer.Screen
        name="CARD-BHYT-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'CARD-BHYT'}}
      />
      <Drawer.Screen
        name="DVC-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'DVC'}}
      />
      <Drawer.Screen
        name="Search-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'Search'}}
      />
      <Drawer.Screen
        name="Support-D"
        component={BottomTabNavigation}
        initialParams={{nameScreen: 'Support'}}
      />
       <Drawer.Screen
        name="Detail-D"
        component={DetailBHScreen}
      />
       <Drawer.Screen
        name="Notice"
        component={NoticeScreen}
      />
        <Drawer.Screen
        name="Entitle"
        component={ThongTinHuongScreen}
      />
        <Drawer.Screen
        name="ChangePass"
        component={ChangePasswordScreen}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
