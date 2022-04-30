import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontFamily, fontSize, icons, images } from "../../assets";
import { colors } from "../../styles/colors";
import { CONST } from "../../utils/constant";


function TopNavigation({ isHomeTab, title, navigation, position }) {
  return isHomeTab ? (
    <HomeTopBar navigation={navigation} />
  ) : (
    <SettingTopBar title={title} navigation={navigation} position={position} />
  );
}
const HomeTopBar = ({ navigation }) => {
  const styles = StyleSheet.create({
    rootView: {
      height: hp(6),
      marginHorizontal: hp(3),
      marginTop: hp(2),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    appNameTxt: {
      fontSize: fontSize.fs20,
      fontFamily: fontFamily.lt93Black,
      color: colors.white,
    },
    rightTopIcons: {
      height: hp(2.5),
      width: hp(2.5),
      resizeMode: "center",
      padding: hp(2)
    },
  });
  return (
    <View style={styles.rootView}>
      <Text style={styles.appNameTxt}>MAPPN</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback hitSlop={CONST.hitSlop}
          onPress={() => {
            navigation.navigate('CreateNewAlbum', { type: 'home' })
          }}
        >
          <Image
            style={[styles.rightTopIcons, { marginRight: hp(2) }]}
            source={icons.add}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback hitSlop={CONST.hitSlop}
          onPress={() => {
            navigation.navigate("FriendListScreen");
          }}
        >
          <Image style={[styles.rightTopIcons, { height: hp(4.5), width: hp(4.5) }]} source={images.addFriends} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const SettingTopBar = ({ title, navigation, position }) => {
  const styles = StyleSheet.create({
    rootView: {
      height: hp(6),
      marginHorizontal: hp(1),
      marginTop: hp(3),
      flexDirection: "row",
      // position: position,
      alignItems: "center",
    },
    backImage: {
      marginLeft: hp(2),
      height: hp(4),
      width: hp(4),
      // backgroundColor:'red',
    },
    titleTxt: {
      alignSelf: "center",
      textAlign: "center",
      fontSize: fontSize.fs18,
      fontFamily: fontFamily.bold,
      position: "absolute",
      width: Dimensions.get("screen").width,
      color: colors.white,
    },
  });
  return (
    <View style={styles.rootView}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Image style={styles.backImage} source={images.backArrow} />
      </TouchableOpacity>
      <Text style={styles.titleTxt}>{title}</Text>
    </View>
  );
};
export default TopNavigation;
