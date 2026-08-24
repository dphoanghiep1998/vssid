import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants';
import {images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NewsScreen = ({navigation}) => {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const {t} = useTranslation();
  const hideSpinner = () => {
    setLoadingVisible(false);
  };
  const insets = useSafeAreaInsets()
  return (
    <View style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.gradient1, COLORS.gradient3]}
          style={{
            height: 60 + insets.top,
              paddingTop:insets.top,
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
                textTransform: 'uppercase',
                color: COLORS.white,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginStart: -34,
                alignSelf: 'center',
                fontSize: 16,
              }}>
              {t('news')}
            </Text>
          </View>
        </LinearGradient>
      <WebView
        onLoad={() => hideSpinner()}
        source={{
          uri: 'https://baohiemxahoi.gov.vn/tintuc/pages/default.aspx',
        }}
      />
      {loadingVisible && (
        <ActivityIndicator
          style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0}}
          size="small"
        />
      )}
    </View>
  );
};

export default NewsScreen;
