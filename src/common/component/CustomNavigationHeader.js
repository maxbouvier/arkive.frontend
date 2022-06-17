import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { fontFamily, fontSize, icons, images } from '../../assets';
import { CONST } from '../../utils/constant';

const CustomNavigationHeader = (props) => {

    //Component Properties
    const { name, onPressClose, onPressBack, onPressDone, isDoneDisabled } = props;

    //Conditional Rendering
    const leftIcon = icons.close
    const leftIconAction = onPressClose != undefined ? onPressClose : onPressBack
    const doneButtonColor = isDoneDisabled ? colors.shuttleGray : colors.primary

    const styles = StyleSheet.create({
        headerOptionsContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        closeBtn: {
            resizeMode: "contain",
            height: hp(2.2),
            width: hp(2.2),
        },
        modalName: {
            color: colors.white,
            fontSize: fontSize.fs18,
            fontFamily: fontFamily.bold,
        },
        btnText: {
            width: 50,
            alignSelf: 'center',
            textAlign: "center",
            color: doneButtonColor,
            fontSize: fontSize.fs16,
            fontFamily: fontFamily.bold,
        },
    })

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={leftIconAction} hitSlop={CONST.hitSlop} >
                <Image source={leftIcon} style={styles.closeBtn} />
            </Pressable>
            <Text style={{ color: colors.white, textAlign: 'center', flex: 1, fontFamily: fontFamily.bold, fontSize: fontSize.fs18, marginLeft: wp(6) }}>{name}</Text>
            {/* {onPressDone ? ( */}
            <Pressable onPress={onPressDone} disabled={isDoneDisabled}>
                <Text style={styles.btnText}>{onPressDone ? "Done" : ""}</Text>
            </Pressable>
            {/* )  */}
            {/* // : <View  style={{height:hp(2),width:(2)}}/>} */}
        </View>
    )
}

export default CustomNavigationHeader

