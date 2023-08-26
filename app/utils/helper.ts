import { PermissionsAndroid } from "react-native";

export const convertSizeInKb =(size: number):number => {
     // convert to kb and limit floating value to 2 digits and convert it into number
     return +(size / 1000).toFixed(2);
}

// Checking for the permission
export const checkCameraPermission = async (): Promise<boolean> => {
     return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
}

export const takeReadAndWritePermission = async ():Promise<boolean> => {
     const res = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);

     
     const writePermission = res["android.permission.WRITE_EXTERNAL_STORAGE"];
     // const readPermission = res["android.permission.READ_EXTERNAL_STORAGE"];

     // if(writePermission !== "granted" || readPermission !== "granted") {
     if(writePermission !== "granted") {
          return false;
     }
     
     return true;
}