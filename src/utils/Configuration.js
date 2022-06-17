import {Alert,Linking} from 'react-native'
export const awsConfig = {
    Auth: {
        identityPoolId: 'us-west-1:f93806ce-b51d-4238-91e4-8e6af2704aa4', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-west-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-west-1_MofrNb2Vq', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '3ssv18ct7n964hq45v2302igkh', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        AWSS3: {
            bucket: 'mappn141248-dev', //REQUIRED -  Amazon S3 bucket name
            region: 'us-west-1', //OPTIONAL -  Amazon service region
        }
    }
}
export const amplitudeKey = '239cd5a1181c72dc34c2ba2dc11dc034';

export const goToSetting = (props, message) => {
    Alert.alert("Arkive", message, [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => Linking.openSettings(),
      },
    ]);
  };