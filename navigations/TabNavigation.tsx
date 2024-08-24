import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BHXHScreen from '../screens/BHXHScreen';
import BHTNScreen from '../screens/BHTNScreen';
import BHTNLDScreen from '../screens/BHTNLDScreen';
import BHYTScreen from '../screens/BHYTScreen';
import C14Screen from '../screens/C14Screen';
import {COLORS, images} from '../constants/theme';
import {LinearGradient} from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();
const TabNavigation = ({navigation, route}) => {
  const {initName} = route.params;
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    label: {
      marginTop: 4,
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      textTransform: 'none',
    },
    icon: {
      width: 55,
      height: 55,
    },
  });
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            height: 60,
          }}
          colors={[COLORS.gradient1, COLORS.gradient3]}>
          <TouchableOpacity
            style={{
              zIndex: 10,
              height: 30,
              width: 30,
              marginStart: 10,
            }}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: 'white',
              }}
              source={images.back}
            />
          </TouchableOpacity>
          <Text
            style={{
              zIndex: 1,
              color: 'white',
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              marginStart:-37,
             
            }}>
            {t('participation_record_up')}
          </Text>
        </LinearGradient>
      </SafeAreaView>
      <Tab.Navigator
        initialRouteName={initName ? initName : null}
        screenOptions={{
          tabBarItemStyle: {justifyContent: 'flex-start'},
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.n3,
        }}>
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: {backgroundColor: 'transparent'},
            tabBarLabel: t('social_insurance'),
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: [styles.label],
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={images.bhxh}
              />
            ),
          }}
          name="bhxh"
          component={BHXHScreen}
        />
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: {backgroundColor: 'transparent'},
            tabBarLabel: t('unemployment_insurance'),
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: [styles.label],
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={images.bhnt}
              />
            ),
          }}
          name="bhtn"
          component={BHTNScreen}
        />
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: {backgroundColor: 'transparent'},
            tabBarLabel: t('work_injure'),
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: [styles.label],
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={images.bhntld}
              />
            ),
          }}
          name="bhtnld"
          component={BHTNLDScreen}
        />
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: {backgroundColor: 'transparent'},
            tabBarLabel: t('health_insurance'),
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: [styles.label],
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={images.bhyt}
              />
            ),
          }}
          name="bhyt"
          component={BHYTScreen}
        />
        <Tab.Screen
          options={{
            tabBarIndicatorStyle: {backgroundColor: 'transparent'},
            tabBarLabel: 'C14-TS',
            tabBarIconStyle: styles.icon,
            tabBarLabelStyle: [styles.label, {width: 70, height: 40}],
            tabBarIcon: ({color, size}) => (
              <Image
                style={[styles.icon, {tintColor: color}]}
                source={images.file}
              />
            ),
          }}
          name="c14ts"
          component={C14Screen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigation;
