import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { images, icons, fontFamily } from "../../assets";
import AuthTitleTxt from "../../common/component/AuthTitleTxt";
import BottomBtn from "../../common/component/BottomBtn";
import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
const PermissionsScreen = ({ navigation }) => {
  const [permissionList, setpermissionList] = useState([
    {
      title: "Camera",
      subTitle: "So you can capture moments with Mappn",
      src: icons.camera,
      isSelected: false,
    },
    {
      title: "Notifications",
      subTitle: "So you know what your friends are up to and when they post",
      src: icons.notifications,
      isSelected: false,
    },
    {
      title: "Contacts",
      subTitle: "So you can add friends and share moments with them",
      src: icons.contact,
      isSelected: false,
    },
  ]);

  const PermissionListComp = ({ item, index }) => {
    const style = StyleSheet.create({
      rootView: {
        flexDirection: "row",
        height: Dimensions.get("window").height / 7,
        marginTop: index == 0 ? 20 : 12,
        backgroundColor: item.isSelected ? colors.darkerGray : colors.shark,
        justifyContent: "space-between",
        marginHorizontal: 20,
        borderRadius: 16,
      },
    });
    const updatePermissionSelction = (index) => {
      let newArr = [...permissionList]; // copying the old datas array
      newArr[index].isSelected = true; // replace e.target.value with whatever you want to change it to
      setpermissionList(newArr);
    };
    return (
      <TouchableWithoutFeedback onPress={() => updatePermissionSelction(index)}>
        <View style={style.rootView}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginLeft: 16,
              flexDirection: "row",
            }}
          >
            <Image style={{ marginRight: 16 }} source={item.src} />
            <View style={{ flex: 1, alignContent: "center", marginRight: 18 }}>
              <Text
                style={{ fontWeight: "700", fontSize: 18, color: colors.white }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  marginTop: 3,
                  fontSize: 11,
                  color: colors.shuttleGray,
                }}
              >
                {item.subTitle}
              </Text>
            </View>
          </View>
          <Image
            style={{ alignSelf: "center", marginRight: 16 }}
            source={item.isSelected ? icons.selection : icons.deSelection}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <TopNavigation isHomeTab={false} title={""} />
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.15, justifyContent: "flex-end" }}>
          <AuthTitleTxt
            title={"Mappn works better"}
            subTitle={"with access to..."}
          />
        </View>
        <View
          style={{
            flex: 0.85,
            marginTop: Dimensions.get("screen").height / 16,
          }}
        >
          {permissionList.map((item, index) => {
            return <PermissionListComp key={index} index={index} item={item} />;
          })}
          <BottomBtn
            title={"Next"}
            setOnPress={() => navigation.navigate("SignupProfilePic")}
            isSelectedBg={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PermissionsScreen;
