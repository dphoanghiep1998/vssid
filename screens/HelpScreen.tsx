import {View, Text, ActivityIndicator, SafeAreaView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {useTranslation} from 'react-i18next';
const HelpScreen = () => {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const hideSpinner = () => {
    setLoadingVisible(false);
  };
  const webview = useRef(null);
  const {t} = useTranslation();
  const displayError = () => {
    Alert.alert(
      t('no_internet'),
      t('require_internet_connection'),
      [{text: t('reload'), onPress: () => webview?.current?.reload()}],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView />
      <WebView
        ref={webview}
        onError={() => {
          setLoadingVisible(false);
          displayError();
        }}
        renderError={() => <View></View>}
        onLoad={() => hideSpinner()}
        source={{
          uri: 'https://faq.baohiemxahoi.gov.vn/',
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

export default HelpScreen;
