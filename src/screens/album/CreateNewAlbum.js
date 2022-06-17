import React, { useEffect, useState, useCallback } from "react"
import { Text, View, FlatList, Image, TouchableOpacity } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from "../../styles/colors"
import { commonStyles } from "../../utils/styles"
import { useSelector } from "react-redux";
import { images } from '../../assets/index';
import CustomModalView from "../../components/CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import CommonUserSelection from "../../common/component/CommonUserSelection"
import { fontFamily, fontSize } from "../../assets"
import { SafeAreaView } from "react-native-safe-area-context"
import { get, apiPath, post, } from '../../Api/ApiCalling';
import { CONST, nullProfile } from "../../utils/constant"
import { addEvent, eventsNames } from "../../utils/AmplitudeEvents"
const CreateNewAlbum = ({ route, navigation }) => {
    const { type } = route.params;
    const { profile_photo } = useSelector((state) => state.authSlice);
    const [selectedMembers, setSelectedMembers] = useState([])
    const [myFriendList, setMyFriendList] = useState([]);
    const [albumName, setalbumName] = useState("");

    useEffect(() => {
        getFriendsList();
    }, []);

    const getFriendsList = async () => {
        const { isSucess, data } = await get(apiPath.userFriends);
        if (isSucess) {
            data.forEach(function (element) {
                element.isSelected = false;
            });
            setMyFriendList(data)
        }
    }

    //LifeCycle
    useEffect(() => {
        updateSelectedMembers()
    }, [myFriendList])


    //Render
    const renderSelectedMemberList = ({ item, index }) => <SelectedMembersComponent item={item} />
    const renderMemberList = ({ item, index }) =>
        <CommonUserSelection item={item} onPress={() => addSelectedMembers(item, index)} />

    //Actions
    const onPressBack = () => navigation.goBack()
    const onDone = async () => {
        var selectedItemsArray = myFriendList.filter(x => x.isSelected == true)
        console.log("SelectedArray--" + JSON.stringify(selectedItemsArray))
        var idsOfFriends = selectedItemsArray.map(ob => ob._id);
        const requestBody = {
            album_name: albumName,
            album_members: idsOfFriends
        }
        console.log("requestBody---" + JSON.stringify(idsOfFriends))
        const { isSucess, data } = await post(apiPath.createAlbum, requestBody);
        if (isSucess) {
            navigation.goBack()
            addEvent(eventsNames.ALBUMCREATED)
        }
    }

    const updateSelectedMembers = () => {
        const filterArr = myFriendList.filter(item => item.isSelected === true);
        filterArr.push({ profile_photo: profile_photo })
        setSelectedMembers(filterArr)
    }

    const addSelectedMembers = (item, index) => {
        setMyFriendList(
            Object.values({
                ...myFriendList,
                [index]: { ...myFriendList[index], isSelected: !item.isSelected },
            })
        );
    }
    //CommonStyle
    const commonMarginTop = hp(5)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <CustomModalView
                name="New Album"
                onPressBack={onPressBack}
                onPressDone={onDone}
                isDoneDisabled={(albumName != '') ? false : true}
                isFullScreen={type == 'home' ? true : false}>
                <View style={{ marginTop: commonMarginTop, flex: 1 }}>

                    <CustomTextInput
                        title="Album Name"
                        placeholder="Add"
                        value={albumName}
                        onChangeText={(value) => setalbumName(value)}
                        containerStyle={{ marginTop: 0 }} />
                        
                    <View style={{ marginTop: commonMarginTop }}>
                        <Text style={commonStyles.lightTitle}>Members</Text>
                        <FlatList data={selectedMembers} renderItem={renderSelectedMemberList} horizontal ListEmptyComponent={() => <ListEmptyComponent />} />
                    </View>
                    <View style={{ flex: 1, marginTop: commonMarginTop }}>
                        <Text style={commonStyles.lightTitle}>Add Arkive friends to album</Text>
                        <FlatList data={myFriendList} renderItem={renderMemberList} showsVerticalScrollIndicator={false} />
                    </View>
                </View>
            </CustomModalView>
        </SafeAreaView>

    );

};

export default CreateNewAlbum;


const SelectedMembersComponent = props => {
    const { profile_photo } = props.item
    return (
        <Image source={(profile_photo == null || profile_photo == nullProfile) ? images.profilePlaceholder : { uri: profile_photo }} style={{ backgroundColor: colors.shuttleGray, height: 32, width: 32, borderRadius: 32 / 2, marginEnd: 4 }} />

    )
}

const ListEmptyComponent = props => {
    return (
        <Text style={{ fontFamily: fontFamily.light, color: colors.white, fontSize: fontSize.fs12 }}>Select Members!</Text>
    )
}