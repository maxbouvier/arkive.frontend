import React, { useEffect, useState } from "react"
import { SafeAreaView, Dimensions, StyleSheet, View, FlatList, ImageBackground, Image, Pressable, Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from "react-redux";
import { CONST, data } from "../../utils/constant"
import { colors } from "../../styles/colors"
import { storeAlbumDetails } from '../../reduxstore/AlbumDetailSlice';
import { dummyImages, images, fontFamily, fontSize, icons } from "../../assets"
import FastImage from 'react-native-fast-image'
import { commonStyles } from "../../utils/styles"
import { apiPath, post } from '../../Api/ApiCalling';
import { useNavigationState } from '@react-navigation/native';
function AlbumScreen({ navigation, route }) {
    //Redux state and dispatch
    const { album_id, album_name, album_members, media, members_details, other_friends_details } = useSelector((state) => state.albumDetailSlice);
    const { isComeFromCamera } = route.params
    const index = useNavigationState(state => state.index);
    const dispatch = useDispatch();
    const albumId = route.params._id
    const is_admin = route.params.is_admin
    const [albumData, setAlbumData] = useState({})
    const [isNewImageUploaded, setIsNewImageUploaded] = useState(false);

    useEffect(() => {
        var timer;
        if (isComeFromCamera && is_admin != 2) {
            setIsNewImageUploaded(true)
            timer = setTimeout(async () => {
                setIsNewImageUploaded(false)
            }, 2000);
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getAlbumDetails();
        });
        return () => {
            clearTimeout(timer);
            unsubscribe
        };
    }, [navigation]);

    const getAlbumDetails = async () => {
        const { isSucess, data } = await post(apiPath.userAlbumsDetails, { _id: albumId });
        console.log("ablum details" + JSON.stringify(data))
        if (isSucess) {
            // setAlbumData(data)
            dispatch(storeAlbumDetails({
                album_id: data.album_id,
                album_name: data.album_name,
                album_members: data.album_members,
                members_details: data.members_details,
                other_friends_details: data.other_friends_details,
                media: data.media,
                isAdmin: is_admin
            }))
        }
    }
    //Actions
    const navigateBack = () => index == 0 ? navigation.replace('HomeScreen') : navigation.goBack()
    const showOptions = () => navigation.navigate('EditAlbum', { albumData: albumData })
    const navigateToAlbumGrid = (item, index) => { console.log('show options', item, index); navigation.navigate('AlbumGrid', { item: { ...item, album_id: album_id } }) }

    //Render
    const renderItem = ({ item, index }) => <AlbumListImages item={item} onPress={() => navigateToAlbumGrid(item, index)} />
    const renderEmptyAlbumView = () => {
        return (
            <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
                <Text style={{ color: colors.gray, fontSize: 14, fontFamily: fontFamily.bold }}>This album is Empty!</Text>
                <Pressable onPress={() => { navigation.replace('TabNavigation', { screen: 'CameraScreen' }) }}>
                    <Image source={icons.add_photo} style={{ width: 120, height: 32, marginTop: 10 }} /></Pressable>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <View style={styles.headerContainer}>
                <Pressable onPress={navigateBack} hitSlop={CONST.hitSlop}>
                    <Image source={icons.back} style={commonStyles.iconStyle} />
                </Pressable>
                {is_admin != 2 ?
                    <Pressable onPress={showOptions} hitSlop={CONST.hitSlop}>
                        <Image source={icons.horizontalOptions} style={commonStyles.iconStyle} />
                    </Pressable> : null}
            </View>
            <View style={{ flex: 1, marginHorizontal: 13 }}>
                <Text style={styles.albumName}>{album_name}</Text>
                <Text style={styles.albumMemberCount}>{(is_admin == 2) ? "Only you can see these posts" : album_members + " members"} </Text>
                <FlatList
                    data={media}
                    renderItem={renderItem}
                    contentContainerStyle={{ flex: 1, marginTop: 32, }}
                    numColumns="3"
                    ListEmptyComponent={renderEmptyAlbumView}
                    showsVerticalScrollIndicator={false}
                />
                {(isNewImageUploaded) ? notifiedView() : null}
            </View>
        </SafeAreaView>
    )
}

export default AlbumScreen;

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(4),
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
        flex: 1,
        backgroundColor: 'red',
        alignSelf: 'center',
        paddingBottom: hp(8)
    },
});

const AlbumListImages = (props) => {
    const { onPress, item } = props
    console.log("photo+" + item)
    return (
        <Pressable onPress={onPress}>
            <View style={{ margin: 2 }}>
                <FastImage resizeMode={FastImage.resizeMode.contain} source={(isOverlayDisplay(item.photo_uplode_time) ? null : { uri: item.image })} style={{ height: 176, width: Dimensions.get('screen').width / 3.3, backgroundColor: isOverlayDisplay(item.photo_uplode_time) ? colors.blueoverlay : null }} />
            </View>
        </Pressable>
    );
};
//
var add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
}

const isOverlayDisplay = (photo_uplode_time) => {
    const uploadedTime = add_minutes(new Date((photo_uplode_time * 1000)), 10);
    const currentTime = new Date()
    console.log("--uploadedTime--" + uploadedTime + "--currentTime--" + currentTime + "-- comparsion --" + (uploadedTime > currentTime))
    if (uploadedTime > currentTime)
        return true
    else return false
}
const aliStyles = StyleSheet.create({
    imageContainer: {
        margin: wp(0.8),
        height: hp(15.5),
        marginTop: hp(1.5),
        width: wp(25),
        alignSelf: 'center',
        borderRadius: hp(0.5)
    },
    image: {
        resizeMode: 'contain',
        height: wp(80) / 2.5,
        width: wp(75) / 3,
        borderRadius: hp(1),
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: colors.darkerGray,
        borderRadius: hp(1.3),
        paddingHorizontal: hp(2.9),
        paddingVertical: hp(2.8),
    },
    albumIconContainer: {
        backgroundColor: colors.darkerGray,
        height: hp(8),
        width: hp(8),
        borderRadius: hp(8) / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        resizeMode: "contain",
        height: hp(5),
        width: hp(5)
    },
    name: {
        color: colors.white,
        marginStart: hp(2.5),
    },
});
const notifiedView = () => {
    // const { item, onPress, index } = props;
    return (
        <Pressable style={[aliStyles.container, { position: 'absolute' }]}>
            <Image source={icons.notified_icon} style={aliStyles.iconStyle} />
            <View>
                <Text style={[aliStyles.name, { fontSize: fontSize.fs14, fontWeight: 'bold' }]}>Your friends have been notified!</Text>
                <Text style={[aliStyles.name, { fontSize: fontSize.fs12, marginTop: 3 }]}>Your photo will appear in 10 minutes!</Text>
            </View>
        </Pressable>
    );
};


