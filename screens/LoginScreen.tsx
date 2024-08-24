import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  Modal,
} from 'react-native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS, images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import i18next from '../services/i18next';
import {BASE_URL} from '../constants/config';
import {changeLanguage} from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [insuranceId, setInsuranceId] = useState('');
  const [password, setPassword] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);
  const [textError, setTextError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLang, setIsShowLang] = useState(false);
  const {t} = useTranslation();
  const {setUserInfo, saveLang, changeLanguage} = useContext(AuthContext);

  const changeLng = (code: string) => {
    i18next.changeLanguage(code);
    changeLanguage(code);
    setIsShowLang(false);
  };
  useEffect(() => {
      AsyncStorage.getItem("savedID").then(res => {
        if(res != null){
          setInsuranceId(res)
        }
      })
  },[])

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
  const forgotPassword = (insuranceId: string) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/vss/api/forgot_password`, {
        token: '12345',
        data: {
          ma_bhxh: insuranceId,
        },
      })
      .then(res => {
        setIsLoading(false);
        console.log(res.data);
        if (res.data.success) {
          setShouldShowError(true);
          setTextError(t('wait_admin'));
        } else {
          if (res.data.error_code == '404') {
            setShouldShowError(true);
            setTextError(t('acount_not_existed'));
          } else {
            setShouldShowError(true);
            setTextError(t('ocurred'));
          }
        }
      })
      .catch(e => {
        setShouldShowError(true);
        setTextError(t('ocurred'));
        setIsLoading(false);
      });
  };
  const login = (insuranceId: string, password: string) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/vss/api/signin`, {
        token: '12345',
        data: {
          ma_bhxh: insuranceId,
          mat_khau: password,
        },
      })
      .then(res => {
        console.log(res.data);

        setIsLoading(false);
        if (res.data.success) {
          console.log('thanh cong');
          var newUser = res.data.data;
          setUserInfo(newUser);
          AsyncStorage.setItem("savedID",newUser.ma_bhxh)
        } else {
          console.log('that bai');
          if (res.data.error_code == 410) {
            setShouldShowError(true);
            setTextError(t('account_not_existed'));
          } else if (res.data.error_code == 409) {
            setShouldShowError(true);
            setTextError(t('wrong_pass'));
          } else {
            setShouldShowError(true);
            setTextError(t('ocurred'));
          }
        }
      })
      .catch(e => {
        console.log(e);
        setShouldShowError(true);
        setTextError(t('ocurred'));
        setIsLoading(false);
      });
  };

  const validForgot = () => {
    if (insuranceId == '') {
      setShouldShowError(true);
      setTextError(t('require_social'));
      return false;
    }
    return true;
  };
  const validLogin = () => {
    if (insuranceId == '') {
      setShouldShowError(true);
      setTextError(t('require_social'));
      return false;
    }
    if (password == '') {
      setShouldShowError(true);
      setTextError(t('require_password3'));
      return false;
    }
    return true;
  };

  const openLink = () => {
    Linking.openURL('https://baohiemxahoi.gov.vn');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={images.background}
        style={{flex: 1, paddingTop: 60, width: null, height: null}}>
        {isLoading && <Spinner visible={true} />}

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{width: 20, height: 20}}
              onPress={() => navigation.navigate('Notice')}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                  alignSelf: 'flex-start',
                }}
                source={images.noti}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsShowLang(true)}>
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
        </View>
        <Image
          style={{width: 92, height: 92, alignSelf: 'center', marginTop: 20}}
          source={images.logo}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#bbb',
            marginHorizontal: 30,
            borderRadius: 4,
            marginTop: 20,
          }}>
          <View
            style={{
              width: 30,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              style={{width: 20, height: 20, tintColor: 'white'}}
              source={images.user}
            />
          </View>
          <TextInput
            style={styles.input}
            value={insuranceId}
            placeholderTextColor={COLORS.n4}
            placeholder={t('social_insurance_code')}
            onChangeText={text => setInsuranceId(text)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#bbb',
            marginHorizontal: 30,
            borderRadius: 4,
            marginTop: 10,
          }}>
          <View
            style={{
              width: 30,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              style={{width: 20, height: 20, tintColor: 'white'}}
              source={images.lock}
            />
          </View>
          <TextInput
            secureTextEntry
            style={styles.input}
            value={password}
            placeholderTextColor={COLORS.n4}
            placeholder={t('password')}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 30, marginTop: 10}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                if (validForgot()) {
                  forgotPassword(insuranceId);
                }
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: COLORS.primary,
                }}>
                {t('forgot_password')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 12,
                color: COLORS.primary,
              }}>
              {i18next.t('sign_up')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', marginHorizontal: 30, marginTop: 20}}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 4,
              borderWidth: 2,
              justifyContent: 'center',
              marginEnd: 10,
              borderColor: COLORS.primary,
            }}
            onPress={() => {
              if (validLogin()) {
                login(insuranceId, password);
              } else {
              }
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: COLORS.primary,
                fontSize: 16,
                fontFamily: 'Roboto-Bold',
              }}>
              {t('log_in')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={images.faceId}
              style={{width: 48, height: 48, tintColor: COLORS.secondary1}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            backgroundColor: COLORS.secondary4,
            borderRadius: 10,
            paddingVertical: 5,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto-Bold',
                fontWeight: 700,
                fontSize: 16,
                flex: 1,
                textAlign: 'center',
                paddingHorizontal: 10,
              }}>
              Đăng nhập bằng tài khoản định danh điện tử
            </Text>
            <Image style={{width: 48, height: 48}} source={images.vneid} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontFamily: 'Roboto-Regular',
              }}>
              {t('please_install_vssid')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://baohiemxahoi.gov.vn/nhungdieucanbiet/pages/nhung-dieu-khac.aspx?CateID=90&ItemID=10241',
              );
            }}
            style={{
              alignSelf: 'flex-end',
              marginEnd: 20,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontFamily: 'Roboto-Regular',
              }}>
              {t('privacy_policy')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={() => openLink()}>
              <Image style={styles.image} source={images.ic} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginStart: 20}}
              onPress={() => openLink()}>
              <Image style={[styles.image]} source={images.support} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginStart: 20}}
              onPress={() => openLink()}>
              <Image style={[styles.image]} source={images.search_world} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink()}
              style={{marginStart: 20}}>
              <Image style={[styles.image]} source={images.computer} />
            </TouchableOpacity>

            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => openLink()}
                style={{alignSelf: 'flex-end'}}>
                <Image style={[styles.image]} source={images.address} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      {shouldShowError && (
        <Modal transparent={true}>
          <TouchableOpacity
            onPress={() => {
              setShouldShowError(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
            }}>
            <View
              style={{
                width: '75%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: COLORS.n5,
                  fontSize: 16,
                  fontFamily: 'Roboto-Medium',
                }}>
                {t('notice')}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: COLORS.n6,
                  fontFamily: 'Roboto-Regular',
                  fontSize: 14,
                }}>
                {textError}
              </Text>
              <TouchableOpacity
                onPress={() => setShouldShowError(false)}
                style={{
                  marginTop: 12,
                  borderColor: COLORS.primary,
                  borderRadius: 6,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    paddingVertical: 6,
                    paddingHorizontal: 30,
                  }}>
                  {t('close')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
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
                    marginEnd:10,
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
                    marginEnd:10,
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
                    marginEnd:10,
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
                    marginEnd:10,
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
                    marginEnd:10,
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

export default LoginScreen;
