import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, FlatList, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily, fontSize, icons } from "../../assets";
import { colors } from "../../styles/colors";
import { get, apiPath, post } from "../../Api/ApiCalling";
import CustomModalView from "../../components/CustomModalView";
import { commonFlComponentStyle } from "../../utils/styles";
import BottomBtn from "../../common/component/BottomBtn";
import { Storage } from 'aws-amplify';
import { showMessage } from "react-native-flash-message";
import { storeAuthData } from "../../reduxstore/AuthSlice";
import { addEvent, eventsNames } from "../../utils/AmplitudeEvents";
import { NativeModules } from 'react-native';
const ShareImageToAlbum = ({ navigation, route }) => {
  const { access_token, userName, fullName, userId, profile_photo,profile_created, photo_count } = useSelector((state) => state.authSlice);
  const { snapshot, imageName } = route.params;
  //State
  const [albumList, setAlbumList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [background, setBackground] = useState(false);
  const [slectedAlbumId, setSelectedAlbumId] = useState('');
  const [myMemories, setMyMemories] = useState(false);
  const [myMemoriesDetails, setMyMemoriesDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAlbumList();
    });
    return unsubscribe;
  }, [navigation]);


  const getAlbumList = async () => {
    const { isSucess, data } = await get(apiPath.userAlbums);
    if (isSucess) {
      var tempALbumArray = data
      setMyMemoriesDetails(tempALbumArray[0])
      let slectedItemArray = tempALbumArray.filter(function (item, index) {
        return index != 0;
      });
      setAlbumList(slectedItemArray)
    }
  }

  //Actions
  const onClose = () => navigation.goBack()
  const navigateToCreateNewAlbum = () => navigation.navigate('CreateNewAlbum', { type: 'share' })
  const onUpload = () => {
    setIsLoading(true)
    sendToS3Bucket();

  }
  const sendToS3Bucket = async () => {
    setIsLoading(true);
    //filtered Image
    NativeModules.Filter.applyEffects(snapshot ,async(value) =>{
      var file = value;
      var fileName = imageName
      const blob = await urlToBlob(file);
      Storage.put('album/' + imageName, blob, {
        level: 'public',
        contentType: 'image/jpeg',
      })
        .then(async res => {
          console.log(`Successfully uploaded ${res.key}`);
          //send to api
          const requestData = {
            album_id: slectedAlbumId,
            Image_details: {
              image: fileName,
              photo_uplode_time: Math.floor(Date.now() / 1000)
            },
            // media: fileName
          }
          const { isSucess, data } = await post(apiPath.addPhoto, requestData);
          if (isSucess) {
            //decrement counter 
            // dispatch(storeAuthData({
            //   access_token: access_token,
            //   userName: userName,
            //   fullName: fullName,
            //   userId: userId,
            //   profile_photo: profile_photo,
            //   photo_count: photo_count -1,
            //   profile_created:profile_created
            // }))
            addEvent(eventsNames.UPLOADIMAGETOALBUM)
            navigation.navigate('HomeStack', {
              screen: 'AlbumScreen',
              params: { _id: slectedAlbumId,isComeFromCamera:true, is_admin: (slectedAlbumId == myMemoriesDetails._id)?2:1 },
            });
            // navigation.navigate('AlbumScreen', { _id: slectedAlbumId, is_admin: 1 })
          }
        })
        .catch(err => {
          alert("Image uploading s3 bucekt")
          setIsLoading(false);
          showMessage({ message: "Oops, Something Went Wrong" })
        });
      })
  

  }
  const urlToBlob = async (url) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob'; // convert type
      xhr.send();
    })
  }

  const updatedSelection = (item, index) => {
    let newArr = [];
    if (index == -1) {
      setMyMemories(!myMemories)
      newArr = albumList.map((item, i) => {
        return { ...item, isSelected: false };
      });
      setAlbumList(newArr);
      if (!myMemories) {
        setBackground(true);
        setSelectedAlbumId(myMemoriesDetails._id)
      } else {
        setBackground(false);
        setSelectedAlbumId('')
      }
    }
    else {
      newArr = albumList.map((item, i) => {
        setMyMemories(false)
        if (index == i) {
          return { ...item, isSelected: !item.isSelected };
        } else {
          return { ...item, isSelected: false };
        }
      });
      setAlbumList(newArr);
      //selected album details 
      let selectedItemArray = newArr.filter(function (item) {
        return item.isSelected == true;
      });
      if (selectedItemArray.length > 0) {
        setBackground(true);
        setSelectedAlbumId(selectedItemArray[0]._id)
      } else {
        setBackground(false);
        setSelectedAlbumId('')
      }
    }


    // else if (myMemories == true) {
    //   setBackground(true);
    //   setSelectedAlbumId(myMemoriesDetails._id)
    // } else {
    //   setBackground(false);
    //   setSelectedAlbumId('')
    // }
    // console.log("selcted array list--" + selectedItemArray.length)
  };

  //Component render
  const renderItem = ({ item, index }) => (
    <ShareItemComponent
      item={item}
      index={index}
      onPress={() => updatedSelection(item, index)}
    />
  );

  return (
    <CustomModalView isFullScreen={false} name="Send to..." onPressClose={onClose} backgroundColor={colors.shark}>
      <View style={styles.container}>
        <ShareItemOptionComponent
          title="New album"
          subTitle="Start a new album with friends"
          icon={icons.add}
          onPress={navigateToCreateNewAlbum}
        />
        <ShareItemOptionComponent
          title="My Memories"
          subTitle="Only you can see these posts"
          icon={icons.lock}
          isSelected={myMemories}
          onPress={() => updatedSelection({}, -1)}
          isSelectEnable
        />
        <Text style={styles.recentText}>Recents</Text>
        <FlatList
          data={albumList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
        <BottomBtn setOnPress={onUpload} isLoading={isLoading} isMarginRemove={true} title={'Develop'} isSelectedBg={background} />
      </View>
    </CustomModalView>
  );
};

export default ShareImageToAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(5),
    marginBottom: hp(4),
  },
  recentText: {
    color: colors.gray,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fs14,
    marginVertical: hp(2),
    marginStart: hp(1)
  },
  uploadBtn: {
    backgroundColor: colors.primary,
    borderRadius: hp(1.5),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
  },
  uploadText: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    fontSize: fontSize.fs18,
  },
});

const ShareItemOptionComponent = (props) => {
  const { title, subTitle, icon, onPress, isSelected, isSelectEnable } = props;
  return (
    <Pressable style={sicStyles.container} onPress={onPress}>
      <View style={sicStyles.iconContainer}>
        <Image source={icon} style={sicStyles.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={commonFlComponentStyle.title}>{title}</Text>
        <Text style={commonFlComponentStyle.subTitle}>{subTitle}</Text>
      </View>
      {isSelectEnable && (
        <Image source={isSelected ? icons.selected : icons.unSelected} style={commonFlComponentStyle.selectedIcon} />
      )}
    </Pressable>
  );
};

const ShareItemComponent = (props) => {
  const { item, onPress, index } = props;
  const { album_name, isSelected } = item;

  return (
    <Pressable key={index} style={sicStyles.container} onPress={onPress}>
      <View key={index} style={[sicStyles.container, { marginBottom: 0, }]}>
        <View key={index} style={sicStyles.iconContainer}>
          <Image source={icons.people} style={sicStyles.icon} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={commonFlComponentStyle.title}>{album_name}</Text>
        </View>
        <Image source={isSelected ? icons.selected : icons.unSelected} style={commonFlComponentStyle.selectedIcon} />
      </View>
    </Pressable>
  );
};

const sicStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6
  },
  iconContainer: {
    height: hp(8.5),
    width: hp(8.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkerGray,
    borderRadius: hp(8.5) / 2,
  },
  icon: {
    resizeMode: 'contain',
    height: hp(3),
    width: hp(3)
  }
});
