import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../styles/colors';
import { fontFamily, fontSize, icons } from '../../assets';
import { CONST } from '../../utils/constant';

const CustomNavigationHeader = (props) => {

    //Component Properties
    const { name, onPressClose, onPressBack, onPressDone, isDoneDisabled } = props;

    //Conditional Rendering
    const leftIcon = onPressClose != undefined ? icons.close : icons.back
    const leftIconAction = onPressClose != undefined ? onPressClose : onPressBack
    const doneButtonColor = isDoneDisabled ? colors.shuttleGray : colors.primary

    const styles = StyleSheet.create({
        headerOptionsContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:'red',
            justifyContent: "space-between",
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
            color: doneButtonColor,
            fontSize: fontSize.fs16,
            fontFamily: fontFamily.bold,
        },
    })

    return (
        <View style={styles.headerOptionsContainer}>
            <Pressable onPress={leftIconAction} hitSlop={CONST.hitSlop} >
                <Image source={leftIcon} style={styles.closeBtn} />
            </Pressable>
            <Text style={styles.modalName}>{name}</Text>
            {onPressDone ? (
                <Pressable onPress={onPressDone} disabled={isDoneDisabled}>
                    <Text style={styles.btnText}>Done</Text>
                </Pressable>
            ) : (
                <View />
            )}
        </View>
    )
}

export default CustomNavigationHeader

