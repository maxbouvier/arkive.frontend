import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Image, Text, Button, View, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import { fontFamily, fontSize, icons, images } from "../../assets";
import TopNavigation from "../../common/component/TopNavigation";
import { colors } from "../../styles/colors";
function ProfileScreen({ navigation }) {
  const { userName, fullName } = useSelector((state) => state.authSlice);
  console.log("Respponse --" + JSON.stringify(userName));
  const onPressSettings = () => {
    navigation.navigate("ProfileSettings");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation isHomeTab={true} navigation={navigation} />
      <View style={styles.userInfoContainer}>
        <Image source={images.staticProfile} style={styles.profileImage} />
        <Text style={styles.userName}>{fullName}</Text>
        <Text style={styles.userId}>{userName}</Text>
        <TouchableWithoutFeedback onPress={onPressSettings}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Settings</Text>
            <Image source={icons.editDetails} style={styles.editIcon} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.appInfoContainer}>
        <Text style={styles.appInfoText}>{`“apper” since May 2022`}</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    height: hp(16),
    width: hp(16),
    resizeMode: "contain",
  },
  userName: {
    marginTop: hp(2.5),
    color: colors.white,
    fontSize: fontSize.fs20,
    fontFamily: fontFamily.lt93Black,
  },
  userId: {
    marginTop: hp(1.2),
    color: colors.shuttleGray,
    fontSize: fontSize.fs16,
    fontFamily: fontFamily.medium,
  },
  appInfoContainer: {
    flex: 0.12,
    alignItems: "center",
  },
  appInfoText: {
    color: colors.shuttleGray,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fs12,
    marginTop: hp(1.5),
  },
  btnContainer: {
    flexDirection: "row",
    backgroundColor: colors.shark,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    borderRadius: hp(1.5),
    alignItems: "center",
    marginTop: hp(3.5),
  },
  btnText: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.fs14,
  },
  editIcon: {
    marginStart: hp(1.5),
    resizeMode: "center",
    height: hp(2.5),
    width: hp(2.5),
  },
});
