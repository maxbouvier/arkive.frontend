import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
//Styles
import { colors } from "../styles/colors";

//Screens
import HomeScreen from "../screens/homeTabs/HomeScreen";
import CameraScreen from "../../src/screens/homeTabs/CameraScreen";
import ProfileScreen from "../../src/screens/homeTabs/ProfileScreen";
import { icons } from "../assets";
import HomeStack from "./Stacks/HomeStack";

const Tab = createBottomTabNavigator();

const TabConfig = ({ route }) => {
  const insets = useSafeAreaInsets();
  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: [
      {
        height: hp(6) + insets.bottom,
        alignItems: "center",
        // backgroundColor:'red',
        borderTopWidth: 0,
        backgroundColor: colors.black,
      },
    ],
    tabBarIcon: ({ focused, color, size }) => {
      return (
        <Image
          style={[
            styles.image,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              tintColor: focused ? colors.primary : null,
            },
          ]}
          source={
            route.name === "HomeStack"
              ? icons.home
              : route.name === "CameraScreen"
                ? icons.camera
                : icons.profile
          }
        />
      );
    },
  };
};

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={TabConfig} initialRouteName="CameraScreen">
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="CameraScreen" component={CameraScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    height: hp(4),
    width: hp(4),
    resizeMode: 'contain'
  },
});
