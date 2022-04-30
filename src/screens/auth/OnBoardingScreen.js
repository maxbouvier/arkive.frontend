import React from "react";
import { SafeAreaView, StyleSheet, ImageBackground } from "react-native";
import BottomBtn from "../../common/component/BottomBtn";
import { colors } from '../../styles/colors'
import { images } from "../../assets";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const OnBoardingScreen = ({ navigation }) => {

    const handlePress = () => {
        navigation.replace('SignupScreen')
    };

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