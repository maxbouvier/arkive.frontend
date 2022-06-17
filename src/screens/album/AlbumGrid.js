import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, FlatList, Image, Pressable, Text } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CONST, data, nullProfile } from "../../utils/constant"
import { colors } from "../../styles/colors"
import { dummyImages, fontFamily, fontSize, icons, images } from "../../assets"
import { commonStyles } from "../../utils/styles"
import CustomActionSheet from "../../components/CustomActionSheet"
import { apiPath } from "../../Api/ApiConfig"
import { post } from "../../Api/ApiCalling"
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image'
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;
function AlbumGrid({ navigation, route }) {
    const { _id, image, photo_uplode_time, username, profile_photo, album_id } = route.params.item;
    const [showDeleteSheet, setShowDeleteSheet] = useState(false)
    const [minutesCounter, setMinutesCounter] = useState("")
    var add_minutes = function (dt, minutes) {
        return new Date(dt.getTime() + minutes * 60000);
    }
    useEffect(() => {
        var interval;
        interval = setInterval(() => {
            isOverlayDisplay() ? getRemainingTime() : clearInterval(interval)
        }, 1000)
        return () => clearInterval(interval);
    }, [])

    //Actions
    const navigateBack = () => navigation.goBack()
    const shareImage = () => {
        let imagePath = null;
        RNFetchBlob.config({
            fileCache: true,
        })
            .fetch('GET', image)
            // the image is now dowloaded to device's storage
            .then((resp) => {
                // the image path you can use it directly with Image component
                imagePath = resp.path();
                return resp.readFile('base64');
            })
            .then((base64Data) => {
                //Sharethe image
                console.log("base64Data--" + base64Data)
                var imageUrl = `data:image/png;base64,${base64Data}`;
                let shareImage = {
                    // title: "Arkive", //string
                    // message: 'Hey !! Please check it', //string
                    url: imageUrl,
                    social: Share.Social.WHATSAPP,
                    // failOnCancel: false,
                    // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
                };
                Share.open(shareImage)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log("ERROR" + err);
                    });
                // remove the file from storage
                return fs.unlink(imagePath);
            })
    }
    const showOptions = () => setShowDeleteSheet(!showDeleteSheet)
    const callApiToDeletePhoto = async () => {
        // console.log('call api to delete'); 
        // navigation.goBack() 
        const { isSucess, data } = await post(apiPath.deletePhoto, {
            album_id: album_id,
            image_id: _id
        });
        if (isSucess) {
            // setAlbumData(data)
            navigation.goBack()
        }
    }
    const isOverlayDisplay = () => {
        const uploadedTime = add_minutes(new Date((photo_uplode_time * 1000)), 10);
        const currentTime = new Date()
        console.log("--uploadedTime--" + uploadedTime + "--currentTime--" + currentTime + "-- comparsion --" + (uploadedTime > currentTime))
        if (uploadedTime > currentTime)
            return true
        else return false
    }
    const getRemainingTime = () => {
        var uploadTime = add_minutes(new Date((photo_uplode_time * 1000)), 10).getTime();
        var currentTime = new Date().getTime();
        var diff = uploadTime - currentTime;
        // console.log("Upload Time --" + JSON.stringify(uploadTime));
        // console.log("current Time --" + JSON.stringify(currentTime));
        var diff = (uploadTime - currentTime) / 1000;
        diff /= (60);
        // console.log("Difference Time Time --" + JSON.stringify(diff / 1000));
        // console.log("Difference Time Time --" + JSON.stringify(Math.abs(Math.round(diff))));
        const minutes = parseInt(Math.abs(uploadTime - currentTime) / (1000 * 60) % 60);
        const seconds = parseInt(Math.abs(uploadTime - currentTime) / (1000) % 60);
        // console.log("Difference Time minutes --" + JSON.stringify(minutes));
        // console.log("Difference Time seconds --" + JSON.stringify(seconds));
        setMinutesCounter('' + minutes + ':' + seconds)

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <View style={styles.headerContainer}>
                <Pressable onPress={navigateBack} hitSlop={CONST.hitSlop}>
                    <Image source={icons.close} style={commonStyles.iconStyle} />
                </Pressable>
                {isOverlayDisplay() ? (minutesCounter == "0:0") ? null : <Text style={{ color: colors.white, fontFamily: fontFamily.lt93Black, fontSize: fontSize.fs20, marginStart: hp(2.5) }}>{minutesCounter}</Text> : null}
                <Pressable onPress={showOptions} hitSlop={CONST.hitSlop}>
                    <Image style={{ height: hp(2), width: hp(4) }} />
                </Pressable>
            </View>
            <View style={{ flex: 1, marginHorizontal: hp(1.5), borderRadius: 8, marginBottom: hp(7) }}>

                {/* Main Image */}
                <Image source={{ uri: image }} style={{ flex: 1, borderRadius: 8, overflow: 'hidden', marginTop: hp(1) }} />


                {(isOverlayDisplay()) ?
                    <Image style={{
                        left: 0, right: 0, height: '100%', width: '100%', opacity:
                            (minutesCounter > "8:0") ? 0.9 :
                                (minutesCounter > "6:0") ? 0.6 :
                                    (minutesCounter > "4:0") ? 0.4 :
                                        (minutesCounter > "2:0") ? 0.2 : (minutesCounter == "0:0") ? 0.0 : 0.1,
                        backgroundColor: colors.blueoverlay, borderRadius: 8, position: 'absolute', overflow: 'hidden', marginTop: hp(1)
                    }} /> : null}

                {/* profile actions delete and share */}
                <View style={{ flexDirection: 'row', position: 'absolute', right: 8, top: 25 }}>
                    {isOverlayDisplay() && (minutesCounter != "0:0") ? null : <Pressable style={{ marginRight: 14 }} onPress={shareImage} hitSlop={CONST.hitSlop}>
                        <Image source={icons.share} style={{
                            height: hp(3.5),
                            width: hp(3.5),
                            resizeMode: 'contain',
                        }} />
                    </Pressable>}
                    <Pressable style={{ marginRight: 6 }} onPress={showOptions} hitSlop={CONST.hitSlop}>
                        <Image source={icons.horizontalOptions} style={{
                            height: hp(3.5),
                            width: hp(3.5),
                            resizeMode: 'contain',
                        }} />
                    </Pressable>
                </View>
                {/* profile name and image */}
                <View style={{ flexDirection: 'row', left: 8, position: 'absolute', top: 25 }}>
                    <Pressable style={{ marginRight: 12, }} onPress={navigateBack} hitSlop={CONST.hitSlop}>
                        <Image source={(profile_photo == null || profile_photo == nullProfile) ? images.profilePlaceholder : { uri: profile_photo }} style={{ height: 40, width: 40, borderRadius: 150 / 2, }} />
                    </Pressable>
                    <Text style={{ height: 50, marginTop: 8, color: colors.white, fontFamily: fontFamily.bold, fontSize: fontSize.fs14 }}>{username}</Text>
                </View>

                {/* ARKIVE Text */}
                {isOverlayDisplay() && (minutesCounter != "0:0") ? null : <View style={{ position: 'absolute', bottom: '10%', left: '10%' }}>
                    <Text style={styles.name}>ARKIVE</Text>
                    <Text style={styles.date}>Inspired by the analog film  experience, Arkive is made to create more authentic moments, together. Share intentionally.. Live in the moment. Make great memories with friends, not followers.</Text>
                </View>}
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
        marginTop: hp(3),
        marginHorizontal: hp(2)
    },
    container: {
        marginHorizontal: hp(4),
        paddingBottom: hp(8),
        marginTop: hp(3),
        marginHorizontal: hp(2),
        borderRadius: hp(1.2),
    },
    imageContainer: {
        backgroundColor: '#0D0F11',
        // alignItems: 'center',
        marginHorizontal: hp(2),
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
        // ...commonTextStyle,
        marginTop: hp(2),
        fontFamily: fontFamily.bold,
        bottom: 0,
        fontSize: fontSize.fs8,
        color: colors.white
    },
    date: {
        // ...commonTextStyle,
        marginTop: hp(0.5),
        width: hp(20),
        fontSize: fontSize.fs8,
        fontFamily: fontFamily.light,
        color: colors.white
    }
});


