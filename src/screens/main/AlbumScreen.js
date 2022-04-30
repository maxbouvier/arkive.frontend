import React from "react"
import { SafeAreaView, StyleSheet, View, FlatList, ImageBackground, Image, Pressable, Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


import { CONST, data } from "../../utils/constant"
import { colors } from "../../styles/colors"
import { dummyImages, images, fontFamily, fontSize, icons } from "../../assets"
import { commonStyles } from "../../utils/styles"


function AlbumScreen({ navigation }) {

    //Actions
    const navigateBack = () => navigation.goBack()
    const showOptions = () => navigation.navigate('EditAlbum')
    const navigateToAlbumGrid = (item, index) => { console.log('show options', item, index); navigation.navigate('AlbumGrid') }

    //Render
    const renderItem = ({ item, index }) => <AlbumListImages item={item} onPress={() => navigateToAlbumGrid(item, index)} />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>

            <View style={styles.headerContainer}>
                <Pressable onPress={navigateBack} hitSlop={CONST.hitSlop}>
                    <Image source={icons.back} style={commonStyles.iconStyle} />
                </Pressable>
                <Pressable onPress={showOptions} hitSlop={CONST.hitSlop}>
                    <Image source={icons.horizontalOptions} style={commonStyles.iconStyle} />
                </Pressable>
            </View>

            {/* <View style={styles.albumImage} >
                <Image source={icons.people} style={{ resizeMode: 'contain', height: hp(6.2), width: hp(6.2) }} />
            </View> */}

            <Text style={styles.albumName}>Expat Party</Text>
            <Text style={styles.albumMemberCount}>2 members</Text>
            <FlatList
                style={{ flex: 1}}
                data={[{}, {}, {}, {}, {}, {}, {}]}
                renderItem={renderItem}
                contentContainerStyle={styles.listStyle}
                numColumns="3"
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}

export default AlbumScreen;

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(8),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hp(4),
        // marginTop: hp(2)
    },
    albumImage: {
        backgroundColor: colors.darkerGray,
        height: hp(15),
        aspectRatio: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp(2.5)
    },
    albumName: {
        color: colors.white,
        fontFamily: fontFamily.lt93Black,
        fontSize: fontSize.fs20,
        marginTop: hp(2),
        textAlign: 'center'
    },
    albumMemberCount: {
        color: colors.gray,
        fontFamily: fontFamily.bold,
        fontSize: fontSize.fs12,
        marginVertical: hp(1),
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    listStyle: {
        marginTop: hp(3.5),
        flexGrow: 1,
        alignSelf: 'center',
        paddingBottom: hp(8)
    },
});

const AlbumListImages = (props) => {
    const { onPress } = props
    return (
        <ImageBackground source={images.imageGridBg} style={{ height: hp(20), width: wp(30), margin: 3, }}>
            <View style={aliStyles.imageContainer}>
                <Image source={dummyImages.dummy1} style={{ height: hp(15.5), width: wp(25),}} />
            </View>
        </ImageBackground>
        // <Pressable style={aliStyles.container} onPress={onPress}>
        //     {/* <View style={aliStyles.imageContainer}> */}
        //         <Image source={dummyImages.dummy1} style={aliStyles.image} />
        //     {/* </View> */}
        // </Pressable>
    );
};

const aliStyles = StyleSheet.create({
    container: {
        backgroundColor: '#0F1112',
        margin: wp(0.8),
        paddingBottom: hp(3),
        borderRadius: hp(1)
    },
    imageContainer: {
        height: hp(15.5), marginTop: hp(1.5), width: wp(25),alignSelf:'center',borderRadius:hp(0.5)
    },
    image: {
        resizeMode: 'contain',
        height: wp(80) / 2.5,
        width: wp(75) / 3,
        borderRadius: hp(1),
    }
});
