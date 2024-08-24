import {View, Text} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FadeFromBottomAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import {UserInfo} from '../data/TYPEOBJECT';
import i18next from 'i18next';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({} as UserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLang, setSaveLang] = useState('');

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
        console.log('success');

        if (res.data.success) {
          setIsLoading(false);
          return true;
        } else {
          setIsLoading(false);
          return false;
        }
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
        return false;
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
        setIsLoading(false);
        if (res.data.success) {
          var newUser = res.data.data;
          console.log(newUser);

          setUserInfo(newUser);
        } else {
          console.log(res);
        }
      })
      .catch(e => {
        console.log(`login failed ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/logout`, {}, {})
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        // setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log('logout error ${e}');
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      await AsyncStorage.getItem('userInfo').then(res => {
        if (res !== null) {
          let userInfo = JSON.parse(res);
          setUserInfo(userInfo);
        }
      });
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  const resetUser = () => {
    setUserInfo({});
  };

  const getLanguage = () => {
    AsyncStorage.getItem('save_lang').then(res => {
      if (res !== null) {
        setSaveLang(res);
        i18next.changeLanguage(res);
      } else {
        setSaveLang('vi');
        i18next.changeLanguage('vi');
        AsyncStorage.setItem('save_lang', 'vi');
      }
    });
  };

  const changeLanguage = (code: string) => {
    AsyncStorage.setItem('save_lang', code);
    setSaveLang(code);
  };

  useEffect(() => {
    // isLoggedIn();
    getLanguage();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        changeLanguage,
        login,
        logout,
        saveLang,
        setSaveLang,
        resetUser,
        setUserInfo
      }}>
      {children}
    </AuthContext.Provider>
  );
};
