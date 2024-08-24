import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../constants'
import { images } from '../constants/theme'
import { useTranslation } from 'react-i18next'

const ThongTinHuongScreen = ({navigation}) => {
    const {t} = useTranslation()
    return (
      <View>
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
                  {t("entitlementInfor")}
                </Text>
              </View>
            </LinearGradient>
          </SafeAreaView>
      </View>
    )
  }

export default ThongTinHuongScreen