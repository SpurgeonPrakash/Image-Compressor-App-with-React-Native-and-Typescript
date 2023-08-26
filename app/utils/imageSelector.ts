import { PermissionsAndroid } from "react-native";
import { Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

export const requestCameraPermission = async (): Promise<void> => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message:
                "You have to accept the permission. Only then you will be able to take picture",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          const { GRANTED, NEVER_ASK_AGAIN, DENIED } = PermissionsAndroid.RESULTS;
    
          // if (granted === NEVER_ASK_AGAIN) {
          //   return Alert.alert(
          //     "Failed to open Camera",
          //     "It's look like you have disabled the camera permission for this app. Please grant Permission and continue.."
          //   );
          // }
    
          // if (granted === DENIED) {
          //   return Alert.alert(
          //     "Failed to open Camera",
          //     "Sorry, But to use this feature you have to accept the CAMERA PERMISSION"
          //   );
          // }
    
          // if (granted === GRANTED) {
          //   // console.log(granted);
          // }
    } catch (error) {
        console.log(
        "Failed to open Camera, error inside camera permission",
        error
      );
    }
}

type imageResult = {path: string, error: unknown | null}

export const selectAndCropImageFromCamera = async (width: number = 413, height: number = 531): Promise<imageResult> => {
  try {
    await requestCameraPermission();
  const { path } = await ImagePicker.openCamera({
    width: width,
    height: height,
    cropping: true,
  });
  return {path, error: null}
  } catch (error) {
    return {path: "", error: error}
  }
}

export const selectAndCropImageFromDevice = async (width: number = 413, height: number = 531): Promise<imageResult> => {
  try {
    await requestCameraPermission();
  const { path } = await ImagePicker.openPicker({
    width: width,
    height: height,
    cropping: true,
  });
  return {path, error: null}
  } catch (error) {
    return {path: "", error: error}
  }
}