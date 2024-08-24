import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import { images } from '../constants/theme'
import { useTranslation } from 'react-i18next'

const NoticeScreen = ({navigation}) => {
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
              height:50,
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
                {t("notificationUp")}
              </Text>
            </View>
          </LinearGradient>
        </SafeAreaView>
    </View>
  )
}

export default NoticeScreen