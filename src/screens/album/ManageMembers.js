import React, { useEffect, useId, useState } from "react"
import { Text, View, FlatList } from "react-native"
import { colors } from "../../styles/colors"
import { commonStyles } from "../../utils/styles"
import { useDispatch, useSelector } from 'react-redux';
import CustomModalView from "../../components/CustomModalView"
import CommonUserSelection from "../../common/component/CommonUserSelection"
import CustomActionSheet from "../../components/CustomActionSheet"
import { post, apiPath, put } from "../../Api/ApiCalling"
import { storeAlbumDetails } from "../../reduxstore/AlbumDetailSlice";

const ManageMembers = ({ route, navigation }) => {
    // const { album_id } = route.params
    const { userId,access_token } = useSelector((state) => state.authSlice);
    const { album_id, album_name, album_members,isAdmin, members_details, other_friends_details } = useSelector((state) => state.albumDetailSlice);
    const dispatch = useDispatch();
    //State
    const [selfMember, setSelfMember] = useState({})
    const [albumName, setAlbumName] = useState('')
    const [membersList, setMembersList] = useState([])
    const [friendList, setFriendList] = useState([])
    const [showUpdateMemberSheet, setShowUpdateMemberSheet] = useState(false)
    //
    useEffect(() => {
        getAlbumDetails()
    }, [])

    const getAlbumDetails = async () => {
        // const { isSucess, data } = await post(apiPath.userAlbumsDetails, { _id: album_id });
        // if (isSucess) {
        //remove my id from manage members
        console.log("===="+JSON.stringify(members_details)+"----"+userId)
        let meAsAMember = members_details.filter(function (item, index) {
            return item._id == userId;
        });
        setSelfMember(meAsAMember[0])
        setAlbumName(album_name)
        let slectedItemArray = members_details.filter(function (item, index) {
            return item._id != userId;
        });
        var membersList = slectedItemArray.map((item, i) => {
            return { ...item, isSelected: true };
        });
        setMembersList(membersList)
        if (other_friends_details.length <= 0)
            setFriendList([])
        else
            setFriendList(other_friends_details)
        // }
    }

    //Actions
    const onPressBack = () => navigation.goBack()
    const onDone = async () => {
        //map album ids of members
        // var idsOfMembers = membersList.map(ob => ob._id);
        // const requestData = {
        //     "_id": album_id,
        //     "album_name": albumName,
        //     "album_members": idsOfMembers
        // }
        // //Update album members 
        // const { isSucess, data } = await put(apiPath.updateAlbum, requestData);
        // if (isSucess) {
        //adding my id in memeber 
        const newMemberList = [...membersList];
        newMemberList.push(selfMember);
        console.log("newMemberList--"+JSON.stringify(newMemberList)+"friendLIst--"+JSON.stringify(friendList))
        dispatch(storeAlbumDetails({
            album_id: album_id,
            album_name: album_name,
            album_members: album_members,
            members_details: newMemberList,
            other_friends_details: friendList,
            isAdmin:isAdmin
        }))
        navigation.goBack();
        // navigation.navigate('EditAlbum', { albumData: { members_details: membersList, album_name: albumName, album_id: album_id } })
        // }


    }

    const confirmUnselectMember = () => setShowUpdateMemberSheet(!showUpdateMemberSheet)

    const addSelectedMembers = (item, friendIndex) => {
        //add this item to member list and remove from friends list
        var filterArr = membersList
        filterArr.push({ ...item, isSelected: true })
        setMembersList(filterArr)

        //remove that index in friend list
        let slectedItemArray = friendList.filter(function (item, index) {
            return index != friendIndex;
        });
        setFriendList(slectedItemArray)

    }
    const removeSelectedMembers = (item, friendIndex) => {
        //add this item to friend list and remove from member list
        var filterArr = friendList
        filterArr.push({ ...item, isSelected: false })
        setFriendList(filterArr)

        //remove that index in friend list
        let slectedItemArray = membersList.filter(function (item, index) {
            return index != friendIndex;
        });
        setMembersList(slectedItemArray)
    }

    //Render
    const renderFriendsLIst = ({ item, index }) => <CommonUserSelection item={item} onPress={() => { addSelectedMembers(item, index) }} />
    const renderMemberList = ({ item, index }) => <CommonUserSelection item={item} onPress={() => { removeSelectedMembers(item, index) }} />
    return (
        <CustomModalView
            name="Manage Members"
            onPressBack={onPressBack}
            onPressDone={onDone}
            backgroundColor={colors.shark}
            isFullScreen={false}>
            <Text style={commonStyles.lightTitle}>Members</Text>
            <View><FlatList data={membersList} renderItem={renderMemberList} /></View>
            <Text style={commonStyles.lightTitle}>Add Arkive friends to album</Text>
            <View><FlatList data={friendList} renderItem={renderFriendsLIst} /></View>
            <CustomActionSheet title="Remove Joe as Friend" onPressTitle={confirmUnselectMember} onPressCancel={confirmUnselectMember} isVisible={showUpdateMemberSheet} />
        </CustomModalView>
    )
};

export default ManageMembers;