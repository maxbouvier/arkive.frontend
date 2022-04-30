import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize } from "../../assets";
import { colors } from "../../styles/colors";
function UserIpTxt({
  placholderValue,
  value,
  keyboardType,
  customStyle,
  onChangeText,
  isSelectedBg
}) {
  const [focus, setFocus] = useState(false);
  const styles = StyleSheet.create({
    txtIp: [
      {
        backgroundColor: colors.darkerGray,
        borderColor: colors.primary,
        borderWidth: focus || isSelectedBg? 2 : 0,
        color: colors.white,
        fontSize:fontSize.fs14,
        marginHorizontal:hp(4),
        borderRadius: hp(1.8),
        // height:hp(7),
        paddingVertical:hp(1.8),
        paddingHorizontal: 18,
        fontFamily: fontFamily.light,
      },
      customStyle,
    ],
  });
  return (
    <TextInput
      style={styles.txtIp}
      placeholder={placholderValue}
      keyboardAppearance="dark"
      caretHidden={focus ? false : true}
      autoFocus={true}
      onTouchStart={() => setFocus(true)}
      onChangeText={onChangeText}
      onBlur={() => (isSelectedBg? setFocus(true) : setFocus(false))}
      value={value}
      selectionColor={colors.primary}
      placeholderTextColor={colors.shuttleGray}
      keyboardType={keyboardType}
    ></TextInput>
  );
}
export default UserIpTxt;
