import React from "react";
import { SafeAreaView, StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { colors } from "../../styles/colors";
import TopNavigation from "../../common/component/TopNavigation";
import { data } from "../../utils/constant";
import { fontFamily, fontSize, icons } from "../../assets";

function HomeScreen({ navigation }) {

  const onPressAlbum = () => navigation.navigate('AlbumScreen')
  const renderItem = ({ item }) => <AlbumListItem item={item} onPress={onPressAlbum} />
  const navigateToCreateAlbum = () => navigation.navigate('CreateNewAlbum', { type: 'home' })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <TopNavigation isHomeTab={true} navigation={navigation} />
      <FlatList
        data={data.albumList}
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
              onPress={navigateToCreateAlbum}
            >
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
    paddingHorizontal: hp(3),
    marginTop: hp(4),
  },
});

const AlbumListItem = (props) => {
  const { item, onPress } = props;
  const { id, image, name } = item;

  return (
    <Pressable style={aliStyles.container} onPress={onPress} >
      <View style={aliStyles.albumIconContainer}>
        <Image source={image} style={aliStyles.iconStyle} />
      </View>
      <Text style={aliStyles.name}>{name}</Text>
    </Pressable>
  );
};

const aliStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginVertical: hp(2),
    alignItems: "center",
    backgroundColor: colors.shark,
    borderRadius: hp(1.5),
    paddingVertical: hp(3),
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
    height: hp(2.8),
    width: hp(2.8)
  },
  name: {
    color: colors.white,
    fontSize: fontSize.fs16,
    fontFamily: fontFamily.bold,
    marginStart: hp(2.5),
  },
});
