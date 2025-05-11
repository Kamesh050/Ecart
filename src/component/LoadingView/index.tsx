import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';

const LoadingView = (props: any) => {
  const {showLoader = true} = props;

  if (!showLoader) {
    return <></>;
  }

  return (
    <View style={styles.overlay}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.black}
      />
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          animating={showLoader}
          size="large"
          color={Colors.black}
        />
      </View>
    </View>
  );

  /*
    if (showLoader) {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
        );
    } else {
        return <></>
    }
    */
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -100,
    right: 0,
    bottom: -100,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.lightGray,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingView;
