import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { fontFamily, fontSize } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors";
function BottomBtn({ title, setOnPress, isSelectedBg, style }) {
  const styles = StyleSheet.create({
    rootView: {
      marginHorizontal:hp(4),
      marginTop: hp(4),
      paddingVertical:hp(2),
      // height:hp(5.5),
      justifyContent:'center',
      backgroundColor: isSelectedBg ? colors.primary : colors.shark,
      borderRadius: hp(1.8),
    },
    titleTxt: {
      color: "#FFFFFF",
      fontSize: fontSize.fs13,
      textAlign: "center",
      fontFamily: fontFamily.bold,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={setOnPress}>
      <View style={[styles.rootView, style]}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default BottomBtn;
