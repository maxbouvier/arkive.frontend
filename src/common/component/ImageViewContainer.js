import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { dummyImages, images } from "../../assets";
import { colors } from "../../styles/colors";

const ImageViewContainer = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 12,
          marginHorizontal: 28,
          alignItems: "center",
        }}
      >
        <Image
          source={images.staticProfile}
          style={{ resizeMode: "contain", height: 52, width: 52 }}
        />
        <View style={{ flex: 1, marginStart: 14 }}>
          <Text style={{ fontSize: 16, color: colors.white }}>Username</Text>
          <Text style={{ fontSize: 14, color: colors.gray }}>Location</Text>
        </View>
        <Text style={{ fontSize: 14, color: colors.white }}>time posted</Text>
      </View>

      <Image
        source={dummyImages.dummy1}
        style={{ width: "100%", height: 500 }}
      />
    </View>
  );
};

export default ImageViewContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    marginTop: 15,
    borderTopLeftRadius: 32,
    borderTopEndRadius: 32,
  },
});
