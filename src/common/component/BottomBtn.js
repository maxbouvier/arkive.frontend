import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { fontFamily, fontSize } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors";
function BottomBtn({ title,isMarginRemove, isLoading, setOnPress, isSelectedBg, style }) {
  const styles = StyleSheet.create({
    rootView: {
      marginHorizontal: isMarginRemove?0:hp(4),
      marginTop: hp(4),
      paddingVertical: hp(2),
      // height:hp(5.5),
      justifyContent: 'center',
      backgroundColor: isSelectedBg ? colors.primary : isMarginRemove?colors.darkerGray:colors.shark,
      borderRadius: hp(1.8),
    },
    titleTxt: {
      color:  isSelectedBg?colors.white:isMarginRemove?colors.shuttleGray:colors.white,
      fontSize: fontSize.fs13,
      textAlign: "center",
      fontFamily: fontFamily.bold,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={isSelectedBg && !isLoading ? setOnPress : null}>
      <View style={[styles.rootView, style]}>
        {isLoading ?
          <ActivityIndicator size="small" color={colors.white} />
          : <Text style={styles.titleTxt}>{title}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default BottomBtn;
