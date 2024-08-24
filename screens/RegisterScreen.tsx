import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from '../constants/config';
import {COLORS, images} from '../constants/theme';
import data from '../data/data.json';
import Spinner from 'react-native-loading-spinner-overlay';
import {District, Province, Ward} from '../data/TYPEOBJECT';
import {useTranslation} from 'react-i18next';
const RegisterScreen = ({navigation}) => {
  const [insuranceId, setInsuranceId] = useState('');
  const [fullName, setFullName] = useState('');
  const [identifyPP, setIdentifyPP] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('0');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const floatingLabelImageAnimation = useRef(new Animated.Value(0)).current;
  const floatingLabelImageAnimation2 = useRef(new Animated.Value(0)).current;
  const floatingLabelImageAnimation3 = useRef(new Animated.Value(0)).current;
  const floatingLabelImageAnimation4 = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [modalProvince, setModalProvince] = useState([] as Province[]);
  const [modalDistrict, setModalDistrict] = useState([] as District[]);
  const [modalWard, setModalWard] = useState([] as Ward[]);
  const [indexData, setIndexData] = useState(-1);
  const [listData, setListData] = useState(
    [] as Province[] | District[] | Ward[],
  );
  const [listDataFilter, setListDataFilter] = useState(
    [] as (Province | District | Ward)[],
  );

  const [shouldShowError, setShouldShowError] = useState(false);
  const [textError, setTextError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();
  const register = async (
    insuranceId: string,
    fullName: string,
    identifyPP: string,
    dateOfBirth: string,
    gioitinh: string,
    province: string,
    district: string,
    ward: string,
    houseNumber: string,
    phoneNumber: string,
    password: string,
  ) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/vss/api/signup`, {
        token: '12345',
        data: {
          name: fullName,
          user_avatar: '',
          ma_bhxh: insuranceId,
          cccd: identifyPP,
          ngay_sinh: dateOfBirth,
          gioi_tinh: gioitinh,
          tinh_thanh_pho: province,
          quan_huyen: district,
          phuong_xa: ward,
          so_nha: houseNumber,
          so_dien_thoai: phoneNumber,
          mat_khau: password,
        },
      })
      .then(res => {
        console.log(res.data.success);
        setIsLoading(false);

        if (res.data.success) {
          navigation.navigate('Login');
        } else {
          if(res.data.error_code == "410"){
            setTextError(t("account_existed"));
            setShouldShowError(true);
          }else{
            setTextError(t("ocurred"));
            setShouldShowError(true);
          }
         
        }
      })
      .catch(e => {
        setIsLoading(false);
        setTextError(t("ocurred"));
        setShouldShowError(true);
        return false;
      });
  };

  useEffect(() => {
    console.log('def');
    var arrayProvince = [] as Province[];
    sortByName(data as Province[]).forEach((item: Province) => {
      arrayProvince.push(item);
    });
    setModalProvince(arrayProvince);
    setListData(arrayProvince);
  }, []);

  useEffect(() => {
    if (indexData === 0) {
      setListData(modalProvince);
      setListDataFilter(modalProvince);
    } else if (indexData === 1) {
      setListData(modalDistrict);
      setListDataFilter(modalDistrict);
    } else {
      setListData(modalWard);
      setListDataFilter(modalWard);
    }
  }, [indexData]);

  const sortByName = (data: any) => {
    return data.sort(function (
      a: Province | District | Ward,
      b: Province | District | Ward,
    ) {
      return b.FullName.toLowerCase() < a.FullName.toLowerCase();
    });
  };
  const filterData = (text: string) => {
    const dataFilter = listData.filter(value =>
      value.FullName.toLowerCase().includes(text.toLowerCase()),
    );
    setListDataFilter(dataFilter);
  };

  const handleBlur1 = () => {
    Animated.timing(floatingLabelImageAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
    Animated.timing(floatingLabelImageAnimation2, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
    Animated.timing(floatingLabelImageAnimation3, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };
  const handleBlur4 = () => {
    setIsFocused4(false);
    Animated.timing(floatingLabelImageAnimation4, {
      toValue: 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleFocus1 = () => {
    Animated.timing(floatingLabelImageAnimation, {
      toValue: -windowWidth,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
    Animated.timing(floatingLabelImageAnimation2, {
      toValue: -windowWidth,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleFocus3 = () => {
    setIsFocused3(true);
    Animated.timing(floatingLabelImageAnimation3, {
      toValue: -windowWidth,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleFocus4 = () => {
    setIsFocused4(true);
    Animated.timing(floatingLabelImageAnimation4, {
      toValue: -windowWidth,
      easing: Easing.inOut(Easing.ease),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const validateForm = () => {
    if (insuranceId == '') {
      setTextError(t("require_social"));
      setShouldShowError(true);
      return false;
    }
    if (fullName == '') {
      setTextError(t("require_name"));
      setShouldShowError(true);
      return false;
    }
    if (identifyPP == '') {
      setTextError(t("require_id"));
      setShouldShowError(true);
      return false;
    }

    if (dateOfBirth == '') {
      setTextError(t('requireDoB'));
      setShouldShowError(true);
      return false;
    }
    if (province == '') {
      setTextError(t("requireProvince"));
      setShouldShowError(true);
      return false;
    }
    if (district == '') {
      setTextError(t("requireDistrict"));
      setShouldShowError(true);
      return false;
    }
    if (ward == '') {
      setTextError('Select Ward/Commune');
      setShouldShowError(true);
      return false;
    }
    if (houseNumber == '') {
      setTextError(t("requireHouseNumber"));
      setShouldShowError(true);
      return false;
    }

    if (phoneNumber == '') {
      setTextError(t("requirePhoneNumber"));
      setShouldShowError(true);
      return false;
    } else {
      if (phoneNumber.length != 10) {
        if (phoneNumber.length != 12) {
          setTextError(t("requirePhoneNumber"));
          setShouldShowError(true);
          return false;
        }
      }

      if (phoneNumber.length != 12) {
        if (phoneNumber.length != 10) {
          setTextError(t("requirePhoneNumber"));
          setShouldShowError(true);
          return false;
        }
      }

      if (phoneNumber.length == 10) {
        if (!phoneNumber.startsWith('0')) {
          setTextError(t("requirePhoneNumber"));
          setShouldShowError(true);
          return false;
        }
      }
      if (phoneNumber.length == 12) {
        if (!phoneNumber.startsWith('+84')) {
          setTextError(t("requirePhoneNumber"));
          setShouldShowError(true);
          return false;
        }
      }
    }
    const datePattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!datePattern.test(dateOfBirth)) {
      setTextError(t("requireDoB"));
      setShouldShowError(true);
      return false;
    }
    const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/;
    if (password.length < 8 || !pattern.test(password)) {
      setTextError(t("requirePassword1"));
      setShouldShowError(true);
    }
    if (confirmPassword != password) {
      setTextError(t("confirmPass"));
      setShouldShowError(true);
      return false;
    }

    return true;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textInput: {
      color: COLORS.n6,
      fontSize: 11,
    },
    textInputContainerStyle: {
      marginHorizontal: 10,
      borderBottomWidth: 1,
      borderBlockColor: COLORS.secondary5,
      marginTop: 20,
    },
    textLabelStyle: {
      color: COLORS.n6,
      fontSize: 11,
      lineHeight: 16,
      fontFamily: 'Roboto-Regular',
    },
    miniContainer: {
      marginHorizontal: 10,
      marginTop: 20,
      flexDirection: 'row',
    },
    dropDownContainer: {
      borderBottomWidth: 1,
      borderColor: COLORS.secondary5,
      flexDirection: 'row',
      marginStart: 10,
      marginTop: 20,
    },
    sao: {
      color: COLORS.secondary4,
    },
    image: {
      width: 20,
      height: 20,
      tintColor: COLORS.secondary1,
    },
    image1: {
      width: 20,
      height: 20,
      tintColor: COLORS.secondary5,
    },

    textProvince: {
      color: COLORS.primary,
      fontSize: 12,
      flex: 1,
    },
  });

  const handleClickData = (text: string) => {
    if (indexData == 0) {
      setProvince(text);
      const selectedProvince = modalProvince.filter(
        value => value.FullName == text,
      );
      if (selectedProvince.length > 0) {
        setModalDistrict(selectedProvince[0].District);
        setDistrict('');
      }
    }

    if (indexData == 1) {
      setDistrict(text);
      const selectedDistrict = modalDistrict.filter(
        value => value.FullName == text,
      );
      if (selectedDistrict.length > 0) {
        setModalWard(selectedDistrict[0].Ward);
        setWard('');
      }
    }

    if (indexData == 2) {
      setWard(text);
    }
    setIsModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {isLoading && <Spinner visible={true} />}
        <SafeAreaView>
          <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
            colors={[COLORS.gradient1, COLORS.gradient3]}
            style={{
              paddingVertical: 10,
              height:60,
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
                {t('sign_up_upper')}
              </Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 20}}>
          <FloatingLabelInput
            onChangeText={text => setInsuranceId(text)}
            containerStyles={styles.textInputContainerStyle}
            value={insuranceId}
            style={styles.textInput}
            customLabelStyles={{leftBlurred: -1}}
            label={
              <Text style={styles.textLabelStyle}>
                {t('social_insurance_code')}
                <Text style={{color: 'red'}}> *</Text>
              </Text>
            }
            rightComponent={
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.image1} source={images.search} />
                <Image
                  style={[styles.image1, {marginStart: 10}]}
                  source={images.qr_code}
                />
              </View>
            }
          />
          <FloatingLabelInput
            value={fullName}
            isFocused={isFocused1}
            onBlur={() => {
              setIsFocused1(false);
              handleBlur1();
            }}
            onFocus={() => {
              setIsFocused1(true);
              handleFocus1();
            }}
            onChangeText={text => setFullName(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            customLabelStyles={{leftBlurred: -1}}
            label={
              <Text style={styles.textLabelStyle}>
                {t('full_name')}
                <Text style={styles.sao}> *</Text>
              </Text>
            }
            rightComponent={
              <Animated.Image
                style={[
                  styles.image,
                  {transform: [{translateX: floatingLabelImageAnimation}]},
                ]}
                source={images.pencil}
              />
            }
          />
          {fullName != '' && (
            <Text
              style={{
                marginTop: 10,
                marginStart: 10,
                color: COLORS.secondary4,
                fontSize: 11,
                fontFamily: 'Roboto-Regular',
              }}>
              {t('note_enter')}
            </Text>
          )}
          <FloatingLabelInput
            value={identifyPP}
            onChangeText={text => setIdentifyPP(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            customLabelStyles={{leftBlurred: -1}}
            rightComponent={
              <Animated.Image style={[styles.image1]} source={images.qr_code} />
            }
            label={
              <Text style={styles.textLabelStyle}>
                {t("identification_pp")}<Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          <FloatingLabelInput
            value={dateOfBirth}
            onChangeText={text => setDateOfBirth(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            keyboardType="numeric"
            mask="99/99/9999"
            isFocused={isFocused4}
            onBlur={() => {
              handleBlur4();
            }}
            onFocus={() => {
              handleFocus4();
            }}
            customLabelStyles={{leftBlurred: -1}}
            rightComponent={
              <Animated.Image
                style={[
                  styles.image,
                  {transform: [{translateX: floatingLabelImageAnimation4}]},
                ]}
                source={images.pencil}
              />
            }
            label={
              <Text style={styles.textLabelStyle}>
                {t("dateOfBirth")}<Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 20,
              marginStart: 10,
            }}>
            <Text style={styles.textLabelStyle}>
              {t("gender")}<Text style={styles.sao}> *</Text>
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={() => setGender('0')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 16, height: 16}}
                  source={
                    gender === '0' ? images.checkActive : images.checkInActive
                  }
                />
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 11,
                    color: COLORS.n6,
                    marginStart: 10,
                  }}>
                  {t("male")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setGender('1')}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 16, height: 16}}
                  source={
                    gender === '1' ? images.checkActive : images.checkInActive
                  }
                />
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 11,
                    color: COLORS.n6,
                    marginStart: 10,
                  }}>
                  {t("female")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.miniContainer}>
            <Text style={styles.textInput}>
              {t("contact_address")}<Text style={styles.sao}>*</Text>
            </Text>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  setIndexData(0);
                  setIsModalVisible(true);
                }}
                style={[styles.dropDownContainer, {marginTop: 0}]}>
                <Text style={styles.textProvince}>
                  {province.length == 0 ? t("province") : province}
                </Text>
                <Image style={styles.image1} source={images.view_up} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndexData(1);
                  setIsModalVisible(true);
                }}
                style={styles.dropDownContainer}>
                <Text style={styles.textProvince}>
                  {district.length > 0 ? district : t("district")}
                </Text>
                <Image style={styles.image1} source={images.view_up} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndexData(2);
                  setIsModalVisible(true);
                }}
                style={styles.dropDownContainer}>
                <Text style={styles.textProvince}>
                  {ward.length > 0 ? ward : t("ward")}
                </Text>
                <Image style={styles.image1} source={images.view_up} />
              </TouchableOpacity>
            </View>
          </View>
          <FloatingLabelInput
            value={houseNumber}
            onChangeText={text => setHouseNumber(text)}
            containerStyles={styles.textInputContainerStyle}
            onBlur={() => handleBlur2()}
            onFocus={() => handleFocus2()}
            isFocused={isFocused2}
            style={styles.textInput}
            customLabelStyles={{leftBlurred: -1}}
            rightComponent={
              <Animated.Image
                style={[
                  styles.image,
                  {transform: [{translateX: floatingLabelImageAnimation2}]},
                ]}
                source={images.pencil}
              />
            }
            label={
              <Text style={styles.textLabelStyle}>
                {t("house_number")}
                <Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          <FloatingLabelInput
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            onBlur={() => handleBlur3()}
            keyboardType="numeric"
            onFocus={() => handleFocus3()}
            isFocused={isFocused3}
            customLabelStyles={{leftBlurred: -1}}
            rightComponent={
              <Animated.Image
                style={[
                  styles.image,
                  {transform: [{translateX: floatingLabelImageAnimation3}]},
                ]}
                source={images.pencil}
              />
            }
            label={
              <Text style={styles.textLabelStyle}>
                {t("phone_number")}<Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          {phoneNumber != '' && (
            <Text
              style={{
                marginTop: 10,
                marginStart: 10,
                color: COLORS.secondary4,
                fontSize: 11,
                fontFamily: 'Roboto-Regular',
              }}>
              {t("note_phone")}
            </Text>
          )}
          <FloatingLabelInput
            value={password}
            isPassword={true}
            onChangeText={text => setPassword(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            customShowPasswordComponent={
              <Image
                style={{width: 24, height: 24, tintColor: '#3a679e'}}
                source={images.eye}
              />
            }
            customHidePasswordComponent={
              <Image
                style={{width: 24, height: 24, tintColor: '#3a679e'}}
                source={images.eye_1}
              />
            }
            customLabelStyles={{leftBlurred: -1}}
            label={
              <Text style={styles.textLabelStyle}>
                {t("password")}<Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          <FloatingLabelInput
            value={confirmPassword}
            isPassword={true}
            onChangeText={text => setConfirmPassword(text)}
            containerStyles={styles.textInputContainerStyle}
            style={styles.textInput}
            customShowPasswordComponent={
              <Image
                style={{width: 24, height: 24, tintColor: '#3a679e'}}
                source={images.eye}
              />
            }
            customHidePasswordComponent={
              <Image
                style={{width: 24, height: 24, tintColor: '#3a679e'}}
                source={images.eye_1}
              />
            }
            onBlur={() => handleBlur3()}
            onFocus={() => handleFocus3()}
            customLabelStyles={{leftBlurred: -1}}
            label={
              <Text style={styles.textLabelStyle}>
                {t("confirm_pass")}<Text style={styles.sao}> *</Text>
              </Text>
            }
          />
          <TouchableOpacity
            onPress={async () => {
              if (validateForm()) {
                register(
                  insuranceId,
                  fullName,
                  identifyPP,
                  dateOfBirth,
                  gender,
                  province,
                  district,
                  ward,
                  houseNumber,
                  phoneNumber,
                  password,
                );
              }
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 14,
                alignSelf: 'flex-end',
                marginTop: 24,
                marginEnd: 10,
              }}>
              {t("continue")}
            </Text>
          </TouchableOpacity>

          {isModalVisible && (
            <Modal transparent={true}>
              <TouchableOpacity
                onPress={() => {
                  console.log('asdasd');
                  setIsModalVisible(false);
                }}
                style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
                <SafeAreaView
                  onStartShouldSetResponder={e => true}
                  style={{
                    backgroundColor: 'white',
                    marginHorizontal: 30,
                    marginVertical: 14,
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.gradient2,
                      padding: 10,
                    }}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={images.search}
                    />
                    <TextInput
                      onChangeText={text => filterData(text)}
                      style={{marginHorizontal: 10, flex: 1}}
                      placeholder={t("search")}
                    />
                  </View>

                  <ScrollView
                    style={{
                      flex: 1,
                      paddingBottom: 10,
                      paddingHorizontal: 10,
                    }}>
                    {listDataFilter.map(item => {
                      return (
                        <TouchableWithoutFeedback
                          key={item.Code}
                          onPress={e => e.stopPropagation()}
                          style={{flex: 1}}>
                          <Text
                            onPress={() => handleClickData(item.FullName)}
                            style={{
                              marginTop: 14,
                              fontSize: 14,
                              flex: 1,
                              color: COLORS.secondary1,
                            }}>
                            {item.FullName}
                          </Text>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </ScrollView>

                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: COLORS.primary,
                    }}>
                    <View
                      style={{backgroundColor: COLORS.secondary4, padding: 4}}>
                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(false);
                        }}>
                        <Image
                          source={images.back}
                          style={{height: 20, width: 20}}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text
                      onPress={() => {
                        setIsModalVisible(false);
                      }}
                      style={{
                        flex: 1,
                        height: '100%',
                        color: 'white',
                        textAlignVertical: 'bottom',
                        paddingTop: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                      }}>
                      {t("choose")}
                    </Text>
                  </View>
                </SafeAreaView>
              </TouchableOpacity>
            </Modal>
          )}

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
                      {t("close")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterScreen;
