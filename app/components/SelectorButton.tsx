import React, { FC, Children, isValidElement, cloneElement } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

interface Props {
  title: string;
  children?: React.ReactNode;
  onPress?: () => void;
}

const SelectorButton: FC<Props> = ({
  title,
  onPress,
  children,
}): JSX.Element => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }
        return cloneElement(child, {
          ...child.props,
          style: { ...styles.btnIcon, ...child.props.style },
        });
      })}
      <Text style={styles.btnLabel}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C9ADE",
    padding: 10,
    borderRadius: 5,
  },
  btnLabel: {
    color: "white",
  },
  btnIcon: {
    color: "white",
    fontSize: 16,
    marginRight: 5,
  },
});

export default SelectorButton;
