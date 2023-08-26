import React, { FC, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationProp } from "@react-navigation/native";

import LargeIconButton from "../components/LargeIconButton";
import {
  selectAndCropImageFromCamera,
  selectAndCropImageFromDevice,
} from "../utils/imageSelector";
import { RootStackParamList } from "../navigation/AppNavigator";
import { checkCameraPermission } from "../utils/helper";
import PermissionWarning from "../components/PermissionWarning";

interface Props {
  navigation: NavigationProp<RootStackParamList>;
}

const Home: FC<Props> = ({ navigation }): JSX.Element => {
  const [showPermissionInfoAlert, setShowPermissionInfoAlert] =
    useState<boolean>(false);
  const navigateToImageEditor = (uri: string): void => {
    navigation.navigate("ImageEditor", { imageUri: uri });
  };

  const handleImageCapture = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromCamera();
    if (error) {
      const isGranted: boolean = await checkCameraPermission();
      if (!isGranted) return setShowPermissionInfoAlert(true);
    }
    if (path) {
      navigateToImageEditor(path);
    }
  };

  const handleImageSelection = async (): Promise<void> => {
    const { path, error } = await selectAndCropImageFromDevice();

    if (error) {
      console.log(error);
      return;
    }
    navigateToImageEditor(path);
  };

  // const handleOnPress = async (): Promise<void> => {
  //   try {
  //     const message = await fsModule.justGreetMe("Spurgeon");
  //     console.log(message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          // onPress={handleOnPress}
          style={styles.title}
        >
          Choose Your Image
        </Text>
        <Text style={styles.secondaryText}>
          You can select your image using one of these option which you want to
          convert to passport size.
        </Text>
      </View>

      <LargeIconButton title="Capture" onPress={handleImageCapture}>
        <Icon name="camera" />
      </LargeIconButton>
      <LargeIconButton title="Capture" onPress={handleImageSelection}>
        <Icon name="folder-open" />
      </LargeIconButton>
      <PermissionWarning
        title="Required Camera Permission"
        message="This app is heavily based on Camera, You have to accept the permission"
        visible={showPermissionInfoAlert}
        onClose={() => setShowPermissionInfoAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    color: "#272727",
    fontWeight: "500",
    textAlign: "center",
  },
  secondaryText: {
    color: "#272727",
    textAlign: "center",
    opacity: 0.5,
    lineHeight: 20,
    paddingTop: 5,
  },
});

export default Home;
