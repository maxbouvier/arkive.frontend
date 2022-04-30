import React from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize } from '../../assets'
import { colors } from '../../styles/colors'

const ThemeButton = ({ title, secondTitle, onPressFirstOption, onPressSecondOption, onPress, containerStyle, textStyle, isMultipleOptions }) => {
    return (
        isMultipleOptions ?
            <View>
                <Pressable style={[styles.buttonContainer, { marginBottom: 1, borderBottomEndRadius: 0, borderBottomLeftRadius: 0 }]} onPress={onPressFirstOption}>
                    <Text style={[styles.buttonTitle, textStyle]}>{title}</Text>
                </Pressable>
                <Pressable style={[styles.buttonContainer, { borderTopLeftRadius: 0, borderTopRightRadius: 0 }]} onPress={onPressSecondOption}>
                    <Text style={[styles.buttonTitle, textStyle]}>{secondTitle}</Text>
                </Pressable>
            </View>
            :
            <View style={{ height: hp(6), marginBottom: hp(2) }}>
                <Pressable style={[styles.buttonContainer, containerStyle]} onPress={onPressFirstOption}>
                    <Text style={[styles.buttonTitle, textStyle]}>{title}</Text>
                </Pressable></View>


    )
}

export default ThemeButton

const styles = StyleSheet.create({
    buttonContainer: {
        height: hp(6),
        justifyContent: 'center',
        backgroundColor: colors.darkerGray,
        borderRadius: hp(1.5),
        marginBottom: hp(2)
    },
    buttonTitle: {
        color: colors.secondary,
        fontSize: fontSize.fs16,
        textAlign: "center",
        fontFamily: fontFamily.bold,
    },
})