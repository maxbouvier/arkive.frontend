import React from 'react';
import { View, Text,Dimensions, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../styles/colors';
import { images } from '../../assets';
export default function ImageViewModel({ isVisible, image, cancelBtn }) {
  return (
    <Modal
      animationIn="fadeInUp"
      animationOut="fadeOut"
      onRequestClose={() => { }}
      transparent={true}
      onBackdropPress={true}
      style={{ margin: 0 }}
      statusBarTranslucent
      backdropOpacity={0}
      useNativeDriver={true}
      visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: 'rgba(100, 100, 100, 0.5)' }}>
        <TouchableWithoutFeedback onPress={cancelBtn}>
          <View style={{ height: 40, width: 40, marginTop: Dimensions.get('screen').height / 6, borderRadius: 20, backgroundColor: colors.black, justifyContent: "center", alignItems: 'center', alignSelf: "flex-end", marginHorizontal: 20 }}>
            <Image style={{ height: 16, width: 16 }} source={images.cancel} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, marginTop: 8, borderTopLeftRadius: 18, borderTopRightRadius: 18, backgroundColor: colors.black }}>
          <View style={{height:60,justifyContent:"center",marginHorizontal:20,marginTop:25}}>
            <Image style={{ height: 34, width: 34 }} source={images.staticProfile} />
            <Text style={{alignSelf:'flex-end',textAlign:'center',color:colors.white}}>23 mins</Text>
            
          </View>
          <Image style={{width: Dimensions.get('window').width-20,alignSelf:'center',height:500}}source={image} />
        </View>
      </View>
    </Modal>
  );
}
