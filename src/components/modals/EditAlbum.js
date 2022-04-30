import React, { useEffect, useState } from "react"
import { Text, View, FlatList, StyleSheet, Pressable, Image } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { colors } from "../../styles/colors"
import { commonStyles } from "../../utils/styles"
import CustomModalView from "../CustomModalView"
import CustomTextInput from "../../common/component/CustomTextInput"
import CommonUserSelection from "../../common/component/CommonUserSelection"
import CustomNavigationHeader from "../../common/component/CustomNavigationHeader"

import { fontFamily, fontSize, icons } from "../../assets"
import { isEmpty } from "lodash"
import { SafeAreaView } from "react-native-safe-area-context"

const EditAlbum = ({ route, navigation }) => {

    //State
    const [selectedMembers, setSelectedMembers] = useState([{ id: 1 }, { id: 2 }])

    //Render
    const renderSelectedMemberList = ({ item, index }) => <SelectedMembersComponent />

    //Actions
    const onPressClose = () => navigation.goBack()
    const onDone = () => navigation.goBack()
    const navigateToManageMembers = () => navigation.navigate('ManageMembers')
    const onDeleteAlbum = () => console.log('delete album');

    //CommonStyle
    const commonMarginTop = hp(5)

    return (
        <CustomModalView
            name="Edit Album"
            onPressClose={onPressClose}
            onPressDone={onDone}
            isDoneDisabled={false}
            isFullScreen={false}
        >
            <View style={{ marginTop: commonMarginTop, flex: 1 }}>

                <CustomTextInput title="Album Name" placeholder="Random Stuff" containerStyle={{ marginTop: 0 }} withIcon={true} />

                <View style={{ marginTop: commonMarginTop }}>
                    <Text style={commonStyles.lightTitle}>Members</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FlatList data={selectedMembers} renderItem={renderSelectedMemberList} horizontal ListEmptyComponent={() => <ListEmptyComponent />} style={{ marginEnd: hp(2) }} />
                        <Pressable onPress={navigateToManageMembers}>
                            <Image source={icons.add} style={commonStyles.iconStyle} />
                        </Pressable>
                    </View>
                </View>

                <View style={{ flex: 1, marginTop: commonMarginTop }}>
                    <Text style={[commonStyles.lightTitle, { marginVertical: 0 }]}>Actions</Text>
                    <Pressable onPress={onDeleteAlbum}>
                        <Text style={styles.deleteTitle}>Delete Album</Text>
                    </Pressable>
                    <Text style={styles.deleteSubTitle}>Delete this Album and all of its photos forever. This action can’t be undone.</Text>
                </View>

            </View>
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
    return (
        <View style={{ backgroundColor: colors.shuttleGray, height: 32, width: 32, borderRadius: 32 / 2, marginEnd: 4 }} />
    )
}

const ListEmptyComponent = props => {
    return (
        <Text style={{ fontFamily: fontFamily.light, color: colors.white, fontSize: fontSize.fs12 }}>No Members!</Text>
    )
}