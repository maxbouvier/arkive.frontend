import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableNativeFeedback,
  Text,
  Platform,
  PermissionsAndroid,
  StatusBar,
  AppState
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize, images } from '../../assets';
import AuthTitleTxt from '../../common/component/AuthTitleTxt';
import BottomBtn from '../../common/component/BottomBtn';
import { colors } from '../../styles/colors';
import { requestMultiple, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthData } from '../../reduxstore/AuthSlice';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { post, apiPath } from '../../Api/ApiCalling';
import CustomActionSheet from '../../components/CustomActionSheet';
import { Storage } from 'aws-amplify';
import { showMessage } from 'react-native-flash-message';
import { goToSetting } from '../../utils/Configuration'
import { addEvent, eventsNames } from '../../utils/AmplitudeEvents';
import messaging from "@react-native-firebase/messaging";
// import awsConfig from '../../utils/AWS-Config.json';
const SignupProfilePic = ({ navigation, route }) => {
  const { access_token, full_name, username, profile_created } = route.params;
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState("")
  const [profile, setProfile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  // 
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    requestMultiple([PERMISSIONS.IOS.CAMERA,
    // PERMISSIONS.ANDROID.CAMERA,
    // PERMISSIONS.ANDROID.READ_CONTACTS,
    PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
      requestUserPermission();
      if (statuses[PERMISSIONS.IOS.CAMERA] != RESULTS.GRANTED) {
        goToSetting("", "Camera permission is required ,so you can capture moments with Arkive.")
      } 
       if (statuses[PERMISSIONS.IOS.CONTACTS] != RESULTS.GRANTED)
        goToSetting("", "Contact permission is required ,so you can add friends and share moments with them.")
    });
   
     
  }, []);

  const options = {
    mediaType: 'photo',
    // quality: 0.8,
    maxHeight: 240,
    maxWidth: 240,
  }
  
  const permissionCheck = async () => {
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
      var cameraStatus = false
      var contactStatus = false
      if (statuses[PERMISSIONS.IOS.CAMERA] == RESULTS.GRANTED) {
        cameraStatus = true
      } else {
        goToSetting("", "Camera permission is required ,so you can capture moments with Arkive.")
        cameraStatus = false
      }
      //
      if (statuses[PERMISSIONS.IOS.CONTACTS] == RESULTS.GRANTED) {
        contactStatus = true
      } else {
        contactStatus = false
        goToSetting("", "Contact permission is required ,so you can add friends and share moments with them.")
      }
      if (contactStatus && cameraStatus)
        console.log("permissionCheckpermissionCheck-" + true)
      else
        console.log("permissionCheckpermissionCheck-" + false)
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('CONTACTS', statuses[PERMISSIONS.IOS.CONTACTS]);
    });
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);

    }
  }
  const onClickCamera = async () => {
    const result = await launchCamera(options);
    setShowLogoutSheet(false);
    if (result.assets == undefined) { }
    else {
      setProfile(result.assets[0]);
    }
    console.log("Image" + JSON.stringify(result))
  }
  const onClickGallery = async () => {
    const result = await launchImageLibrary(options);
    setShowLogoutSheet(false);
    if (result.assets == undefined) { }
    else {
      setProfile(result.assets[0]);
    }



  }
  const sendToS3Bucket = async () => {
    setIsLoading(true);
    var file = profile.uri;
    var fileName = profile.fileName
    var imageType = profile.type
    const response = await fetch(file);
    const blob = await response.blob();
    Storage.put('profile/' + fileName, blob, {
      level: 'public',
      contentType: imageType,
      // progressCallback(uploadProgress) {
      //   console.log(
      //     `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
      //   );
      // },
    })
      .then(async res => {
        console.log(`Successfully uploaded ${res.key}`);
        handleClickonNext(profile.fileName)
      })
      .catch(err => {
        setIsLoading(false);
        showMessage({ message: "Oops, Something Went Wrong" })
      });

  }
  const onClickCancel = () => {
    setShowLogoutSheet(false)
  }
  const onClickOpenActionSheet = () => {
    setShowLogoutSheet(true)
  }
  const handleClickonNext = async (image) => {
    const requestData = {
      full_name: full_name,
      username: username,
      device_version: '',
      profile_photo: image
    };
    const { isSucess, data } = await post(apiPath.userProfile, requestData);
    if (isSucess) {
      setIsLoading(false)
      dispatch(storeAuthData({
        access_token: access_token,
        userName: username,
        fullName: full_name,
        userId: data._id,
        profile_photo: data.profile_photo,
        photo_count: data.photo_count,
        profile_created: profile_created
      }))
      // console.log("response-" + JSON.stringify(data))
      if (image == null)
        addEvent(eventsNames.PROFILEDONE)
      else
        addEvent(eventsNames.PROFILESKIP)
      navigation.replace('TabNavigation')
    } else {
      setIsLoading(false)
    }
  }
  return (
    <AuthTitleTxt isBackBtn={profile == '' ? true : false} navigation={navigation} title={'Hey ' + appStateVisible} subTitle={'Add a profile pic!'} >
      <View style={{ marginTop: hp(5) }}>
        <Image style={{
          alignSelf: 'center', height: hp(16),
          width: hp(16),
          borderRadius: 150 / 2,
          overflow: "hidden",
          resizeMode: "cover",
        }} resizeMode="cover" source={(profile == '') ? images.profilePlaceholder : { uri: profile.uri }} />
        <TouchableNativeFeedback onPress={onClickOpenActionSheet}>
          <Text style={{ color: colors.primary, fontSize: fontSize.fs18, fontWeight: '700', alignSelf: 'center', marginTop: 23, }}>Add a photo</Text>
        </TouchableNativeFeedback>
        <BottomBtn isLoading={isLoading} title={'Next'} setOnPress={() => permissionCheck()?sendToS3Bucket():null} isSelectedBg={profile == '' ? true : true} />
        {profile == '' ? <Pressable onPress={() => permissionCheck() ?handleClickonNext(null) :null}>
          <Text style={{ color: colors.white, fontSize: fontSize.fs13, fontWeight: '700', fontFamily: fontFamily.light, textAlign: 'center', marginTop: hp(3) }}>Skip</Text>
        </Pressable> : null}
      </View>
      <CustomActionSheet
        title="Camera"
        isMultipleOptions={true}
        secondTitle="Gallery"
        onPressTitle={onClickCamera}
        onPressCancel={onClickCancel}
        isVisible={showLogoutSheet}
        onPressSubTitle={onClickGallery}
        bottomSheetContainerStyle={{ marginBottom: hp(6) }} />
    </AuthTitleTxt>


  );
};
export default SignupProfilePic;
