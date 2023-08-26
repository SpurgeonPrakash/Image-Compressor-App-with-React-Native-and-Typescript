import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import SelectorButton from "./SelectorButton";
import { Text } from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
  onSelectAnother?: () => void;
  onCaptureAnother?: () => void;
  fileSize?: number;
  onSliderChange?: (value: number) => void;
  compressValue: number;
  compressedPercentage?: number;
}

const EditorTools: FC<Props> = ({
  onSelectAnother,
  onCaptureAnother,
  fileSize,
  onSliderChange,
  compressValue,
  compressedPercentage,
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <SelectorButton title="Select Another" onPress={onSelectAnother}>
          <Icon name="folder-open" />
        </SelectorButton>
        <SelectorButton title="Capture Another" onPress={onCaptureAnother}>
          <Icon name="camera" />
        </SelectorButton>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Image Quality: {compressedPercentage}%</Text>
        <Text style={styles.label}>Image Size: {fileSize}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={0.1}
          maximumValue={1}
          value={compressValue}
          maximumTrackTintColor="rgba(108, 154, 222, 0.8)"
          minimumTrackTintColor="rgb(108, 154, 222)"
          thumbTintColor="rgb(108, 154, 222)"
          onValueChange={onSliderChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    borderRadius: 7,
    backgroundColor: "white",
    elevation: 15,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    color: "#272727",
    fontSize: 18,
  },
  sliderContainer: {
    paddingVertical: 20,
  },
});

export default EditorTools;
