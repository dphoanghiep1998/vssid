import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import WebView from 'react-native-webview';
import {COLORS, images} from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../context/AuthContext';
import {UserInfo} from '../data/TYPEOBJECT';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';

const PersonalManageScreen = ({navigation}) => {
  const {userInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    textTop: {},
    containerBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    containerTextBottom: {
      flex: 1,
      paddingVertical: 20,
      marginStart: 20,
      borderBottomColor: COLORS.n4,
      borderBottomWidth: 1,
    },
    textBottom: {
      color: COLORS.n5,
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
      fontWeight: '400',
      flex: 1,
      borderBottomColor: COLORS.n4,
      borderBottomWidth: 1,
    },
    imageBottom: {
      height: 34,
      width: 34,
      tintColor: COLORS.primary,
    },
    imageNextBottom: {
      height: 24,
      width: 24,
      tintColor: COLORS.n5,
    },
  });
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <LinearGradient
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height:60,
            paddingHorizontal: 14,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.gradient1, COLORS.gradient3]}>
          <TouchableOpacity
         
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              style={{width: 28, height: 28, tintColor: 'white'}}
              source={images.menu}
            />
          </TouchableOpacity>

          <Text
            style={{
              color: 'white',
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
            }}>
            {t('personalInformationUP')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
            <Image
              style={{width: 30, height: 30, tintColor: 'white'}}
              source={images.noti}
            />
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
        <ImageBackground
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
          source={images.bginfo}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{height: 60, width: 60,borderRadius:30}} src={userInfo.user_avatar_url} defaultSource={images.avatar}  />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.n6,
                  marginStart: 20,
                  fontFamily: 'Roboto-Regular',
                  marginTop: 10,
                }}>
                {userInfo.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.n5,
                  fontFamily: 'Roboto-Regular',
                  marginStart: 20,
                  marginTop: 15,
                }}>
                {t('social_insurance_code')}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.n5,
                  fontFamily: 'Roboto-Regular',
                  marginStart: 20,
                  marginTop: 2,
                }}>
                {userInfo.ma_bhxh}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.n5,
              marginTop: 20,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.textTop}>{t('dateOfBirth')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTop}>{userInfo.ngay_sinh}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.n2,
              marginTop: 10,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.textTop}>{t('personalIdentification')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: COLORS.n6,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 14,
                }}>
                {userInfo.cccd}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.n2,
              marginTop: 10,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.textTop}>{t('phone_number')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTop}>{userInfo.so_dien_thoai}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.n2,
              marginTop: 10,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: '40%'}}>{t('address')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTop}>{userInfo.dia_chi}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.n2,
              marginTop: 10,
            }}
          />
        </ImageBackground>
        <TouchableOpacity
          onPress={() => navigation.navigate('CARD-BHYT')}
          style={styles.containerBottom}>
          <Image style={styles.imageBottom} source={images.bhyt} />
          <View style={styles.containerTextBottom}>
            <Text style={styles.textBottom}>{t('heath_card')}</Text>
          </View>

          <Image style={styles.imageNextBottom} source={images.next} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TabNav',{initName:null})}
          style={styles.containerBottom}>
          <Image style={styles.imageBottom} source={images.quatrinhthamgia} />
          <View style={styles.containerTextBottom}>
            <Text style={styles.textBottom}>{t('social_security')}</Text>
          </View>

          <Image style={styles.imageNextBottom} source={images.next} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerBottom} onPress={() => {
          navigation.navigate("Entitle")
        }}>
          <Image style={styles.imageBottom} source={images.info} />
          <View style={styles.containerTextBottom}>
            <Text style={styles.textBottom}>{t('entitlementInfor')}</Text>
          </View>

          <Image style={styles.imageNextBottom} source={images.next} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TabNav",{initName:"bhyt"})} style={styles.containerBottom}>
          <Image style={styles.imageBottom} source={images.sokhamchuabenh} />
          <View style={styles.containerTextBottom}>
            <Text style={styles.textBottom}>{t('health_care_book')}</Text>
          </View>

          <Image style={styles.imageNextBottom} source={images.next} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PersonalManageScreen;
