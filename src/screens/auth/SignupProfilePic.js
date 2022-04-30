import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  TouchableNativeFeedback,
  Text,
  StatusBar,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize, images } from '../../assets';
import AuthTitleTxt from '../../common/component/AuthTitleTxt';
import BottomBtn from '../../common/component/BottomBtn';
import { colors } from '../../styles/colors';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthData } from '../../reduxstore/AuthSlice';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { apiCalling, apiPath } from '../../Api/AuthApis';
import CustomActionSheet from '../../components/CustomActionSheet';
const SignupProfilePic = ({ navigation, route }) => {
  const { access_token, full_name, username } = route.params;
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const [profile, setProfile] = useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.CONTACTS,]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('CONTACTS', statuses[PERMISSIONS.IOS.CONTACTS]);
    });
  }, []);
  const options = {
    mediaType: 'photo'
  }
  const onClickCamera = async () => {
    const result = await launchCamera(options);
    setProfile(result.assets[0].uri.toString());
    console.log("result-" + profile);
    setShowLogoutSheet(false);
  }
  const onClickGallery = async () => {
    const result = await launchImageLibrary(options);
    setProfile(result.assets[0].uri.toString());
    setShowLogoutSheet(false)
    console.log("result-" + profile)

  }
  const onClickCancel = () => {
    setShowLogoutSheet(false)
  }
  const onClickOpenActionSheet = () => {
    setShowLogoutSheet(true)
  }
  const handleClickonNext = async () => {
    const requestData = {
      full_name: full_name,
      username: username,
      device_version: '',
      // profile_photo
    };
    const { isSucess, data } = await apiCalling(apiPath.userProfile, requestData, access_token);
    if (isSucess) {
      dispatch(storeAuthData({ access_token: access_token, userName: username, fullName: full_name }))
      navigation.replace('TabNavigation')
    }
  }
  return (
    <AuthTitleTxt title={'Hey '+full_name} subTitle={'Add a profile pic!'} >
      <View style={{ marginTop: hp(5) }}>
        <Image style={{ alignSelf: 'center', height: 108, width: 108, borderRadius: hp(10) }} resizeMode="cover" source={(profile == '') ? images.profilePlaceholder : { uri: profile }} />
        <TouchableNativeFeedback onPress={onClickOpenActionSheet}>
          <Text style={{ color: colors.primary, fontSize: fontSize.fs18, fontWeight: '700', alignSelf: 'center', marginTop: 23, }}>Add a photo</Text>
        </TouchableNativeFeedback>
        <BottomBtn title={'Next'} setOnPress={handleClickonNext} isSelectedBg={false} />
        <Pressable onPress={handleClickonNext}>
          <Text style={{ color: colors.white, fontSize: fontSize.fs13, fontWeight: '700', fontFamily: fontFamily.light, textAlign: 'center', marginTop: hp(3) }}>Skip</Text>
        </Pressable>
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
