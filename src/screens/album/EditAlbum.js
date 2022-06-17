import React, { useEffect, useState } from "react"
import { Text, View, FlatList, StyleSheet, Pressable, Image } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors"
import { useSelector } from "react-redux";
import { commonStyles } from "../../utils/styles"
import CustomModalView from "../../components/CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import { fontFamily, fontSize, icons, images } from "../../assets"
import { get, apiPath, deleteApi, put, post } from '../../Api/ApiCalling';
import { nullProfile } from "../../utils/constant";
import CustomActionSheet from "../../components/CustomActionSheet"
const EditAlbum = ({ route, navigation }) => {
    const { album_id, album_name, album_members, members_details, isAdmin, other_friends_details } = useSelector((state) => state.albumDetailSlice);
    const { userId } = useSelector((state) => state.authSlice);
    const [showDeleteSheet, setShowDeleteSheet] = useState(false)
    // const { album_name, members_details, album_id } = route.params.albumData
    //State
    const [albumName, setalbumName] = useState(album_name);

    //Render
    const renderSelectedMemberList = ({ item, index }) => <SelectedMembersComponent item={item} />

    //Actions
    const onPressClose = () => navigation.goBack()
    const onDone = async () => {
        let slectedItemArray = members_details.filter(function (item, index) {
            return item._id != userId;
        });
        var idsOfMembers = slectedItemArray.map(ob => ob._id);
        const requestBody = {
            _id: album_id,
            album_name: albumName,
            album_members: idsOfMembers
        }
        const { isSucess, data } = await put(apiPath.updateAlbum, requestBody);
        if (isSucess)
            navigation.goBack()
    }
    const showOptions = () => setShowDeleteSheet(!showDeleteSheet)
    const navigateToManageMembers = () => navigation.navigate('ManageMembers', { album_id: album_id })
    const onDeleteAlbum = async () => {
        setShowDeleteSheet(false)
        const requestData =
        {
            _id: album_id
        }
        const { isSucess, data } = await post(apiPath.deleteAlbum, requestData);
        if (isSucess) {
            navigation.navigate('HomeStack', { screen: 'HomeScreen' });
        }
    };

    //CommonStyle
    const commonMarginTop = hp(5)

    return (
        <CustomModalView
            name="Edit Album"
            onPressClose={onPressClose}
            onPressDone={onDone}
            backgroundColor={colors.shark}
            isDoneDisabled={false}
            // isDoneDisabled={(albumName != '') ? false : true}
            isFullScreen={false}>
            <View style={{ marginTop: commonMarginTop, flex: 1 }}>

                <CustomTextInput
                    title="Album Name"
                    value={albumName}
                    placeholder={'Add'}
                    onChangeText={(value) => setalbumName(value)} 
                    containerStyle={{ marginTop: 0 }}
                    withIcon={true} />

                <View style={{ marginTop: commonMarginTop }}>
                    <Text style={commonStyles.lightTitle}>Members</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FlatList data={members_details} renderItem={renderSelectedMemberList} horizontal ListEmptyComponent={() => <ListEmptyComponent />} style={{ marginEnd: hp(2) }} />
                        <Pressable onPress={navigateToManageMembers}>
                            <Image source={icons.add} style={commonStyles.iconStyle} />
                        </Pressable>
                    </View>
                </View>

                {isAdmin == 1 ? <View style={{ flex: 1, marginTop: commonMarginTop }}>
                    <Text style={[commonStyles.lightTitle, { marginVertical: 0 }]}>Actions</Text>
                    <Pressable onPress={()=>{setShowDeleteSheet(true)}}>
                        <Text style={styles.deleteTitle}>Delete Album</Text>
                    </Pressable>
                    <Text style={styles.deleteSubTitle}>Delete this Album and all of its photos forever. This action can’t be undone.</Text>
                </View> : null}

            </View>
            <CustomActionSheet title="Delete album" onPressTitle={onDeleteAlbum} onPressCancel={showOptions} isVisible={showDeleteSheet} bottomSheetContainerStyle={{ marginBottom: hp(6) }} />
        </CustomModalView>
    )
};

export default EditAlbum;

const styles = StyleSheet.create({
    deleteTitle: {
        marginTop: hp(1.5),
        fontSize: fontSize.fs16,
        color: colors.gray,
        fontFamily: fontFamily.bold,
    },
    deleteSubTitle: {
        fontSize: fontSize.fs12,
        color: colors.shuttleGray,
        fontFamily: fontFamily.light,
        marginTop: hp(0.6)
    },
})


const SelectedMembersComponent = props => {
    const { profile_photo } = props.item
    return (
        <Image source={(profile_photo == null || profile_photo == nullProfile) ? images.profilePlaceholder : { uri: profile_photo }} style={{ backgroundColor: colors.shuttleGray, height: 32, width: 32, borderRadius: 32 / 2, marginEnd: 4 }} />
    )
}

const ListEmptyComponent = props => {
    return (
        <Text style={{ fontFamily: fontFamily.light, color: colors.white, fontSize: fontSize.fs12 }}>No Members!</Text>
    )
}