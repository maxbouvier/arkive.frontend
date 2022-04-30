import React from "react"
import { StyleSheet, Text, View, Pressable, Image } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { colors } from "../../styles/colors"
import { fontFamily, fontSize, icons } from "../../assets"

const CommonUserSelection = props => {
    const { item, onPress } = props
    const { name, username, isSelected } = item
    return (
        <Pressable style={styles.container} onPress={onPress} >
            <Image source={icons.defaultUserProfile} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle}>{username}</Text>
            </View>
            <Image
                source={isSelected ? icons.selected : icons.unSelected}
                style={styles.selectionIcon}
            />
        </Pressable>
    );
};

export default CommonUserSelection;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(4),
    },
    image: {
        resizeMode: "contain",
        height: hp(8),
        width: hp(8),
    },
    title: {
        color: colors.white,
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.bold,
        marginStart: hp(2),
    },
    subTitle: {
        color: colors.gray,
        fontSize: fontSize.fs13,
        fontFamily: fontFamily.light,
        marginStart: hp(2),
        marginTop: hp(1),
    },
    selectionIcon: {
        resizeMode: 'contain',
        height: hp(2.5),
        width: hp(2.5)
    },
});
