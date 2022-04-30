import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { colors } from "../../styles/colors";
import AuthTitleTxt from "../../common/component/AuthTitleTxt";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize } from "../../assets";
import { resendOtp, verifyOTP } from "../../Api/AuthApis";
import { useDispatch, useSelector } from 'react-redux';
import { storeAuthData } from '../../reduxstore/AuthSlice';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { apiCalling, apiPath } from '../../Api/AuthApis';
const SignupVerification = ({ navigation, route }) => {
  const { mobile_number, country_isd_code } = route.params;
  const [focus, setFocus] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const onOtpChange = async (value) => {
    if (value.length == 4) {
      setOtp(value);
      const requestData = {
        mobile_number: mobile_number,
        otp: value,
        device_version: '',
        device_name: '',
        device_token: '',
        country_isd_code: country_isd_code,
      };
      const { isSucess, data } = await apiCalling(apiPath.verifyOtp, requestData,'');
      console.log("data--"+JSON.stringify(data))
      if (isSucess)
        if (data.full_name != null) {
          dispatch(storeAuthData({ access_token: data.access_token, userName: data.username, fullName: data.full_name }))
          navigation.replace('TabNavigation')
        }
        else
          navigation.replace('SignupNameUserName', data)

    }


  };

  const onResendOtp = async () => {
    const response = await resendOtp(mobile_number, countryCode)
    console.log("response --" + JSON.stringify(response))
    if (response.data.responseCode == 200) {
      alert("Resent Otp.")
    }
  }

  return (
    <AuthTitleTxt title={"Enter your"} subTitle={"verification code"} >
      <View style={styles.otpTxIPView}>
        <Text style={styles.otpSentTxt}>We sent you a code via SMS to (number)</Text>
        <OTPTextView
          handleTextChange={(value) => onOtpChange(value)}
          selectionColor={colors.primary}
          defaultValue={""}
          autoFocus={true}
          caretHidden={focus ? false : true}
          onTouchStart={() => setFocus(true)}
          onBlur={() => (otp != "" ? setFocus(false) : setFocus(true))}
          tintColor={colors.primary}
          offTintColor={colors.darkerGray}
          textInputStyle={styles.otpIpTxt}
          containerStyle={styles.otpContainerView}
        ></OTPTextView>

        <TouchableWithoutFeedback onPress={onResendOtp}>
          <Text style={styles.didnotGotCodeTxt}>Didn’t get a code?<Text style={styles.resendOtp}>{" "}Resend code</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </AuthTitleTxt>


  );
};
export default SignupVerification;
const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: colors.black
  },
  titleView: {
    flex: 0.2,
    justifyContent: "flex-end"
  },
  otpTxIPView: {
  },
  otpSentTxt: {
    color: "#B0B0B5",
    fontSize: fontSize.fs13,
    marginTop: hp(2),
    textAlign: "center",
  },
  otpIpTxt: {
    backgroundColor: colors.darkerGray,
    color: "#FFFFFF",
    height: hp(8),
    width: hp(7),
    borderRadius: 16,
    fontSize: fontSize.fs22,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.primary,
  },
  otpContainerView: {
    height: hp(9),
    marginHorizontal: wp(12),
    marginTop: hp(4),
  },
  didnotGotCodeTxt: {
    color: "#B0B0B5",
    fontSize: fontSize.fs13,
    marginTop: hp(6),
    fontFamily: fontFamily.light,
    textAlign: "center",
  },
  resendOtp: {
    color: "#FFFFFF",
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fs13
  }
})
