import React, { useState, useRef, useMemo, useCallback } from "react"
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors"
import { fontFamily, fontSize } from "../../assets"
import CustomModalView from "../../components/CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import CustomActionSheet from "../../components/CustomActionSheet"
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthData } from "../../reduxstore/AuthSlice";
import { post, apiPath } from '../../Api/ApiCalling';
const ProfileSettings = ({ navigation }) => {
  //ref

  //varibales and states
  const { userName, fullName, profile_photo, access_token, userId, photo_count, profile_created } = useSelector((state) => state.authSlice);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false)
  const [newFullname, setNewFullname] = useState(fullName);
  const [newUserName, setNewUserName] = useState(userName);
  const dispatch = useDispatch();

  //Actions
  const onClose = () => {
    navigation.goBack()
  }

  const onDone = async () => {
    const requestData = {
      full_name: newFullname,
      username: newUserName,
      // profile_photo: profile_photo
    };
    const { isSucess, data } = await post(apiPath.userProfile, requestData);
    if (isSucess) {
      dispatch(storeAuthData({
        access_token: access_token,
        userName: data.username,
        fullName: data.full_name,
        userId: data._id,
        profile_photo: profile_photo,
        photo_count: photo_count,
        profile_created: profile_created
      }))
      navigation.goBack()
    }

  }
  const onLogout = () => {
    setShowLogoutSheet(!showLogoutSheet)
  }

  const navigateToLogin = async () => {
    setShowLogoutSheet(false);
    const { isSucess } = await post(apiPath.logout, {});
    if (isSucess) {
      dispatch(storeAuthData({ access_token: "", userName: "", fullName: "", profile_photo: '', userId: '', photo_count: 0, profile_created: "" }));
      navigation.goBack();
      navigation.reset({
        index: 0,
        routes: [
          { name: 'OnBoardingScreen' },]
      })
    }
  }
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <CustomModalView
      isDoneDisabled={(newFullname != '' && newUserName != '') ? false : true}
      name="Profile Settings" backgroundColor={colors.shark} onPressClose={onClose} onPressDone={onDone} >
      <View style={styles.userDetailContainer}>
        <CustomTextInput
          title={"Name"}
          withIcon
          onChangeText={(value) => setNewFullname(value)}
          value={newFullname}
          placeholder={"enter name"}
        />
        <CustomTextInput
          title={"Username"}
          withIcon
          onChangeText={(value) => setNewUserName(value)}
          value={newUserName}
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
