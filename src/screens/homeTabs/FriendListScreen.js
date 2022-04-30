import React, { useState, useEffect } from "react";
import { View, Image, Pressable, SafeAreaView, PermissionsAndroid, Text, FlatList } from "react-native";
import { images, icons, fontFamily, fontSize } from "../../assets";
import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
import Contacts from "react-native-contacts";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSelector } from "react-redux";
import { apiCalling, apiPath } from '../../Api/AuthApis';
import { TouchableOpacity } from "react-native-gesture-handler";
// import SegmentedControl from 'rn-segmented-control';
function FriendListScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [myContactsList, setMyContactsList] = useState([]);
  const [myFriendList, setMyFriendList] = useState([]);
  const [pendingRequestList, setPendingRequestList] = useState([]);
  const { access_token } = useSelector((state) => state.authSlice);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    )
      .then(Contacts.getAll()
        .then(async (contacts) => {
          let tempContacts = contacts;
          let permittedValues = tempContacts.map(value => value.phoneNumbers);
          var doubledArray = permittedValues.map(subarray => subarray.map(value => value.number));
          var latestArray = doubledArray.map((data, index, array) => data[0]);
          setPhoneContacts(latestArray);
          getallContacts(latestArray);
        })
        .catch((e) => {
          console.log(e)
        }))
  }, []);

  const getallContacts = async (latestArray) => {
    console.log("phoneContacts--" + JSON.stringify(latestArray))
    const { isSucess, data } = await apiCalling(apiPath.contacts, latestArray, access_token);
    setMyContactsList(data.contacts);
    setMyFriendList(data.Friends);
    setPendingRequestList(data.PendingRequest);
  }
  const sendFriendRequest = async (item) => {
    const { isSucess, data } = await apiCalling(apiPath.friendRequest, { to_user_id: item._id }, access_token);
    if (isSucess) {
      // getallContacts(phoneContacts);
      alert("Request sent" + JSON.stringify(isSucess))
    }
  }
  const handleRequestAction = async (item, action) => {
    const requestData = {
      _id: item._id,
      flag: action // 1 = accept,  2 =. reject
    }
    const { isSucess, data } = await apiCalling(apiPath.friendResponse, requestData, access_token);
    if (isSucess){
      alert("Response")
      // getallContacts(phoneContacts);
    }
     
  }
  const renderItemForContacts = ({ item, index }) => {
    return (
      <View
      key={index}
        style={{
          marginTop: 18,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image style={{ height: 48, width: 48 }} source={images.profilePlaceholder} />
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
        {item.request_status == null ?
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
  const renderItemForPendingRequest = () => {
    return (
      pendingRequestList.length != 0 ?
        <View style={{ marginTop: hp(2), flexDirection: "row", alignItems: "center" }}>
          <Image style={{ height: 48, width: 48 }} source={images.profilePlaceholder} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ color: colors.white, fontSize: 14, fontFamily: fontFamily.bold }}>
              {pendingRequestList[0].full_name}
            </Text>
            <Text style={{ color: colors.white, fontSize: fontSize.fs13, marginTop: 3 }}>
              {pendingRequestList[0].username}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", }}>
            <Pressable onPress={() => handleRequestAction(pendingRequestList[0], 1)}>
              <Text style={{ color: colors.white, overflow: 'hidden', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.primary, fontFamily: fontFamily.bold }}>
                Accept
              </Text>
            </Pressable>
            <Pressable onPress={() => handleRequestAction(pendingRequestList[0], 2)}>
              <Image
                style={{ height: 32, width: 32, marginLeft: 22 }}
                source={images.cancel}
              />
            </Pressable>
          </View>
        </View> :
        <View>
          <Text style={{ color: colors.white, fontSize: fontSize.fs14, marginVertical: 8, color: colors.gray }}>Your friend requests will appear here</Text>
        </View>)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <TopNavigation isHomeTab={false} title={"Friends"} navigation={navigation} position={'relative'} />
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: colors.darkerGray,
            alignItems: "center",
            marginTop: 18,
            paddingHorizontal: hp(2),
            paddingVertical: hp(2),
            borderRadius: 12,
            flexDirection: "row",
          }}
        >
          <Image source={icons.search} style={{ height: 16, width: 16 }} />
          <Text style={{ color: colors.shuttleGray, marginLeft: 12, fontSize: fontSize.fs16, fontFamily: fontFamily.bold }}>
            Search my friends
          </Text>
        </View>
        <View style={{ backgroundColor: colors.darkerGray, marginTop: 20, marginTop: 20, borderRadius: 8, justifyContent: 'center' }}>
          <SegmentedControlTab
            values={["Add friends", "Friends (#)"]}
            selectedIndex={index}
            borderRadius={8}
            tabStyle={{ backgroundColor: colors.darkerGray, borderColor: colors.darkerGray, borderWidth: 0, height: 34 }}
            activeTabStyle={{ backgroundColor: colors.shuttleGray, borderRadius: 8 }}
            tabTextStyle={{ fontSize: fontSize.fs16, fontFamily: fontFamily.medium, color: colors.white, }}
            activeTabTextStyle={{ fontSize: fontSize.fs16, fontFamily: fontFamily.bold }}
            onTabPress={(index) => setIndex(index)}
          />
        </View>
        <Text style={{ color: colors.white, fontFamily: fontFamily.medium, fontSize: fontSize.fs14, marginTop: hp(2), color: colors.shuttleGray }}>Friend Requests</Text>
        {renderItemForPendingRequest()}
        <Text style={{ color: colors.white, fontFamily: fontFamily.medium, fontSize: fontSize.fs14, marginTop: hp(2), color: colors.shuttleGray }}>Contacts on [app] ({myContactsList.length})</Text>
        <FlatList
          contentContainerStyle={{ flex: 1, }}
          data={(index == 0) ? myContactsList : myFriendList}
          renderItem={renderItemForContacts}
          ListEmptyComponent={() => {
            return (<View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: colors.gray, alignSelf: "center" }}>No data found</Text>
            </View>)
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );


}
export default FriendListScreen;
