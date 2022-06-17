import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AuthTitleTxt from '../../common/component/AuthTitleTxt';
import BottomBtn from '../../common/component/BottomBtn';
import { fontFamily, fontSize, icons } from '../../assets';
import { post, apiPath } from '../../Api/ApiCalling';
import { errorsMsg } from '../../styles/Strings';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import { colors } from '../../styles/colors';
import { showMessage } from "react-native-flash-message";

const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [isdCode, setISDCode] = useState('1');
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(false)
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(false)
  const [isBorderDisplay, setBorderDisplay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSelect = (country) => {
    console.log("country" + JSON.stringify(country.callingCode[0]))
    setCountryCode(country.cca2)
    setISDCode(country.callingCode[0])
    setCountry(country)
    setBorderDisplay(true)
  }

  const handleClickOnSendCode = async () => {
    if (phoneNumber.length > 7) {
      callLoginApi()
    }
    else
      showMessage({ message: errorsMsg.mobileNo, type: "error", })
  }

  const callLoginApi = async () => {
    setIsLoading(true)
    const requestData = {
      country_isd_code: "+" + isdCode,
      mobile_number: phoneNumber
    };
    const { isSucess } = await post(apiPath.login, requestData);
    if (isSucess) {
      navigation.replace('SignupVerification', requestData)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <AuthTitleTxt customStyle={{ flex: 1, backgroundColor: 'red' }} title={'Sign in with your'} subTitle={'phone number'} >
      <View style={{ flex: 1, marginTop: hp(6) }}>
        {/* <TouchableOpacity style={{}} onPress={() => setBorderDisplay(true)}> */}
        <View style={[styles.textIpView, { borderWidth: isBorderDisplay ? 2 : 0, borderColor: colors.primary }]}>
          <CountryPicker
            theme={DARK_THEME}
            {...{
              countryCode,
              withFilter,
              withFlag,
              country,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={false}
            containerButtonStyle={{ marginRight: -9 }}
          />
          <Image source={icons.down_arrow} style={styles.downArrowImg} />
          <Text style={styles.isdCodeTxt}>+{isdCode}</Text>
          <TouchableOpacity  style={{flex:1}} onPress={() => setBorderDisplay(true)}>
            <TextInput
              caretHidden={!isBorderDisplay}
              style={styles.phoneNumIP}
              placeholder={"Phone #"}
              keyboardAppearance="dark"
              autoFocus={true}
              maxLength={16}
              onTouchStart={() => setBorderDisplay(true)}
              value={phoneNumber}
              selectionColor={colors.primary}
              onChangeText={(value) => { setPhoneNumber(value); (value != '') ? setBorderDisplay(true) : null }}
              placeholderTextColor={colors.shuttleGray}
              keyboardType={'number-pad'} />
          </TouchableOpacity>
        </View>
        {/* </TouchableOpacity> */}
        <BottomBtn isLoading={isLoading} title={'Send me a code'} setOnPress={handleClickOnSendCode} isSelectedBg={(phoneNumber != '') ? true : false} />
      </View>
    </AuthTitleTxt>
  )
};
const styles = StyleSheet.create({
  textIpView: {
    flexDirection: 'row',
    marginHorizontal: hp(4),
    borderRadius: hp(1.8),
    padding: hp(1),
    alignItems: 'center',
    backgroundColor: colors.darkerGray,
    fontFamily: fontFamily.light,
  },
  downArrowImg: {
    height: hp(3),
    width: 18,
    alignSelf: "center"
  },
  isdCodeTxt: {
    color: colors.white,
    marginLeft: 8,
    marginRight: 6,
    fontSize: fontSize.fs14,
    fontFamily: fontFamily.light
  },
  phoneNumIP: {
    flex: 1,
    color: colors.white,
    fontSize: fontSize.fs14,
    fontFamily: fontFamily.light,
  }
})

export default SignupScreen;
