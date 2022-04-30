import React, { useEffect, useState } from "react"
import { Text, View, FlatList } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { colors } from "../../styles/colors"
import { commonStyles } from "../../utils/styles"
import { data } from "../../utils/constant"
import CustomModalView from "../CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import CommonUserSelection from "../../common/component/CommonUserSelection"
import { fontFamily, fontSize } from "../../assets"
import { SafeAreaView } from "react-native-safe-area-context"

const CreateNewAlbum = ({ route, navigation }) => {
    const { type } = route.params;

    //State
    const [userList, setUserList] = useState(data.arrUserList)
    const [selectedMembers, setSelectedMembers] = useState([])

    //LifeCycle
    useEffect(() => {
        updateSelectedMembers()
    }, [userList])

    //Render
    const renderSelectedMemberList = ({ item, index }) => <SelectedMembersComponent />
    const renderMemberList = ({ item, index }) => <CommonUserSelection item={item} onPress={() => addSelectedMembers(item, index)} />

    //Actions
    const onPressBack = () => navigation.goBack()
    const onDone = () => navigation.goBack()

    const updateSelectedMembers = () => {
        const filterArr = userList.filter(item => item.isSelected === true);
        setSelectedMembers(filterArr)
    }

    const addSelectedMembers = (item, index) => {
        setUserList(
            Object.values({
                ...userList,
                [index]: { ...userList[index], isSelected: !item.isSelected },
            })
        );
    }

    //CommonStyle
    const commonMarginTop = hp(5)

    const CreateAlbumComponent = () => {
        return (
            <CustomModalView
                name="New Album"
                onPressBack={onPressBack}
                onPressDone={onDone}
                isDoneDisabled={false}
                isFullScreen={type == 'home' ? true : false}
            >
                <View style={{ marginTop: commonMarginTop, flex: 1 }}>

                    <CustomTextInput title="Album Name" placeholder="Random Stuff" containerStyle={{ marginTop: 0 }} />

                    <View style={{ marginTop: commonMarginTop }}>
                        <Text style={commonStyles.lightTitle}>Members</Text>
                        <FlatList data={selectedMembers} renderItem={renderSelectedMemberList} horizontal ListEmptyComponent={() => <ListEmptyComponent />} />
                    </View>

                    <View style={{ flex: 1, marginTop: commonMarginTop }}>
                        <Text style={commonStyles.lightTitle}>Add [app] friends to album</Text>
                        <FlatList data={userList} renderItem={renderMemberList} showsVerticalScrollIndicator={false} />
                    </View>

                </View>
            </CustomModalView>
        )
    }

    if (type === 'home') {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: type === 'home' ? colors.shark : colors.black }}>
                <CreateAlbumComponent />
            </SafeAreaView>
        );
    } return <CreateAlbumComponent />

};

export default CreateNewAlbum;


const SelectedMembersComponent = props => {
    return (
        <View style={{ backgroundColor: colors.shuttleGray, height: 32, width: 32, borderRadius: 32 / 2, marginEnd: 4 }} />
    )
}

const ListEmptyComponent = props => {
    return (
        <Text style={{ fontFamily: fontFamily.light, color: colors.white, fontSize: fontSize.fs12 }}>Select Members!</Text>
    )
}