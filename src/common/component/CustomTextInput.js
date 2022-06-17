import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from "../../styles/colors";
import { fontFamily, fontSize, icons } from "../../assets";
import { commonStyles } from "../../utils/styles";

function CustomTextInput({ title, value, onChangeText,placeholder, containerStyle, withIcon }) {

  const styles = StyleSheet.create({
    container: {
      marginTop: hp(4),
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    textInputStyle: {
      flex: 1,
      color: colors.white,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.fs18,
      paddingEnd: hp(1.5),
    },
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={commonStyles.lightTitle}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          value={value}
          onChangeText={onChangeText}
          keyboardAppearance="dark"
          placeholder={placeholder}
          maxLength={30}
          placeholderTextColor={colors.gray}
          selectionColor={colors.white}
        />
        <Image source={icons.editDetails} style={[commonStyles.iconStyle, { display: withIcon ? 'flex' : 'none' }]} />
      </View>
    </View>
  );
};

export default CustomTextInput;


