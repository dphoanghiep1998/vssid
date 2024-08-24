import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {COLORS} from '../constants';
import {images} from '../constants/theme';

const QuaTrinhThamGiaScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            height: 60,
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
            {t('entitlementInfor')}
          </Text>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default QuaTrinhThamGiaScreen;
