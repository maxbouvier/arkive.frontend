import React, { useState } from "react"
import { SafeAreaView, StyleSheet, View, FlatList, Image, Pressable, Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CONST, data } from "../../utils/constant"
import { colors } from "../../styles/colors"
import { dummyImages, fontFamily, fontSize, icons } from "../../assets"
import { commonStyles } from "../../utils/styles"
import CustomActionSheet from "../../components/CustomActionSheet"


function AlbumGrid({ navigation }) {

    const [showDeleteSheet, setShowDeleteSheet] = useState(false)

    //Actions
    const navigateBack = () => navigation.goBack()
    const onShare = () => console.log('share image')
    const showOptions = () => setShowDeleteSheet(!showDeleteSheet)
    const callApiToDeletePhoto = () => { console.log('call api to delete'); navigation.goBack() }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>

            <View style={styles.headerContainer}>
                <Pressable onPress={navigateBack} hitSlop={CONST.hitSlop}>
                    <Image source={icons.back} style={commonStyles.iconStyle} />
                </Pressable>
                <Text style={{ color: colors.white, fontFamily: fontFamily.lt93Black, fontSize: fontSize.fs20, marginStart: hp(2.5) }}>9 : 59</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={onShare} hitSlop={CONST.hitSlop}>
                        <Image source={icons.share} style={[commonStyles.iconStyle, { marginEnd: hp(2.5) }]} />
                    </Pressable>
                    <Pressable onPress={showOptions} hitSlop={CONST.hitSlop}>
                        <Image source={icons.horizontalOptions} style={commonStyles.iconStyle} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        // source={dummyImages.dummy1}
                        source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/birthday-party-for-cute-child-royalty-free-image-700712598-1552358033.jpg" }}
                        style={styles.image} />
                </View>
                <Text style={styles.name}>maxystatham</Text>
                <Text style={styles.date}>06 / 09 / 22</Text>
            </View>

            <CustomActionSheet title="Delete Photo from album" onPressTitle={callApiToDeletePhoto} onPressCancel={showOptions} isVisible={showDeleteSheet} bottomSheetContainerStyle={{ marginBottom: hp(6) }} />
        </SafeAreaView>
    )
}

export default AlbumGrid;

const commonTextStyle = {
    color: colors.orange,
    fontFamily: fontFamily.ltPro,
    fontSize: fontSize.fs12,
    marginStart: hp(3.5),
}

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(8),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hp(3),
        marginTop: hp(1),
    },
    container: {
        backgroundColor: '#141518',
        marginHorizontal: hp(4),
        paddingBottom: hp(8),
        marginTop: hp(3),
        borderRadius: hp(1.2),
    },
    imageContainer: {
        backgroundColor: '#0D0F11',
        // alignItems: 'center',
        paddingVertical: hp(4),
        paddingHorizontal: hp(3),
        borderTopLeftRadius: hp(1),
        borderTopRightRadius: hp(1)
    },
    image: {
        borderRadius: hp(0.5),
        height: hp(100) / 2,
        width: '100%',
        resizeMode: 'cover',
    },
    name: {
        ...commonTextStyle,
        marginTop: hp(2)
    },
    date: {
        ...commonTextStyle,
        marginTop: hp(1)
    }
});


