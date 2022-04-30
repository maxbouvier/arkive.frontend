import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { fontFamily, fontSize } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors";
function AuthTitleTxt({ title, subTitle,customStyle,children }) {
  return (
    <SafeAreaView style={styles.rootView}>
      <View style={{flex:1,marginTop:hp(16)}}>
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
