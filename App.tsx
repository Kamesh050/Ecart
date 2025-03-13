import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomTabNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
