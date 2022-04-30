import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, Text } from "react-native";
import { images } from "../../assets";
import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
import BottomBtn from "../../common/component/BottomBtn";
function SettingScreen({ navigation }) {
  const [settingsList, setSettingList] = useState([
    { title: "Name", isEditable: true },
    { title: "Username", isEditable: true },
    { title: "Invite Friends" },
    { title: "Share mappn" },
    { title: "Contact Us" },
    { title: "Privacy Policy" },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <TopNavigation
        isHomeTab={false}
        title={"Settings"}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <Image
          source={images.staticProfile}
          style={{ alignSelf: "center", marginTop: 12 }}
        />
        <Text
          style={{
            fontSize: 13,
            color: colors.primary,
            alignSelf: "center",
            marginTop: 8,
            fontWeight: "700",
          }}
        >
          Change Photo
        </Text>
        <View
          style={{
            backgroundColor: colors.darkerGray,
            borderColor: colors.darkerGray,
            borderBottomWidth: 2,
            marginTop: 20,
            marginHorizontal: 20,
          }}
        />
        {settingsList.map((item, index) => {
          return <SettingList key={index} item={item} index={index} />;
        })}
        <BottomBtn title={"Log out"} />
      </View>
    </SafeAreaView>
  );
}
const SettingList = ({ item, index }) => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 14,
            flex: 0.7,
            fontWeight: "700",
            paddingVertical: 20,
            color: colors.white,
          }}
        >
          {item.title}
        </Text>
        {item.isEditable ? (
          <Text
            style={{
              fontSize: 14,
              flex: 1,
              fontWeight: "500",
              padding: 20,
              color: colors.gray,
            }}
          >
            Joe Smith
          </Text>
        ) : null}
        {item.isEditable ? (
          <Image style={{ height: 16, width: 16 }} source={images.editname} />
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: colors.darkerGray,
          borderColor: colors.darkerGray,
          borderBottomWidth: 2,
        }}
      />
    </View>
  );
};
export default SettingScreen;
