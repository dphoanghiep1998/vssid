import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants';
import {images} from '../constants/theme';
import {UserInfo} from '../data/TYPEOBJECT';
import {AuthContext} from '../context/AuthContext';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TheBhytScreen = ({navigation}) => {
  const {userInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    textTop: {
      color: COLORS.n5,
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
    },
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
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.gradient1, COLORS.gradient3]}
        style={{
          height: 60 + insets.top,
          paddingTop: insets.top,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center', // Center items vertically within LinearGradient
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginStart: 10,
            width: 30,
            height: 30,
            justifyContent: 'center', // Center image horizontally
            alignItems: 'center', // Center image vertically
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.n1,
            }}
            source={images.back}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.n1,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginStart: -40,
              alignSelf: 'center',
              fontSize: 18,
            }}>
            {t('heath_card_full')}
          </Text>
        </View>
      </LinearGradient>
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
            <Image
              style={{height: 70, width: 70, borderRadius: 35}}
              src={userInfo.user_avatar_url}
              defaultSource={images.avatar}
            />
            <View style={{flex:1}}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.n6,
                  marginStart: 20,
                  fontFamily: 'Roboto-Regular',
                  marginTop: 4,
                }}>
                {userInfo.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.n5,
                  marginStart: 20,
                  fontFamily: 'Roboto-Regular',
                  marginTop: 4,
                }}>
                {t('valid_from')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.n5,
                  fontFamily: 'Roboto-Regular',
                  marginStart: 20,
                  marginTop: 4,
                }}>
                01/01/{userInfo.bhyt_thoi_han} {t('to_2')} 31/12/
                {userInfo.bhyt_thoi_han}
              </Text>
              {/* <Text
                style={{
                  fontSize: 14,
                  color: COLORS.n5,
                  fontFamily: 'Roboto-Regular',
                  marginStart: 20,
                  marginTop: 2,
                }}>
                31/12/{userInfo.bhyt_thoi_han}
              </Text> */}
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
            <Text style={styles.textTop}>{t('sex')}</Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTop}>
                {userInfo.gioi_tinh == '0' ? t('male') : t('female')}
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
            <Text style={[styles.textTop, {width: '50%'}]}>
              {t('health_insurance_card_code')}
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end', width: '40%'}}>
              <Text style={styles.textTop}>DN401{userInfo.ma_bhxh}</Text>
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
            <Text style={[styles.textTop, {width: '50%'}]}>
              {t('first_register')}
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={[styles.textTop, {textAlign: 'right'}]}>
                {'Phòng khám đa khoa Linh Đàm, Hoàng Mai (Mã: 01045)'}
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
            <Text style={[styles.textTop, {width: '40%'}]}>
              {t('valid_Date_of')}
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={styles.textTop}>01/{userInfo.thoi_diem_5_nam}</Text>
            </View>
          </View>
         
        </ImageBackground>
        <ImageBackground
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
          source={images.bginfo}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 15,
              marginStart: -8,
              fontFamily: 'Roboto-Regular',
            }}>
            {t('health_benefit')}:
          </Text>
          <Text
            style={{
              color: COLORS.n6,
              fontSize: 15,
              marginTop: 10,
              fontFamily: 'Roboto-Regular',
            }}>
            {t('benefit_content_health')}
          </Text>
        </ImageBackground>
      </ScrollView>
      <View style={{flexDirection: 'row', marginBottom: 10,paddingTop:10}}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 30, height: 30, tintColor: COLORS.secondary5}}
            source={images.qr_code}
          />
          <Text
            style={{
              marginStart: 10,
              color: COLORS.secondary5,
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
            }}>
            {t('present_hi_card')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={{width: 30, height: 30}} source={images.anhthe} />
          <Text
            style={{
              marginStart: 10,
              color: COLORS.secondary5,
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
            }}>
            {t('image_of_hi_card')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TheBhytScreen;
