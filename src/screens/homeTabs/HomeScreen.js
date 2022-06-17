import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
import { data } from "../../utils/constant";
import { fontFamily, fontSize, icons, images } from "../../assets";
import { apiPath, get } from '../../Api/ApiCalling';
function HomeScreen({ navigation }) {
  //
  const flatListRef = useRef()
  const [albumList, setAlbumList] = useState([]);
  const onPressAlbum = (item) => { navigation.navigate('AlbumScreen', { _id: item._id, is_admin: item.is_admin }) }
  const renderItem = ({ item, index }) => <AlbumListItem item={item} index={index} onPress={() => onPressAlbum(item)} />
  const navigateToCreateAlbum = () => {
    navigation.navigate('CreateNewAlbum', { type: 'home' });
  }
  // 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAlbumList();
    });
    return unsubscribe;
  }, [navigation]);

  const getAlbumList = async () => {
    const { isSucess, data } = await get(apiPath.userAlbums);
    if (isSucess) {
      setAlbumList(data)
      flatListRef.current.scrollToOffset({ animated: false, offset: 0 })
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <TopNavigation title={'ARKIVE'} isHomeTab={true} navigation={navigation} />
      <FlatList
        ref={flatListRef}
        data={albumList}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        style={styles.listStyle}
        ListFooterComponent={() => {
          return (
            <Pressable
              style={[
                aliStyles.container,
                {
                  borderStyle: "dashed",
                  borderColor: colors.darkerGray,
                  borderWidth: hp(0.3),
                  backgroundColor: "transparent",
                },
              ]}
              onPress={navigateToCreateAlbum}>
              <View style={aliStyles.albumIconContainer}>
                <Image source={icons.add} style={aliStyles.iconStyle} />
              </View>
              <Text style={aliStyles.name}>Create New Album</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  listStyle: {
    marginHorizontal: 12,
    // paddingHorizontal: hp(3),
    marginTop: hp(4),
  },
});

const AlbumListItem = (props) => {
  const { item, onPress, index } = props;
  const { _id, album_name } = item;

  return (
    <Pressable style={aliStyles.container} onPress={onPress} >
      <View style={aliStyles.albumIconContainer}>
        <Image source={(index == 0) ? icons.lock : icons.people} style={aliStyles.iconStyle} />
      </View>
      <Text style={aliStyles.name}>{album_name}</Text>
    </Pressable>
  );
};

const aliStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginVertical: hp(0.8),
    alignItems: "center",
    backgroundColor: colors.shark,
    borderRadius: hp(1.3),
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(2)
  },
  albumIconContainer: {
    backgroundColor: colors.darkerGray,
    height: hp(8),
    width: hp(8),
    borderRadius: hp(8) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    resizeMode: "contain",
    height: hp(3),
    width: hp(3)
  },
  name: {
    color: colors.white,
    fontSize: fontSize.fs16,
    fontFamily: fontFamily.bold,
    marginStart: hp(2.5),
  },
});
