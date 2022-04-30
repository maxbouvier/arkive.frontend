import { fontFamily, fontSize } from "../assets";
import { colors } from "../styles/colors";
import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const commonStyles = StyleSheet.create({
    lightTitle: {
        color: colors.shuttleGray,
        fontSize: fontSize.fs14,
        fontFamily: fontFamily.light,
        marginVertical: hp(2),
    },
    iconStyle: {
        height: hp(2.5),
        width: hp(2.5),
        resizeMode: 'contain',
        padding: hp(1.2)
    }
})

const commonFlComponentStyle = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.medium,
        marginStart: hp(2),
    },
    subTitle: {
        color: colors.gray,
        fontSize: fontSize.fs12,
        fontFamily: fontFamily.light,
        marginStart: hp(2),
        marginTop: hp(1),
    },
    selectionIcon: {
        resizeMode: 'contain',
        height: hp(2.5),
        width: hp(2.5)
    },
})

export { commonStyles, commonFlComponentStyle }