import React, { useEffect, useState } from "react"
import { Text, View, SectionList } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { colors } from "../../styles/colors"
import { commonStyles } from "../../utils/styles"
import { data } from "../../utils/constant"
import CustomModalView from "../CustomModalView"
import CommonUserSelection from "../../common/component/CommonUserSelection"

import CustomActionSheet from "../CustomActionSheet"

const ManageMembers = ({ route, navigation }) => {

    //State
    const [membersList, setMembersList] = useState(data.arrOfMembersList)
    const [showUpdateMemberSheet, setShowUpdateMemberSheet] = useState(false)

    //Actions
    const onPressBack = () => navigation.goBack()
    const onDone = () => navigation.navigate('AlbumScreen');

    const confirmUnselectMember = () => setShowUpdateMemberSheet(!showUpdateMemberSheet)

    const addSelectedMembers = (item, section) => {
        const index = section.title === 'Members' ? 0 : 1
        const filterArr = membersList[index].data.map(obj => {
            if (obj.id === item.id) {
                obj.isSelected = !item.isSelected
                if (item.isSelected === false) {
                    confirmUnselectMember()
                }
            }
            return obj
        })
        let newArr = [...membersList];
        newArr[index].data = filterArr
        setMembersList(newArr);
    }

    //Render
    const renderMemberList = ({ item, index, section }) => <CommonUserSelection item={item} onPress={() => addSelectedMembers(item, section)} />

    return (
        <CustomModalView
            name="Manage Members"
            onPressBack={onPressBack}
            onPressDone={onDone}
            isDoneDisabled={false}
            isFullScreen={false}
        >
            <SectionList
                sections={membersList}
                keyExtractor={(item, index) => item + index}
                renderItem={renderMemberList}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ backgroundColor: colors.shark, paddingVertical: hp(2) }}>
                        <Text style={commonStyles.lightTitle}>{title}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
            <CustomActionSheet title="Remove Joe as Friend" onPressTitle={confirmUnselectMember} onPressCancel={confirmUnselectMember} isVisible={showUpdateMemberSheet} />
        </CustomModalView>
    )
};

export default ManageMembers;