import React, { useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors"
import { fontFamily, fontSize } from "../../assets"
import CustomModalView from "../CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import CustomActionSheet from "../CustomActionSheet"
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthData } from "../../reduxstore/AuthSlice";
import { apiCalling, apiPath } from '../../Api/AuthApis';
const ProfileSettings = ({ navigation }) => {
  const { access_token,userName,fullName } = useSelector((state) => state.authSlice);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false)
  const dispatch = useDispatch();
  //Actions
  const onClose = () => navigation.goBack()
  const onDone = async() => {
    const requestData = {
      full_name: 'abcd',
      username: userName,
      // profile_photo
    };
    const { isSucess, data } = await apiCalling(apiPath.userProfile, requestData,access_token);
    if (isSucess){
      dispatch(storeAuthData({ access_token: data.access_token, userName: data.username, fullName: data.full_name }))
      navigation.goBack()
    }
    
  }
  const onLogout = () => setShowLogoutSheet(!showLogoutSheet)

  const navigateToLogin = async () => {
    setShowLogoutSheet(false);
    const { isSucess } = await apiCalling(apiPath.logout, {},access_token);
    if (isSucess) {
      dispatch(storeAuthData({ access_token: "", userName: "", fullName: "" }));
      navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [
          { name: 'OnBoardingScreen' },]
      })
    }
  }

  return (
    <CustomModalView name="Profile Settings" onPressClose={onClose} onPressDone={onDone} >

      <View style={styles.userDetailContainer}>
        <CustomTextInput
          title={"Name"}
          withIcon
          value={fullName}
          placeholder={"enter name"}
        />
        <CustomTextInput
          title={"Username"}
          withIcon
          value={userName}
          placeholder={"enter username"}
        />
      </View>

      <View style={styles.appDetailsContainer}>
        <Pressable style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
        <Text style={styles.appMadeInText}>Made with ❤️ in Los Angeles</Text>
      </View>
      <CustomActionSheet title="Log Out" onPressTitle={navigateToLogin} onPressCancel={onLogout} isVisible={showLogoutSheet} bottomSheetContainerStyle={{ marginBottom: hp(6) }} />
    </CustomModalView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  userDetailContainer: {
    flex: 1,
    marginTop: 10,
  },
  appDetailsContainer: {
    flex: 0.32,
    alignItems: "center",
    marginBottom: hp(8),
    justifyContent: "space-between",
  },
  logoutBtn: {
    alignSelf: "center",
    paddingVertical: hp(2),
    paddingHorizontal: hp(6),
  },
  logoutText: {
    color: colors.secondary,
    fontSize: fontSize.fs16,
    fontFamily: fontFamily.bold,
  },
  appMadeInText: {
    color: colors.gray,
    fontSize: fontSize.fs12,
    fontFamily: fontFamily.light,
  },
});
