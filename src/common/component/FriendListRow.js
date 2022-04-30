import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../styles/colors";
import { images, fontSize, fontFamily } from "../../assets/index";

function FriendListRow({ isFriendRequest, isFriend }) {
  return (
    <View
      style={{
        height: 50,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{ height: 48, width: 48 }}
        source={images.profilePlaceholder}
      />
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 14,
            fontFamily: fontFamily.bold,
          }}
        >
          Joe Smith
        </Text>
        <Text style={{ color: colors.white, fontSize: fontSize.fs13, marginTop: 3 }}>
          Joey_Smith13
        </Text>
      </View>
      {isFriendRequest ? (
        <View style={{ flexDirection: "row", alignItems: "center", }}>
            <Text style={{ color: colors.white, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.primary, fontFamily: fontFamily.bold }}>
              Accept
            </Text>
          <Image
            style={{ height: 32, width: 32, marginLeft: 22 }}
            source={images.cancel}
          />
        </View>
      ) : isFriend ? (
        <Image
          style={{ height: 32, width: 32, marginLeft: 22 }}
          source={images.cancel}
        />
      ) : (
        <Image style={{ height: 33, width: 80 }} source={images.add} />
      )}
    </View>
  );
}
export default FriendListRow;
