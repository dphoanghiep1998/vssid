import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants';
import {images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../context/AuthContext';
import i18next from 'i18next';

const SettingScreen = ({navigation}) => {
  const [isShowLang, setIsShowLang] = useState(false);
  const {setUserInfo, saveLang, changeLanguage} = useContext(AuthContext);
  const {t} = useTranslation();

  const changeLng = (code: string) => {
    i18next.changeLanguage(code);
    changeLanguage(code);
    setIsShowLang(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    input: {
      backgroundColor: '#fff',
      paddingHorizontal: 14,
      flex: 1,
    },
    link: {
      color: 'blue',
    },
    image: {
      width: 32,
      height: 32,
      tintColor: COLORS.primary,
    },
    langUp: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: '#3a679e',
    },
    langDown: {
      marginTop: 4,
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: '#3a679e',
    },
    flag: {height: 32, width: 50, marginStart: 6},
  });
  return (
    <View>
      <SafeAreaView>
        <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
          colors={[COLORS.gradient1, COLORS.gradient3]}
          style={{
            paddingVertical: 10,
            height: 60,
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
                color: COLORS.white,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginStart: -34,
                alignSelf: 'center',
                fontSize: 16,
              }}>
              {t('settingUp')}
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => setIsShowLang(true)}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            flex: 1,
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
            color: COLORS.primary,
          }}>
          {t('language')}
        </Text>
        <Image
          style={{width: 50, height: 30, alignContent: 'flex-end'}}
          source={
            saveLang == 'vi'
              ? images.flag
              : saveLang == 'ko'
              ? images.korean
              : saveLang == 'en'
              ? images.english
              : saveLang == 'ja'
              ? images.japan
              : images.china
          }
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            flex:1,
            color: COLORS.primary,
            fontFamily: 'Roboto-Regular',
            fontSize: 18,
          }}>
          {t('faceVerify')}
        </Text>
        <Image
          style={{width: 30, height: 30, alignContent: 'flex-end'}}
          source={
            images.iconTick
          }
        />
      </View>

      {isShowLang && (
        <Modal transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setIsShowLang(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                width: '85%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 10,
                paddingBottom: 30,
                paddingHorizontal: 14,
              }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                }}>
                {t('language')}
              </Text>
              <TouchableOpacity
                onPress={() => changeLng('vi')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingVertical: 10,
                  backgroundColor: saveLang == 'vi' ? '#e2e2e2' : 'transparent',
                }}>
                <Image style={styles.flag} source={images.flag} />
                <View
                  style={{
                    flex: 1,
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.langUp}>Tiếng Việt</Text>
                  <Text style={styles.langDown}>{t('vietnamese')}</Text>
                </View>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginEnd: 10,
                    display: saveLang == 'vi' ? 'flex' : 'none',
                  }}
                  source={images.tick}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLng('en')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  backgroundColor: saveLang == 'en' ? '#e2e2e2' : 'transparent',
                }}>
                <Image style={styles.flag} source={images.english} />
                <View
                  style={{
                    flex: 1,
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.langUp}>EngLish</Text>
                  <Text style={styles.langDown}>{t('english')}</Text>
                </View>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginEnd: 10,
                    display: saveLang == 'en' ? 'flex' : 'none',
                  }}
                  source={images.tick}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLng('ko')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  backgroundColor: saveLang == 'ko' ? '#e2e2e2' : 'transparent',
                }}>
                <Image style={styles.flag} source={images.korean} />
                <View
                  style={{
                    flex: 1,
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.langUp}>한국인</Text>
                  <Text style={styles.langDown}>{t('korean')}</Text>
                </View>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginEnd: 10,
                    display: saveLang == 'ko' ? 'flex' : 'none',
                  }}
                  source={images.tick}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLng('zh')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  backgroundColor: saveLang == 'zh' ? '#e2e2e2' : 'transparent',
                }}>
                <Image style={styles.flag} source={images.china} />
                <View
                  style={{
                    flex: 1,
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.langUp}>中国人</Text>
                  <Text style={styles.langDown}>{t('chinese')}</Text>
                </View>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginEnd: 10,
                    display: saveLang == 'zh' ? 'flex' : 'none',
                  }}
                  source={images.tick}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeLng('ja')}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                  backgroundColor: saveLang == 'ja' ? '#e2e2e2' : 'transparent',
                }}>
                <Image style={styles.flag} source={images.japan} />
                <View
                  style={{
                    flex: 1,
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.langUp}>日本語</Text>
                  <Text style={styles.langDown}>{t('japanese')}</Text>
                </View>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginEnd: 10,
                    display: saveLang == 'ja' ? 'flex' : 'none',
                  }}
                  source={images.tick}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default SettingScreen;
