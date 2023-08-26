import React, { FC } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  onPress?: () => void;
}

type buttonProps = FC<Props>;

const Back: buttonProps = ({ onPress }): JSX.Element => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon name="arrow-left" style={styles.icon} />
    </Pressable>
  );
};

const Save: buttonProps = ({ onPress }): JSX.Element => {
  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name="file-download" style={styles.icon} />
      </Pressable>
      <Text style={styles.btnTitle}>Save</Text>
    </View>
  );
};

const UtilityButtons: { Back: buttonProps; Save: buttonProps } = {
  Save,
  Back,
};

const buttonDimension = 45;
const styles = StyleSheet.create({
  container: {},
  button: {
    height: buttonDimension,
    width: buttonDimension,
    backgroundColor: "white",
    borderRadius: buttonDimension / 2,
    elevation: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#6c9ade",
  },
  btnTitle: {
    color: "#6c9ade",
    alignSelf: "center",
  },
});

export default UtilityButtons;
