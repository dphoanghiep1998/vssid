import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import React, {useContext, useState} from 'react';
import {COLORS} from '../constants';
import {images} from '../constants/theme';
import axios from 'axios';
import {BASE_URL} from '../constants/config';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {UserInfo} from '../data/TYPEOBJECT';
import {useTranslation} from 'react-i18next';

const ChangePasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [textError, setTextError] = useState('');
  const [shouldShowError, setShouldShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {resetUser} = useContext(AuthContext);
  const {userInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  const {t} = useTranslation();
  const changePassword = (
    insuranceId: string,
    oldPassword: string,
    newPassword: string,
  ) => {
    axios
      .post(`${BASE_URL}/vss/api/change_password`, {
        token: '12345',
        data: {
          ma_bhxh: insuranceId,
          mat_khau: oldPassword,
          mat_khau_moi: newPassword,
        },
      })
      .then(res => {
        setIsLoading(false);
        if (res.data.success) {
          // setSuccess(true);
          // setTextError(t("changePassSuccess"));
          // setShouldShowError(true);
          resetUser()
        } else {
          setSuccess(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const validate = () => {
    const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/;
    if (
      oldPassword.length < 8 ||
      newPassword.length < 8 ||
      confirmPassword.length < 8 ||
      !pattern.test(newPassword)
    ) {
      setTextError(t('requirePassword2'));
      setShouldShowError(true);
    }
    if (confirmPassword != newPassword) {
      setTextError(t('confirmPass'));
      setShouldShowError(true);
      return false;
    }
    return true;
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      marginHorizontal: 20,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondary5,
    },
    image: {
      height: 20,
      width: 20,
      tintColor: COLORS.secondary3,
      marginBottom: 4,
    },
  });
  return (
    <View style={{flex: 1}}>
      {isLoading && <Spinner visible={true} />}
      <SafeAreaView>
        <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            height:60
          }}
          colors={[COLORS.gradient1, COLORS.gradient3]}>
          <TouchableOpacity
            style={{zIndex: 10}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: 30, height: 30, tintColor: 'white'}}
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
              marginStart: -37,
            }}>
            {t("changePasswordUP")}
          </Text>
        </LinearGradient>
      </SafeAreaView>
      <View style={styles.container}>
        <TextInput
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          secureTextEntry={showPassword1 ? false : true}
          placeholderTextColor={COLORS.secondary5}
          placeholder={t("enterOldPass")}
          style={{
            flex: 1,
            marginEnd: 10,
            color: COLORS.secondary5,
            fontSize: 14,
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword1(status => !status)}>
          <Image
            style={styles.image}
            source={showPassword1 ? images.unlock_2 : images.lock}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          value={newPassword}
          secureTextEntry={showPassword2 ? false : true}
          onChangeText={text => setNewPassword(text)}
          placeholderTextColor={COLORS.secondary5}
          placeholder={t("enterNewPass")}
          style={{
            flex: 1,
            marginEnd: 10,
            color: COLORS.secondary5,
            fontSize: 14,
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword2(status => !status)}>
          <Image
            style={styles.image}
            source={showPassword2 ? images.unlock_2 : images.lock}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          value={confirmPassword}
          secureTextEntry={showPassword3 ? false : true}
          onChangeText={text => setConfirmPassword(text)}
          placeholderTextColor={COLORS.secondary5}
          placeholder={t("enterAgain")}
          style={{
            flex: 1,
            marginEnd: 10,
            color: COLORS.secondary5,
            fontSize: 14,
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword3(status => !status)}>
          <Image
            style={styles.image}
            source={showPassword3 ? images.unlock_2 : images.lock}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (validate()) {
            changePassword(userInfo.ma_bhxh, oldPassword, newPassword);
          }
        }}>
        <Text
          style={{
            borderColor: COLORS.primary,
            borderRadius: 12,
            marginHorizontal: 20,
            borderWidth: 2,
            paddingVertical: 14,
            color: COLORS.primary,
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'Roboto-Regular',
            fontSize: 16,
          }}>
          {t("complete")}
        </Text>
      </TouchableOpacity>
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
                {t("notice")}
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
                onPress={() => {
                  setShouldShowError(false);
                  if (success) {
                    resetUser();
                  } else {
                  }
                }}
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
                  {t("close")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default ChangePasswordScreen;
