import {View, Text, Platform, Image, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants';
import PersonalManageScreen from '../screens/PersonalManageScreen';
import PublicServiceScreen from '../screens/PublicServiceScreen';
import ResearchScreen from '../screens/ResearchScreen';
import HelpScreen from '../screens/HelpScreen';
import {images} from '../constants/theme';
import QLCNNavigation from './QLCNNavigation';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({route}) => {
  const {nameScreen} = route.params;
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    label: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
  });
  return (
    <Tab.Navigator
      initialRouteName={nameScreen ? nameScreen : null}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-Regular',
          fontWeight: '400',
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: 24,
          height: 80,
          paddingHorizontal:8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.n4,
      }}>
      <Tab.Screen
        name="PersonalManage"
        component={QLCNNavigation}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.label, {color: color}]}>
              {t('personalInfoLow')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={images.qlcn}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DVC"
        component={PublicServiceScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.label, {color: color}]}>
              {t('publicServiceLow')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={images.dichvucong}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={ResearchScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.label, {color: color}]}>
              {t('searchLow')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={images.search_world}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Support"
        component={HelpScreen}
        options={{
          tabBarLabel: ({color}) => (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.label, {color: color}]}>
              {t('supportLow')}
            </Text>
          ),
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 30, width: 30, tintColor: color}}
              source={images.support}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
