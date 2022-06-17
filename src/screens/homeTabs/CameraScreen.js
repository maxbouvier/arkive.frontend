import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import { colors } from "../../styles/colors";
import { fontFamily, fontSize, icons, images } from "../../assets";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { goToSetting } from '../../utils/Configuration'
import { check, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { storeAuthData } from "../../reduxstore/AuthSlice";
import { post, apiPath } from "../../Api/ApiCalling";
function CameraScreen({ navigation }) {
  const { userName, fullName, profile_photo, access_token, userId, photo_count, profile_created } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const camera = useRef();
  const devices = useCameraDevices('wide-angle-camera')
  // const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();
  const takePhoto = async () => {
    const snapshot = await camera.current.takePhoto({
      enableAutoStabilization: true,
      skipMetadata: true,
      photoCodec: 'jpeg',
      quality: 100,
      flash: isFlashOn ? "on" : "off",
    });

    if (!isEmpty(snapshot)) {
      var index = snapshot.path.lastIndexOf("/") + 1;
      var filename = snapshot.path.substr(index);
      var filePath = Platform.OS == 'ios' ? snapshot.path : 'file://' + snapshot.path
      navigation.navigate('ShareImageToAlbum', { snapshot: filePath, imageName: filename })
    }
  };
  const permissionCheck = async () => {
    check([PERMISSIONS.IOS.CAMERA]).then((statuses) => {
      console.log("statuses[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED--" + statuses[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED)
      if (statuses == RESULTS.GRANTED) {
        return true
      } else {
        return false
        goToSetting("", "Camera permission is required ,so you can capture moments with Arkive.")
      }
    });
  }
  useEffect(() => {
    //on focus 
    const unsubscribe = navigation.addListener('focus', () => {
      getPhotoCountFromProfile()
    });
    return unsubscribe;
  }, []);
  const getPhotoCountFromProfile = async () => {
    const requestData = {
      full_name: fullName,
      username: userName,
      // profile_photo: profile_photo
    };
    const { isSucess, data } = await post(apiPath.userProfile, requestData);
    if (isSucess) {
      dispatch(storeAuthData({
        access_token: access_token,
        userName: data.username,
        fullName: data.full_name,
        userId: data._id,
        profile_photo: profile_photo,
        photo_count: data.photo_count,
        profile_created: profile_created
      }))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={{ flex: 1, backgroundColor: colors.black }}>
        {device == null ? (
          <LoadingView />
        ) : (
          <View style={{ flex: 1, marginVertical: hp(1.5), marginHorizontal: 20, }}>
            <Text style={{ alignSelf: "center", color: colors.white, fontFamily: fontFamily.ltBlack, fontSize: fontSize.fs20 }}>{photo_count}/10 films</Text>
            <Text style={{ alignSelf: "center", marginTop: 4, color: colors.white, fontFamily: fontFamily.light, fontSize: fontSize.fs13 }}>New pack every Monday at 9am</Text>
            <Camera
              ref={camera}
              style={{
                width: "auto",
                borderRadius: hp(1.5),
                top: hp(2),
                height: hp(58),
              }}
              device={device}
              isActive={true}
              photo={true}
              orientation="portrait"
            />

            {photo_count > 0 ?
              <TouchableOpacity
                onPress={() => setIsFlashOn(!isFlashOn)}
                style={{
                  position: "absolute",
                  bottom: hp(4),
                  left: hp(4),
                }}
              >
                <Image
                  source={isFlashOn ? icons.cameraFlashOn : icons.cameraFlashOff}
                  style={{ height: hp(6), width: hp(6), resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              : null}
            {photo_count > 0 ?
              <TouchableOpacity onPress={() => permissionCheck() ? takePhoto() : null} style={{ position: "absolute", bottom: hp(2.5), alignSelf: "center", }}>
                <Image source={icons.cameraClick} style={{ height: hp(9), width: hp(9), resizeMode: 'contain' }} />
              </TouchableOpacity>
              : null}
          </View>
        )}
        {imageUrl !== "" ? (
          <View
            style={{
              height: 120,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 40,
              alignItems: "center",
            }}
          >
            <Image style={{ height: 48, width: 48 }} source={images.retake} />
            {/* <TouchableOpacity onPress={() => {   navigation.navigate('HomeScreen')}}> */}
            <Image style={{ height: 48, width: 48 }} source={images.confirm} />
            {/* </TouchableOpacity> */}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );


}
export default CameraScreen;

const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Camera</Text>
    </View>
  );
};
