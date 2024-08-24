import React, {useContext} from 'react';
import {View, Text, Alert, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomDrawerItem from './CustomDrawerItem';
import {COLORS, images} from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import {UserInfo} from '../data/TYPEOBJECT';
import {AuthContext} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';

const Drawer = createDrawerNavigator();

export default function CustomDrawerContent(props, navigation) {
  const {userInfo, setUserInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  const {t} = useTranslation();

  return (
    <LinearGradient
      colors={[COLORS.gradient3, COLORS.gradient1]}
      style={{flex: 1}}>
      <DrawerContentScrollView style={{flex: 1, height: '100%'}} {...props}>
        <View style={{height: 150, justifyContent: 'center'}}>
          <Image
            style={{
              alignSelf: 'center',
              height: 60,
              width: 60,
              borderRadius: 30,
            }}
            src={userInfo.user_avatar_url}
            defaultSource={images.avatar}
          />
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {userInfo.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            {userInfo.ma_bhxh}
          </Text>
        </View>
        <CustomDrawerItem
          label="Thông báo"
          showArrow={true}
          image={images.noti_1}
        />
        <CustomDrawerItem
          onPress={props.onPress}
          label="Tin tức"
          showArrow={true}
          image={images.news}
        />
        <CustomDrawerItem
          onPress={() => {
            props.navigation.navigate('QLCN-D');
          }}
          label={t('personal_manage')}
          showArrow={true}
          image={images.qlcn}
        />
        <CustomDrawerItem
          onPress={() => {
            props.navigation.navigate('DVC-D');
          }}
          label={t('publicServiceLow')}
          showArrow={true}
          image={images.dichvucong}
        />
        <CustomDrawerItem
          onPress={() => {
            props.navigation.navigate('Search-D');
          }}
          label={t('searchLow')}
          showArrow={true}
          image={images.search_world}
        />
        <CustomDrawerItem
          onPress={() => {
            props.navigation.navigate('Support-D');
          }}
          label={t('supportLow')}
          showArrow={true}
          image={images.support_1}
        />
        <CustomDrawerItem
          onPress={() => props.navigation.navigate('Setting')}
          label={t('setting')}
          showArrow={true}
          image={images.setting}
        />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <CustomDrawerItem
          onPress={() => props.navigation.navigate('ChangePass')}
          style={{marginBottom: 10}}
          label={t('changePass')}
          showArrow={true}
          image={images.password}
        />
        <CustomDrawerItem
          onPress={() => setUserInfo({})}
          style={{marginBottom: 10}}
          label={t('logout')}
          showArrow={true}
          image={images.power}
        />
        <Text style={styles.profileName}>{t('version')} 1.6.9</Text>
        <Text style={styles.profileId}>© {t('copyright')}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    height: 100,
    padding: 20,
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  profileId: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
