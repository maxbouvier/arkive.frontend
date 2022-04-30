import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import SignupNameUserName from "../screens/auth/SignupNameUserName";
import SignupVerification from "../screens/auth/SignupVerification";
import SignupProfilePic from "../screens/auth/SignupProfilePic";
import PermissionsScreen from "../screens/auth/PermissionsScreen";
import SettingScreen from "../screens/homeTabs/SettingScreen";
import TabNavigation from "./TabNavigation";
import FriendListScreen from "../screens/homeTabs/FriendListScreen";
import ProfileSettings from "../components/modals/ProfileSettings";
import ShareImage from "../components/modals/ShareImage";
import CreateNewAlbum from "../components/modals/CreateNewAlbum";
import AlbumGrid from "../screens/main/AlbumGrid";
import EditAlbum from "../components/modals/EditAlbum";
import ManageMembers from "../components/modals/ManageMembers";
import { useDispatch, useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { access_token, fullName, userName } = useSelector((state) => state.authSlice);
  console.log("Respponse --" + JSON.stringify(access_token));
  const isLoggedIn = (access_token != "") ? true : false
  console.log("isLoggedIn --" + JSON.stringify(isLoggedIn));
  return (
    <Stack.Navigator
      // initialRouteName="SignupProfilePic"
      initialRouteName={isLoggedIn ? "TabNavigation" : "OnBoardingScreen"}
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
        // animation: "slide_from_right",
      }}
    >

      <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SignupVerification" component={SignupVerification} />
        <Stack.Screen name="SignupNameUserName" component={SignupNameUserName} />
        <Stack.Screen name="SignupProfilePic" component={SignupProfilePic} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="FriendListScreen" component={FriendListScreen} />
        <Stack.Screen name="AlbumGrid" component={AlbumGrid} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "transparentModal", cardOverlayEnabled: true }}>
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="ShareImage" component={ShareImage} />
        <Stack.Screen name="CreateNewAlbum" component={CreateNewAlbum} />
        <Stack.Screen name="EditAlbum" component={EditAlbum} />
        <Stack.Screen name="ManageMembers" component={ManageMembers} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
