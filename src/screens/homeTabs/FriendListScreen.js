import React, { useState, useEffect } from "react";
import { View, Image, Pressable, SafeAreaView,TextInput, TouchableOpacity, Platform, Text, FlatList } from "react-native";
import { images, icons, fontFamily, fontSize } from "../../assets";
import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
import Contacts from "react-native-contacts";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { addEvent, eventsNames } from '../../utils/AmplitudeEvents'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { post, put, apiPath } from '../../Api/ApiCalling';
import { goToSetting } from '../../utils/Configuration'
import { nullProfile } from "../../utils/constant";
import { requestMultiple, PERMISSIONS, RESULTS, checkMultiple } from 'react-native-permissions';
import CustomActionSheet from "../../components/CustomActionSheet";
import FastImage from 'react-native-fast-image'
function FriendListScreen({ navigation }) {
  //Data
  const [tabIndex, setTabIndex] = useState(0);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [myContactsList, setMyContactsList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);
  //base value of contacst and friends 
  const [baseContactsList, setBaseContactsList] = useState([])
  const [baseFriendList, setBaseFriendList] = useState([])
  const [pendingRequestList, setPendingRequestList] = useState([]);
  const [showDeleteSheet, setShowDeleteSheet] = useState(false)
  const [removeItem, setRemoveItem] = useState({});
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    permissionCheck() ? Contacts.getAll()
      .then(async (contacts) => {
        let tempContacts = contacts;
        let permittedValues = tempContacts.map(value => value.phoneNumbers);
        var doubledArray = permittedValues.map(subarray => subarray.map(value => value.number));
        var latestArray = doubledArray.map((data, index, array) => data[0]);
        setPhoneContacts(latestArray);
        getallContacts(latestArray);
      }) : null
  }, []);

  //Actions 
  const permissionCheck = async () => {
    checkMultiple([PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
      var cameraStatus = false
      if (statuses[PERMISSIONS.IOS.CONTACTS] == RESULTS.GRANTED) {
        cameraStatus = true
      } else {
        goToSetting("", "Contact permission is required ,so you can add friends and share moments with them.")
        cameraStatus = false
      }
    });
  }
  const getallContacts = async (latestArray) => {
    console.log("Request data--" + JSON.stringify(latestArray));
    const { isSucess, data } = await post(apiPath.contacts, latestArray);
    // alert("pending requests--"+JSON.stringify(data.PendingRequest))
    if (isSucess) {
      setMyContactsList(data.contacts);
      setBaseContactsList(data.contacts);
      setBaseFriendList(data.Friends);
      setMyFriendList(data.Friends);
      setPendingRequestList(data.PendingRequest);
    }
  }
  const sendFriendRequest = async (item) => {
    const { isSucess, data } = await post(apiPath.friendRequest, { to_user_id: item._id });
    if (isSucess) {
      addEvent(eventsNames.ADDFRIEND)
      getallContacts(phoneContacts);
      setSearchTxt("")
      // alert("Request sent" + JSON.stringify(isSucess))
    }
  }
  const handleRequestAction = async (item, action) => {
    const requestData = {
      _id: item._id,
      flag: action // 1 = accept,  2 =. reject
    }
    const { isSucess } = await post(apiPath.friendResponse, requestData);
    // alert("requestData--"+JSON.stringify(requestData))
    if (isSucess) {
      getallContacts(phoneContacts);
      setSearchTxt("")
      // alert("responseData--"+JSON.stringify(requestData))
    }
  }
  const removeFriend = async () => {
    const requestData = {
      to_user_id: removeItem._id
    }
    const { isSucess, data } = await put(apiPath.removeFriend, requestData);
    if (isSucess) {
      getallContacts(phoneContacts);
      setSearchTxt("")
      // alert("Removed Successfully")
    }
  }
  const renderItemForContacts = ({ item, index }) => {
    console.log("renderItemForPendingRequest--" + JSON.stringify(item.profile_photo))
    return (
      <View
        key={item}
        style={{
          marginTop: 18,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FastImage style={{ height: 48, width: 48, overflow: 'hidden', borderRadius: 150 / 2 }}
          source={(item.profile_photo == nullProfile || item.profile_photo == null) ? images.profilePlaceholder : { uri: item.profile_photo }} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 14,
              fontFamily: fontFamily.bold,
            }}
          >
            {item.full_name}
          </Text>
          <Text style={{ color: colors.white, fontSize: fontSize.fs13, marginTop: 3 }}>
            {item.username}
          </Text>
        </View>
        {(tabIndex != 0) ?
          <Pressable onPress={() => { setShowDeleteSheet(true, item._id); setRemoveItem(item) }}>
            <Image
              style={{ height: 32, width: 32, marginLeft: 22 }}
              source={images.cancel}
            />
          </Pressable>
          :
          (item.request_status == null) ?
            <Pressable onPress={() => sendFriendRequest(item)}>
              <Image style={{ height: 33, width: 80 }} source={images.add} />
            </Pressable> :
            <TouchableOpacity>
              <Image style={{ height: 32, width: 80 }} source={icons.requested_icon} />
            </TouchableOpacity>
        }

      </View>
    );
  };
  const renderItemForPendingRequest = ({ item, index }) => {
    console.log("renderItemForPendingRequest--" + JSON.stringify(item.profile_photo))
    return (
      <View>
        <View style={{ marginTop: hp(2), flexDirection: "row", alignItems: "center" }}>
          <FastImage style={{ height: 48, width: 48, overflow: 'hidden', borderRadius: 150 / 2 }}
            source={(item.profile_photo == nullProfile || item.profile_photo == null) ? images.profilePlaceholder : { uri: item.profile_photo }} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ color: colors.white, fontSize: 14, fontFamily: fontFamily.bold }}>
              {item.full_name}
            </Text>
            <Text style={{ color: colors.white, fontSize: fontSize.fs13, marginTop: 3 }}>
              {item.username}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <Pressable onPress={() => handleRequestAction(item, 1)}>
              <Text style={{ color: colors.white, overflow: 'hidden', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.primary, fontFamily: fontFamily.bold }}>
                Accept
              </Text>
            </Pressable>
            <Pressable onPress={() => handleRequestAction(item, 2)}>
              <Image
                style={{ height: 32, width: 32, marginLeft: 22 }}
                source={images.cancel}
              />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
  const searchText = (e) => {
    setSearchTxt(e)
    let text = e.toLowerCase()
    console.log("Search Text--" + text);
    let dataOfMyContact = baseContactsList
    let dataOfMyFriends = baseFriendList
    let filteredDataOfContacts = dataOfMyContact.filter((item) => {
      return item.full_name.toLowerCase().match(text)
    })
    let filteredDataOfMyFriends = dataOfMyFriends.filter((item) => {
      return item.full_name.toLowerCase().match(text)
    })
    setMyContactsList(filteredDataOfContacts);
    setMyFriendList(filteredDataOfMyFriends);
  }
  const showOptions = () => setShowDeleteSheet(!showDeleteSheet)

  const onRemoveFriend = async () => {
    setShowDeleteSheet(false);
    removeFriend()

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      {/* navigation bar*/}
      <TopNavigation isHomeTab={false} title={"Friends"} navigation={navigation} position={'relative'} />
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 12 }}>
        {/* search bar*/}
        <View style={{ backgroundColor: colors.darkerGray, alignItems: "center", paddingHorizontal: hp(2), paddingVertical: (Platform.OS == "android") ? hp(0.5) : hp(2), borderRadius: 12, flexDirection: "row" }}>
          <Image source={icons.search} style={{ height: 16, width: 16 }} />
          <TextInput style={{ flex: 1, color: colors.white, marginLeft: 12, fontSize: fontSize.fs15, fontFamily: fontFamily.bold }}
            placeholderTextColor={colors.shuttleGray}
            selectionColor={colors.white}
            value={searchTxt}
            onChangeText={(value) => { searchText(value) }}
            placeholder={(tabIndex == 0) ? 'Search by username' : 'Search my friends'} />
          {searchTxt != "" ? <TouchableOpacity style={{ height: 25, width: 25, alignItems: "center", justifyContent: "center" }} onPress={() => { setSearchTxt("");; getallContacts(phoneContacts) }} >
            <Image source={icons.close} style={{ height: 14, width: 14, tintColor: colors.shuttleGray, alignSelf: "center" }} /></TouchableOpacity> : null}
        </View>
        {/* Tabbbar */}
        <View style={{ backgroundColor: colors.darkerGray, marginTop: 20, marginTop: 20, borderRadius: 8, justifyContent: 'center' }}>
          <SegmentedControlTab
            values={["Add", "Friends (" + `${myFriendList.length}` + ")"]}
            selectedIndex={tabIndex}
            borderRadius={8}
            tabStyle={{ backgroundColor: colors.darkerGray, borderColor: colors.darkerGray, borderWidth: 0, height: hp(4.5) }}
            activeTabStyle={{ backgroundColor: colors.shuttleGray, borderRadius: 8 }}
            tabTextStyle={{ fontSize: fontSize.fs16, fontFamily: fontFamily.medium, color: colors.white, }}
            activeTabTextStyle={{ fontSize: fontSize.fs16, fontFamily: fontFamily.bold }}
            onTabPress={(index) => { setTabIndex(index); getallContacts(phoneContacts); }}
          />
        </View>
        {/* List of pending requests */}
        {(tabIndex == 0) ?
          <View>
            <FlatList
              contentContainerStyle={{ marginTop: hp(2) }}
              data={pendingRequestList}
              renderItem={renderItemForPendingRequest}
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text style={{ color: colors.white, fontFamily: fontFamily.medium, fontSize: fontSize.fs14, marginTop: hp(3), color: colors.shuttleGray }}>Friend Requests</Text>
                    <Text style={{ color: colors.white, fontSize: fontSize.fs14, marginVertical: 8, color: colors.gray }}>Your friend requests will appear here</Text>
                  </View>
                )
              }}
            />
          </View> : null}
        {/* List of friends and contacts */}
        <Text style={{ color: colors.white, fontFamily: fontFamily.medium, fontSize: fontSize.fs14, marginTop: hp(2.5), color: colors.shuttleGray }}>
          {(tabIndex == 0) ? `Contacts on Arkive (${myContactsList.length})` : `All Friends (${myFriendList.length})`}</Text>
        <FlatList
          contentContainerStyle={{ flex: 1, }}
          data={(tabIndex == 0) ? myContactsList : myFriendList}
          renderItem={renderItemForContacts}
          ListEmptyComponent={() => {
            return (<View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: colors.gray, alignSelf: "center" }}>No data found</Text>
            </View>)
          }}
        />
        {/* Bottom sheet for remove friend */}
        <CustomActionSheet title={"Remove " + removeItem.full_name + " as Friend"} onPressTitle={onRemoveFriend} onPressCancel={showOptions} isVisible={showDeleteSheet} bottomSheetContainerStyle={{ marginBottom: hp(6) }} />
      </View>
    </SafeAreaView>
  );


}
export default FriendListScreen;
