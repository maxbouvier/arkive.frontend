import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from "react-native";
import { fontFamily, fontSize, icons, images } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors";
import TopNavigation from "./TopNavigation";
import { CONST } from "../../utils/constant";
function AuthTitleTxt({ title, subTitle, customStyle, navigation, children, isBackBtn }) {
  return (
    <SafeAreaView style={styles.rootView}>
      {isBackBtn ? <Pressable onPress={() => { navigation.goBack() }} hitSlop={CONST.hitSlop} >
        <Image style={{
          left: '8%',
          marginTop: hp(2),
          position: 'absolute',
          height: hp(3),
          width: hp(1.5),
        }} source={icons.back} />
      </Pressable> : false}
      <View style={{ flex: 1, marginTop: hp(16) }}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.subTxt}>{subTitle}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: colors.black
  },
  titleTxt: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSize.fs20,
    fontFamily: fontFamily.lt93Black,
  },
  subTxt: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSize.fs20,
    marginTop: hp(1),
    fontFamily: fontFamily.lt93Black,
  },
});
export default AuthTitleTxt;
