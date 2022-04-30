import React, { useState } from "react";
import { StyleSheet, View, Image, Text, FlatList, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { data } from "../../utils/constant";
import { fontFamily, fontSize, icons } from "../../assets";
import { colors } from "../../styles/colors";

import CustomModalView from "../CustomModalView";
import { commonFlComponentStyle } from "../../utils/styles";

const ShareImage = ({ navigation, route }) => {

  const { snapshot } = route.params;

  //State
  const [recentAlbum, updateRecentAlbum] = useState(data.recentAlbumList);
  const [myMemories, setMyMemories] = useState(false);

  //Actions
  const onClose = () => navigation.goBack()
  const navigateToCreateNewAlbum = () => navigation.navigate('CreateNewAlbum', { type: 'share' })
  const onUpload = () => navigation.navigate('TabNavigation', { screen: 'HomeStack', params: { screen: 'AlbumScreen', } })

  const updatedSelection = (item, index) => {
    updateRecentAlbum(
      Object.values({
        ...recentAlbum,
        [index]: { ...recentAlbum[index], isSelected: !item.isSelected },
      })
    );
  };

  //Component render
  const renderItem = ({ item, index }) => (
    <ShareItemComponent
      item={item}
      onPress={() => updatedSelection(item, index)}
    />
  );

  return (
    <CustomModalView name="Send to..." onPressClose={onClose}>
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
          onPress={() => setMyMemories(!myMemories)}
          isSelectEnable
        />

        <Text style={styles.recentText}>Recents</Text>

        <FlatList
          data={recentAlbum}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Pressable style={styles.uploadBtn} onPress={onUpload}>
          <Text style={styles.uploadText}>Upload</Text>
        </Pressable>
      </View>
    </CustomModalView>
  );
};

export default ShareImage;

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
  const { item, onPress } = props;
  const { title, isSelected } = item;

  return (
    <Pressable style={sicStyles.container} onPress={onPress}>
      <View style={sicStyles.iconContainer}>
        <Image source={icons.people} style={sicStyles.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={commonFlComponentStyle.title}>{title}</Text>
      </View>
      <Image source={isSelected ? icons.selected : icons.unSelected} style={commonFlComponentStyle.selectedIcon} />
    </Pressable>
  );
};

const sicStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
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
