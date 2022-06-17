import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import SignupNameUserName from "../screens/auth/SignupNameUserName";
import SignupVerification from "../screens/auth/SignupVerification";
import SignupProfilePic from "../screens/auth/SignupProfilePic";
import TabNavigation from "./TabNavigation";
import FriendListScreen from "../screens/homeTabs/FriendListScreen";
import ProfileSettings from "../screens/homeTabs/ProfileSettings";
import ShareImageToAlbum from "../screens/album/ShareImageToAlbum";
import CreateNewAlbum from "../screens/album/CreateNewAlbum";
import AlbumGrid from "../screens/album/AlbumGrid";
import EditAlbum from "../screens/album/EditAlbum";
import ManageMembers from "../screens/album//ManageMembers";
import { useSelector } from 'react-redux';
import HomeScreen from "../screens/homeTabs/HomeScreen";
import AlbumScreen from "../screens/album/AlbumScreen";
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { access_token, fullName, userName } = useSelector((state) => state.authSlice);
  console.log("Respponse --" + JSON.stringify(fullName));
  const isLoggedIn = (fullName != null && fullName != "") ? true : false
  console.log("isLoggedIn --" + JSON.stringify(isLoggedIn));
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gesturesEnabled: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="SignupVerification" component={SignupVerification} />
            <Stack.Screen name="SignupNameUserName" component={SignupNameUserName} />
            <Stack.Screen name="SignupProfilePic" options={{ headerLeft: () => null, }} component={SignupProfilePic} />
          </Stack.Group>
        </>) : <>
        <Stack.Group screenOptions={{
          presentation: 'modal',
          headerMode: 'none',
          gestureEnabled: true,
          cardOverlayEnabled: true,
        }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="FriendListScreen" component={FriendListScreen} />
          <Stack.Screen name="AlbumGrid" component={AlbumGrid} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
          <Stack.Screen name="ShareImageToAlbum" component={ShareImageToAlbum} />
          <Stack.Screen name="CreateNewAlbum" component={CreateNewAlbum} />
          <Stack.Screen name="EditAlbum" component={EditAlbum} />
          <Stack.Screen name="ManageMembers" component={ManageMembers} options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        </Stack.Group>

      </>}

    </Stack.Navigator>
  );
}
