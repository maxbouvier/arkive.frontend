import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../styles/colors'
import BottomBtn from '../common/component/BottomBtn'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { fontFamily, fontSize } from '../assets'
import ThemeButton from '../common/component/ThemeButton'

const CustomActionSheet = ({ isVisible, isMultipleOptions, title, onPressTitle, onPressSubTitle, secondTitle, onPressCancel, bottomSheetContainerStyle }) => {
    return (
        <Modal
            // onRequestClose={() => {
            //     props.isSingleBtn
            //       ? props.handleOkClick()
            //       : props.handleCancelClick("no");
            //   }}
            transparent={true}
            visible={isVisible} animationType="fade">
            <View style={styles.modalView}>
                <View style={[styles.bottomSheetContainer, bottomSheetContainerStyle]}>
                    <View style={{ flexDirection: 'column-reverse', flex: 1 }}>
                        <ThemeButton title="Cancel" textStyle={{ color: colors.gray }} onPressFirstOption={onPressCancel} />
                        <ThemeButton
                            title={title}
                            secondTitle={secondTitle}
                            isMultipleOptions={isMultipleOptions}
                            onPressSecondOption={onPressSubTitle}
                            onPressFirstOption={onPressTitle} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomActionSheet

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor:colors.modalBg,
    },
    bottomSheetContainer: {
        flex: 0.3,
        paddingHorizontal: hp(3),
        marginBottom: hp(4),
    },
    rootView: {
        height: hp(7),
        justifyContent: 'center',
        backgroundColor: colors.darkerGray,
        borderRadius: hp(1.5),
        marginBottom: hp(2)
    },
    titleTxt: {
        color: colors.secondary,
        fontSize: fontSize.fs16,
        textAlign: "center",
        fontFamily: fontFamily.bold,
    },
})