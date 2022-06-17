import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, ImageBackground ,Platform} from "react-native";
import BottomBtn from "../../common/component/BottomBtn";
import { colors } from '../../styles/colors'
import { images } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { storePushRelatedData } from '../../reduxstore/PushNotificationDataSlice';
import messaging from "@react-native-firebase/messaging";
const OnBoardingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const handlePress = () => {
        navigation.replace('SignupScreen')
    };
    useEffect(() => {
        const getFcmToken = async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("FCM" + fcmToken);
                dispatch(storePushRelatedData({
                    deviceToken: fcmToken,
                    deviceName: "",
                    deviceVersion: "" ,
                    device_type: Platform.OS == 'android' ?1:0 //0-ios 1-android
                }))
            }
        }
        getFcmToken()
    }, []);
    return (
        <ImageBackground source={images.splashBg} style={styles.container}>
            <SafeAreaView style={styles.container}>
                <BottomBtn
                    title={'Continue with Phone Number'}
                    setOnPress={handlePress}
                    isSelectedBg={true}
                    style={styles.btn}
                />
            </SafeAreaView>
        </ImageBackground>

    );
};

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    subContainer: {
        flex: 1,
    },
    btn: {
        marginBottom: hp(4),
        backgroundColor: colors.shark
    }
})