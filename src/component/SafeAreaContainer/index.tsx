import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import LoadingView from '../LoadingView';

const SafeAreaContainer = ({
  children,
  backgroundColorTop = 'white',
  backgroundColorBottom = 'white',
  barStyle = 'dark-content',
  showLoader = false,
}: any) => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: backgroundColorTop}} />
      <SafeAreaView style={{flex: 1, backgroundColor: backgroundColorBottom}}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColorTop} />
        {children}
        <LoadingView showLoader={showLoader} />
      </SafeAreaView>
    </>
  );
};

export default SafeAreaContainer;
