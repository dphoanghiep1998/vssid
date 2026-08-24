import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../constants/theme';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const InfoLoginScreen = ({navigation}) => {
  const {t} = useTranslation();
  const [loadingVisible, setLoadingVisible] = useState(true);
  const hideSpinner = () => {
    setLoadingVisible(false);
  };
  const webview = useRef(null);
  const [textError, setTextError] = useState(t('ocurred'));
  const [shouldShowError, setShouldShowError] = useState(false);
  const insets = useSafeAreaInsets();
  const displayError = () => {
    Alert.alert(
      t('no_internet'),
      t('require_internet_connection'),
      [{text: t("reload"), onPress: () => webview?.current?.reload()}],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.gradient1, COLORS.gradient3]}
        style={{
          height: 60 + insets.top,
          paddingTop: insets.top,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center', // Center items vertically within LinearGradient
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginStart: 10,
            width: 40,
            height: 40,
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
      </LinearGradient>
      <WebView
        ref={webview}
        onError={() => {
          hideSpinner();
          displayError()
        }}
        renderError={() => {<View></View>}}
        onLoad={() => hideSpinner()}
        source={{
          uri: 'https://baohiemxahoi.gov.vn',
        }}
      />
      {loadingVisible && (
        <ActivityIndicator
          style={{position: 'absolute', top: 100, bottom: 0, right: 0, left: 0}}
          size="small"
        />
      )}
      {/* {shouldShowError && (
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
                onPress={() => {
                  setShouldShowError(false);
                  if (webview != null && webview.current != null) {
                    webview.current.reload();
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
                  {t('close')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )} */}
    </View>
  );
};

export default InfoLoginScreen;
