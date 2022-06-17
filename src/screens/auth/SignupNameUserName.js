import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  SafeAreaView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomBtn from '../../common/component/BottomBtn';
import UserIpTxt from '../../common/component/UserIpTxt';
import AuthTitleTxt from '../../common/component/AuthTitleTxt';

const SignupNameUserName = ({ navigation, route }) => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('')
  useEffect(() => { }, []);
  const handleClickonNext = async () => {
    if (fullName != '' && userName != '') {
      navigation.navigate('SignupProfilePic', {profile_created:route.params.profile_created, access_token: route.params.access_token, full_name: fullName, username: userName })
    }
  }
  return (
    <AuthTitleTxt title={'Hey! Add your name'} subTitle={'and username'} >
      <View style={{ marginTop: hp(6) }}>
        <UserIpTxt
          placholderValue={'Full Name'}
          keyboardType={(Platform.OS == "android")?'visible-password':'ascii-capable'}
          isSelectedBg={(fullName != '')?true:false}
          returnKeyType={'next'}
          onChangeText={(value) => { setFullName(value) }}
          value={fullName} />
        <UserIpTxt
          placholderValue={'Username'}
          keyboardType={(Platform.OS == "android")?'visible-password':'ascii-capable'}
          isSelectedBg={(userName != '')?true:false}
          customStyle={{ marginTop: 12 }}
          returnKeyType={"done"}
          onChangeText={(value) => { setUserName(value) }}
          value={userName} />
        <BottomBtn title={'Next'} setOnPress={() => handleClickonNext()} isSelectedBg={(fullName != '' && userName != '') ? true : false} />
      </View>
    </AuthTitleTxt>
  );
};
export default SignupNameUserName;
