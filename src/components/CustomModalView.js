import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from "../styles/colors";
import { fontFamily, fontSize, icons } from "../assets";
import { CONST } from "../utils/constant";
import CustomNavigationHeader from "../common/component/CustomNavigationHeader";

const CustomModalView = (props) => {

  //Component Properties
  const { children, name, onPressClose, onPressBack, onPressDone, isFullScreen } = props;

  //Common Style
  const commonContainer = {
    flex: 1,
    backgroundColor: colors.shark,
    paddingTop: hp(4),
    paddingHorizontal: hp(4),
    paddingBottom: hp(2),
  }

  //Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: isFullScreen ? 0 : hp(8),
    },
    subContainer: {
      ...commonContainer,
      borderTopLeftRadius: hp(6),
      borderTopEndRadius: hp(6),
    },
    subFullScreenContainer: {
      ...commonContainer,
    }
  });

  return (
    <View style={styles.container}>
      <View style={isFullScreen ? styles.subFullScreenContainer : styles.subContainer}>
        <CustomNavigationHeader
          name={name}
          onPressClose={onPressClose}
          onPressBack={onPressBack}
          onPressDone={onPressDone}
        />
        {children}
      </View>
    </View>
  );
};

export default CustomModalView;


