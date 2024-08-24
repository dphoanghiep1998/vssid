import {View, Text, ActivityIndicator, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';

const ResearchScreen = () => {
  const [loadingVisible, setLoadingVisible] = useState(true);
  const hideSpinner = () => {
    setLoadingVisible(false)
  };
  return (
    <View style={{flex:1}}>
      <SafeAreaView/>
      <WebView
      onLoad={() => hideSpinner()}
        source={{
          uri: 'https://baohiemxahoi.gov.vn/tracuu/Pages/diem-thu-dai-ly.aspx',
        }}
      />
      {loadingVisible && (
        <ActivityIndicator style={{position:'absolute',top:0,bottom:0,right:0,left:0}} size="small"/>
      )}
    </View>
  );
}

export default ResearchScreen