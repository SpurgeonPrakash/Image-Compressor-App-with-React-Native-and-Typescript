import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import UtilityButtons from "./UtilityButtons";
import { RootStackParamList } from "../navigation/AppNavigator";

interface Props {
  onSavePress?: () => void;
}

const ImageEditorHeader: FC<Props> = ({ onSavePress }): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <UtilityButtons.Back onPress={navigation.goBack} />
      <UtilityButtons.Save onPress={onSavePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ImageEditorHeader;
