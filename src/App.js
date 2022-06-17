import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors } from './styles/colors';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { store, persistor } from "./reduxstore/index";
import FlashMessage from "react-native-flash-message";
import { navigationRef, navigate, isReadyRef } from './navigation/NavigationReferance';
import { ToastProvider } from 'react-native-toast-notifications';
import { Amplitude } from '@amplitude/react-native';
import { awsConfig, amplitudeKey } from './utils/Configuration';
import Amplify from 'aws-amplify';
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance } from '@notifee/react-native';
Amplify.configure(awsConfig);
export const ampInstance = Amplitude.getInstance();
ampInstance.init(amplitudeKey);
LogBox.ignoreAllLogs()// Ignore log notification by message
// LogBox.ignoreLogs(
//   ["[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",]
//   );

const App = () => {

  useEffect(() => {
    const timer = setTimeout(async () => {
      SplashScreen.hide();
    }, 500);
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // alert("FCM"+JSON.stringify(remoteMessage))
      onDisplayNotification(remoteMessage)
    });


    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    // return messaging().onTokenRefresh(token => {
    //   console.log("token-"+JSON.stringify(token))
    // });
    return () => {
      clearTimeout(timer);
      isReadyRef.current = false
      unsubscribe()
    }
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

    }
  }

  async function onDisplayNotification(notificationData) {
    // {"messageId":"1655281043332932","data":{"name":"ajali"},"notification":{"title":"title"},"from":"839938478359"}
    console.log("notificationData--" + JSON.stringify(notificationData))
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Arkive",
      body: notificationData.notification.body,
      data: notificationData.data,
      importance: AndroidImportance.HIGH,
      android: {
        channelId,
        pressAction: {
          id: "default",
        },
      }
    });
  }
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("onBackgroundEvent-" + JSON.stringify(type), "==" + JSON.stringify(detail))
    // await notifee.cancelNotification(notification.id);
  });

  //local notification handler
  notifee.onForegroundEvent(({ type, detail }) => {
    // alert("detail--"+JSON.stringify(detail))
    const { data } = detail.notification
    if (type == 1) {
      if (data.type == 1 || data.type == 2)
        navigate("FriendListScreen")
      else if (data.type == 3) {
        // alert("data.type == 3")
        navigate("AlbumScreen", { _id: data.album_id, is_admin: 0 })
      }else if(data.type == 4){

      }else if(data.type == 5){

      }
    }
  });

  //push notification handler
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log("remoteMessage : ", JSON.stringify(remoteMessage));

  });

  // async localNotification(remoteMessageData) {
  //   // Display a notification
  //   // Create a channel
  //   console.log("Local Notification ====" + JSON.stringify(remoteMessageData));
  //   // console.log(JSON.stringify(remoteMessageData))
  //   const channelId = await notifee.createChannel({
  //     id: "default",
  //     name: "Default Channel",
  //   });

  //   await notifee.displayNotification({
  //     // title: remoteMessageData.notification.title,
  //     body: remoteMessageData.notification.body,
  //     data: remoteMessageData.data,
  //     importance: AndroidImportance.HIGH,
  //     android: {
  //       channelId,
  //       pressAction: {
  //         id: "default",
  //       },
  //       smallIcon: "ic_notification_icon",
  //       // color: "#04CFEB",
  //       style: {
  //         type: AndroidStyle.BIGTEXT,
  //         text: remoteMessageData.notification.body,
  //       },
  //     },
  //   });
  //   // setTimeout(() => {
  //   //   console.log("REMOVE NOTIFICATION 🔥🤓🔥🤓🔥🤓", remoteMessageData.data);
  //   //   notifee.cancelAllNotifications();
  //   // }, 4000);
  // }
  //push notification handler
  messaging().onNotificationOpenedApp((remoteMessage) => {
    // alert("remoteMessage--" + JSON.stringify(remoteMessage))
    const { data } = remoteMessage.notification
    if (data.type == 1 || data.type == 2)
      navigate("FriendListScreen")
    else if (data.type == 3)
      navigate("AlbumScreen", { _id: data.album_id, is_admin: 0 }) //0 not admin , 1  = admin, 2 = user private album (admin)

  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.black} />
          <NavigationContainer ref={navigationRef} onReady={() => { isReadyRef.current = true }}>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
        <FlashMessage position="top" floating={true} style={{ backgroundColor: "red" }} hideStatusBar={false} />
      </PersistGate>
    </Provider>
  );
};

export default App;
