import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import {QTBHTN, QTBHTNLD, QTBHXH, QTBHYT} from '../data/TYPEOBJECT';

const DetailBHScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const {index} = route.params;
  const {data}: {data: QTBHTN | QTBHTNLD | QTBHXH | QTBHYT} = route.params;

  const formatText = (text: string) => {
    if (text != '') {
      const newText = Number(text);
      return new Intl.NumberFormat('vi-VN').format(newText);
    } else {
      ('');
    }
  };
  const styles = StyleSheet.create({
    text1: {
      color: COLORS.n4,
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
    },
    text2: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Roboto-Regular',
      marginTop: 4,
    },
    containerBorder: {
      flex: 1,
      borderLeftWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#CCE0FA',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginStart: 20,
            width: 20,
            height: 20,
            justifyContent: 'center', // Center image horizontally
            alignItems: 'center', // Center image vertically
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.primary,
            }}
            source={images.back_1}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: 'Roboto-Regular',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginStart: -50,
              alignSelf: 'center',
              fontSize: 18,
            }}>
            {t('detail')}
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 30,
          marginTop: 30,
        }}>
        <Text style={[styles.text1, {flex: 1, textAlign: 'left'}]}>
          {t('from')}: {data.tu_thang}
        </Text>
        <Text style={[styles.text1, {flex: 1, textAlign: 'right'}]}>
          {t('to')}: {data.den_thang}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#3a679e',
          marginHorizontal: 20,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 20,
        }}>
        <Text style={styles.text2}>
          {t('jobTitle')}: {data.nghe_nghiep}
        </Text>
        <Text style={styles.text2}>
          {t('Employer')}: {data.don_vi_cong_tac}
        </Text>
        <Text style={styles.text2}>
          {t('workAddress')}: {data.noi_lam_viec}
        </Text>
        <Text style={styles.text2}>
          {t('currency')}: {data.loai_tien}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <View style={styles.containerBorder}>
          <Text style={[styles.text1, {textAlign: 'center'}]}>
            {index == 0
              ? t('salary_portion_1')
              : index == 1
              ? t('salary_portion_2')
              : index == 2
              ? t('salary_portion_3')
              : t('salary_portion_4')}
          </Text>
        </View>
        <View
          style={[
            styles.containerBorder,
            {alignItems: 'flex-end', borderRightWidth: 1},
          ]}>
          <Text style={[styles.text1]}>{formatText(data.luong_dong)}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <View style={styles.containerBorder}>
          <Text style={[styles.text1, {textAlign: 'center'}]}>
            {t('salary_category')}
          </Text>
        </View>
        <View
          style={[
            styles.containerBorder,
            {alignItems: 'flex-end', borderRightWidth: 1},
          ]}>
          <Text style={styles.text1}>{formatText(data.muc_luong)}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailBHScreen;
