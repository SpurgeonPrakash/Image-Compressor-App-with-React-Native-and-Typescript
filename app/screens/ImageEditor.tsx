import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BackHandler } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "../navigation/AppNavigator";
import ImageEditorHeader from "../components/ImageEditorHeader";
import BackgroundImageEditor from "../components/BackgroundImageEditor";
import SelectedImage from "../components/SelectedImage";
import EditorTools from "../components/EditorTools";
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from "../utils/imageSelector";
import ConfirmModel from "../components/ConfirmModel";
import { NativeEventSubscription } from "react-native";
import fsModule from "../modules/fsModule";
import { convertSizeInKb, takeReadAndWritePermission } from "../utils/helper";
import BusyLoading from "../components/BusyLoading";
import DoneLottie from "../components/DoneLottie";
import PermissionWarning from "../components/PermissionWarning";

type RouteProps = StackScreenProps<RootStackParamList, "ImageEditor">;

interface Props {
  route: RouteProps["route"];
}

let unsubscribe: () => void | NativeEventSubscription;

const ImageEditor: FC<Props> = ({ route }): JSX.Element => {
  const { imageUri } = route.params;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [processFinished, setProcessFinished] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressValue, setCompressValue] = useState<number>(1);
  const [compressedPercentage, setCompressedPercentage] = useState<number>(100);
  const [compressedImage, setCompressedImage] = useState<string>("");
  const [showPermissionWarning, setShowPermissionWarning] =
    useState<boolean>(false);
  //   const [unsubscribe, setUnsubscribe] = useState<NativeEventSubscription>();

  const resetActivity = (): void => {
    setCompressValue(1);
    setCompressedPercentage(100);
    setCompressedImage("");
    // setFileSize(0);
  };

  const captureImageToCompress = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromCamera();

    if (error) {
      console.log(error);
      return;
    }
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const selectImageToCompress = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromDevice();

    if (error) {
      console.log(error);
      return;
    }
    resetActivity();
    getImageSize(path);
    setSelectedImage(path);
  };

  const displayConfirmModel = (): void => {
    setShowConfirmModal(true);
  };

  const hideConfirmModel = (): void => {
    setShowConfirmModal(false);
  };

  const getImageSize = async (imgUri: string) => {
    const uri: string = imgUri.split("file:///")[1];
    const size = await fsModule.getSize(uri);

    setFileSize(convertSizeInKb(size));
  };

  useEffect(() => {
    unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      displayConfirmModel();
    });

    // console.log(unsub);

    // setUnsubscribe(unsub);
    // setUnsubscribe(unsub);
    // For Android
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   //    e.preventDefault();
    //   displayConfirmModel();
    //   return true;
    // });

    // return () => {
    //   BackHandler.removeEventListener("hardwareBackPress", () => {
    //     return true;
    //   });
    // };
    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (imageUri && !selectedImage) {
      setSelectedImage(imageUri);
      getImageSize(imageUri);
    }
  }, [imageUri]);

  const handleMoveToBackScreen = (): void => {
    // navigation.removeListener("beforeRemove", () => {
    //
    // });
    // console.log(unsubscribe);

    unsubscribe?.();
    // BackHandler.removeEventListener("hardwareBackPress", () => {
    //   return true;
    // });
    hideConfirmModel();
    navigation.goBack();
  };

  const handleImageCompress = async (value: number): Promise<void> => {
    const compressValue: number = Math.floor(value * 100);
    const uri: string = selectedImage.split("file:///")[1];

    setBusy(true);
    const res = await fsModule.compressImage(uri, compressValue);
    setBusy(false);

    setCompressedImage("file:///" + res.uri);
    // console.log(res);
    setCompressValue(value);
    setCompressedPercentage(Math.round(value * 100));
    setFileSize(convertSizeInKb(res.size));
  };

  const handleImageSave = async (): Promise<void> => {
    const name = "PP-" + Date.now();
    const desiredCompressedValue: number = Math.floor(compressValue * 100);
    const uri: string = compressedImage.split("file:///")[1];

    try {
      const isGranted = await takeReadAndWritePermission();

      if (!isGranted) {
        return setShowPermissionWarning(true);
      }

      const res = await fsModule.saveImageToDevice(
        uri,
        name,
        desiredCompressedValue
      );

      if (res === "Done") {
        setProcessFinished(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageEditorHeader onSavePress={handleImageSave} />
      <View style={styles.imgContainer}>
        <SelectedImage uri={compressedImage || selectedImage}>
          {(busy || processFinished) && (
            <>
              <BusyLoading visible={busy} />
              <DoneLottie
                visible={processFinished}
                onFinish={() => setProcessFinished(false)}
              />
            </>
          )}
        </SelectedImage>
      </View>
      <EditorTools
        onCaptureAnother={captureImageToCompress}
        onSelectAnother={selectImageToCompress}
        fileSize={fileSize}
        onSliderChange={handleImageCompress}
        compressValue={compressValue}
        compressedPercentage={compressedPercentage}
        // onSlidingStart={() => set}
      />
      <ConfirmModel
        title="Are You Sure!!"
        message="Are you sure, because this action will discard all your changes"
        visible={showConfirmModal}
        onPrimaryBtnPress={hideConfirmModel}
        onDangerBtnPress={handleMoveToBackScreen}
        primaryBtnTitle="Cancel"
        dangerBtnTitle="Discard"
      />
      <PermissionWarning
        visible={showPermissionWarning}
        title="Required File Write Permission"
        message="This app needs the permission to save this file inside your device"
        onClose={() => setShowPermissionWarning(false)}
      />
      <BackgroundImageEditor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
});

export default ImageEditor;
