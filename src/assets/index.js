import { RFValue } from "react-native-responsive-fontsize";

const icons = {
  camera: require("./icons/tab/camera.png"),
  location: require("./icons/tab/location.png"),
  profile: require("./icons/tab/profile.png"),
  home: require("./icons/tab/home.png"),
  closeModal: require("./icons/common/small-close-button.png"),
  search: require("./icons/common/search.png"),
  cameraFlashOn: require("./icons/common/camera-flash.png"),
  cameraFlashOff: require("./icons/common/flash.png"),
  cameraClick: require("./icons/common/take-photo.png"),
  // camera: require("./icons/permissions/camera.png"),
  notifications: require("./icons/permissions/notification.png"),
  contact: require("./icons/permissions/contact.png"),
  selection: require("./icons/permissions/permission_selected.png"),
  deSelection: require("./icons/permissions/permission_deselected.png"),
  editDetails: require("./icons/common/edit.png"),
  close: require("./icons/common/close.png"),
  add: require("./icons/common/add.png"),
  lock: require("./icons/common/lock.png"),
  people: require("./icons/common/people.png"),
  selected: require("./icons/common/selected-item.png"),
  unSelected: require("./icons/common/unselected-item.png"),
  back: require('./icons/common/back.png'),
  defaultUserProfile: require('./icons/common/default-profile.png'),
  horizontalOptions: require('./icons/common/horizontal-options.png'),
  share: require('./icons/common/share.png'),
  down_arrow:require('./icons/common/down_arrow.png'),
  requested_icon:require('./icons/common/requested_icon.png')
};
const touchArea = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};

const images = {
  addFriends: require("./images/addfriends.png"),
  backArrow: require("./images/backarrow.png"),
  confirm: require("./images/confirm.png"),
  onboardingBg: require("./images/onboardingBg.png"),
  profilePlaceholder: require("./images/profilePlaceholder.png"),
  retake: require("./images/retake.png"),
  setting: require("./images/setting.png"),
  staticProfile: require("./images/staticprofile.png"),
  cancel: require("./images/cancel.png"),
  editname: require("./images/editname.png"),
  add: require("./images/add.png"),
  splashBg:require("./images/splash_bg.png"),
  imageGridBg:require("./images/imageGridBg.png")
};

const dummyImages = {
  dummy1: require("./images/dummyImages/1.png"),
  dummy2: require("./images/dummyImages/2.png"),
  dummy3: require("./images/dummyImages/3.png"),
  dummy4: require("./images/dummyImages/4.png"),
  dummy5: require("./images/dummyImages/5.png"),
  face1: require("./images/dummyImages/face1.jpg"),
  face2: require("./images/dummyImages/face2.png"),
  face3: require("./images/dummyImages/face3.jpg"),
  face4: require("./images/dummyImages/face4.jpeg"),
  face5: require("./images/dummyImages/face5.jpg"),
};

const animatedJson = {
  celebrate: require("./animation/animation.json"),
};

const fontFamily = {
  ltBlack: "HelveticaNeueLT-BlackExt",
  regular: "HelveticaNeue-Regular",
  medium: "HelveticaNeueMedium",
  bold: "HelveticaNeue-Bold",
  lt93Black: "HelveticaNeue LT 93 BlackEx",
  thin: "HelveticaNeueThin",
  light: "HelveticaNeueLight",
  ltPro: "HelveticaNeueLTPro-MdEx",
};

const fontSize = {
  fs8: RFValue(8),
  fs10: RFValue(10),
  fs11: RFValue(11),
  fs12: RFValue(12),
  fs13: RFValue(13),
  fs14: RFValue(14),
  fs15: RFValue(15),
  fs16: RFValue(16),
  fs18: RFValue(18),
  fs20: RFValue(20),
  fs22: RFValue(22),
  fs25: RFValue(25),
  fs28: RFValue(28),
  fs30: RFValue(30),
  fs32: RFValue(32),
  fs36: RFValue(36),
  fs50: RFValue(50),
  fs62: RFValue(62),
};



export { icons, images, dummyImages, animatedJson, fontFamily, fontSize };
