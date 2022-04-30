import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles/colors";
import { icons, images } from "../../assets";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
function CameraScreen({ navigation }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isFlashOn, setIsFlashOn] = useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  function uploadFileToS3Bucket(){
    const upload = Storage.put(file.name, file, {
      resumable: true,
      completeCallback: (event) => {
          console.log(`Successfully uploaded ${event.key}`);
      },
      progressCallback: (progress) => {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      errorCallback: (err) => {
          console.error('Unexpected error while uploading', err);
      }
})
  }


  const takePhoto = async () => {
    const snapshot = await camera.current.takePhoto({
      flash: isFlashOn ? "on" : "off",
    });

    if (!isEmpty(snapshot)) {
      console.log("url--"+JSON.stringify(snapshot.path))
      uploadFileToS3Bucket()
      navigation.navigate("ShareImage", { snapshot });
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = () => {
    Camera.getCameraPermissionStatus();
    Camera.requestCameraPermission();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <View style={{ flex: 1, backgroundColor: colors.black }}>
        {device == null ? (
          <LoadingView />
        ) : (
          <View
            style={{
              flex: 1,
              marginVertical: hp(6),
              marginHorizontal: hp(2.8),
            }}
          >
            <Camera
              ref={camera}
              style={{
                width: "auto",
                borderRadius: hp(1.5),
                top: hp(2),
                height: hp(52),
              }}
              device={device}
              isActive={isFocused}
              photo={true}
            />

            <TouchableOpacity
              onPress={() => setIsFlashOn(!isFlashOn)}
              style={{
                position: "absolute",
                bottom: hp(1),
                left: hp(4),
              }}
            >
              <Image
                source={isFlashOn ? icons.cameraFlashOn : icons.cameraFlashOff}
                style={{ height: hp(6), width: hp(6), resizeMode: 'contain' }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePhoto}
              style={{
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              <Image source={icons.cameraClick} style={{ height: hp(9), width: hp(9), resizeMode: 'contain' }} />
            </TouchableOpacity>
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
