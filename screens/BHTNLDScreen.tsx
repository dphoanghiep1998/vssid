import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import {AuthContext} from '../context/AuthContext';
import {UserInfo} from '../data/TYPEOBJECT';

const BHTNLDScreen = ({navigation}) => {
  const {userInfo}: {userInfo: UserInfo} = useContext(AuthContext);
  const {t} = useTranslation();
  const convertMonthToYearMonth = (month: string) => {
    const newMonth = Number(month);
    const years = Math.floor(newMonth / 12);
    const months = newMonth % 12;

    let result = '';

    if (years > 0) {
      result += `${years} ${years > 1 ? t('years') : t('year')}`;
    }

    if (months > 0) {
      if (years > 0) result += ' ';
      result += `${months} ${months > 1 ? t('month') : t('months')}`;
    }

    return result;
  };
  const styles = StyleSheet.create({
    containerTop: {
      backgroundColor: '#f4f4f2',
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderColor: COLORS.n2,
      borderWidth: 1,
    },
    textTn: {
      color: COLORS.primary,
      fontSize: 16,
      paddingEnd: 10,
      fontFamily: 'Roboto-Regular',
    },
    textHead: {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      textAlign: 'center',
    },
    textContent: {
      color: COLORS.n4,
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      textAlign: 'center',
    },
    head1: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    head2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    head3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    head4: {
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    head5: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cellContent: {
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderColor: '#526377',
      borderWidth: 0.5,
    },
  });
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.containerTop}>
        <Text style={styles.textTn}>{t('record_of_work_injuries')}</Text>
        <Text
          style={{
            marginTop: 4,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            color: COLORS.n4,
            paddingEnd: 10,
          }}>
          {t('accumulated_time')}:{' '}
          {convertMonthToYearMonth(userInfo.tong_tham_gia_bhtnld)}
        </Text>
        {/* <Text
          style={{
            marginTop: 4,
            fontFamily: 'Roboto-Regular',
            fontSize: 14,
            color: COLORS.secondary4,
            paddingEnd: 10,
          }}>
          Tổng thời gian chậm đóng: 0 {t('month')}
        </Text> */}
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#3A679E',
            marginHorizontal: 10,
            borderColor: '#526377',
            borderWidth: 0.5,
             paddingVertical:8,
            alignItems:'center'
          }}>
          <View style={styles.head1}>
            <Text style={styles.textHead}>{t('from')}</Text>
          </View>
          <View style={styles.head2}>
            <Text style={styles.textHead}>{t('to')}</Text>
          </View>
          <View style={styles.head3}>
            <Text style={styles.textHead}>{t('employer')}</Text>
          </View>
          <View style={styles.head4}>
            <Text style={styles.textHead}>{t('jobTitle')}</Text>
          </View>
          <View style={styles.head5}></View>
        </View>

        {userInfo.qt_bhyt?.map(item => (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              borderColor: '#526377',
              borderWidth: 1,
              borderTopWidth:0,
            }}>
            <View style={[styles.head1, styles.cellContent]}>
              <Text style={styles.textContent}>{item.tu_thang}</Text>
            </View>
            <View style={[styles.head2, styles.cellContent]}>
              <Text style={styles.textContent}>{item.den_thang}</Text>
            </View>
            <View style={[styles.head3, styles.cellContent]}>
              <Text style={styles.textContent}>{item.don_vi_cong_tac}</Text>
            </View>
            <View style={[styles.head4, styles.cellContent]}>
              <Text style={styles.textContent}>{item.nghe_nghiep}</Text>
            </View>
            <View style={[styles.head5, styles.cellContent]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Detail-D', {data: item,index:2});
                }}>
                <Image
                  style={{width: 20, height: 20, tintColor: '#3a679e'}}
                  source={images.eye_1}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BHTNLDScreen;
