import {View, Text, ActivityIndicator, SafeAreaView, Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';
import {useTranslation} from 'react-i18next';

const PublicServiceScreen = () => {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const hideSpinner = () => {
    setLoadingVisible(false);
  };
  const {t} = useTranslation();
  const webview = useRef(null);
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
          hideSpinner();
          displayError();
        }}
        onLoad={() => hideSpinner()}
        renderError={() => <View></View>}
        source={{
          uri: 'https://baohiemxahoi.gov.vn/dich-vu-cong/Pages/default.aspx',
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

export default PublicServiceScreen;
