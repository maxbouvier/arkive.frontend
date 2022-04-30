import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors } from './styles/colors';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import {store,persistor} from "./reduxstore/index";
import FlashMessage from "react-native-flash-message";

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ]);

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.black}
          />
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
        <FlashMessage position="top" /> 
      </PersistGate>
    </Provider>
  );
};

export default App;
