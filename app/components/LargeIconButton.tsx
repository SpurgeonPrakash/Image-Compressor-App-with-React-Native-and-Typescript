import React, { FC, Children, isValidElement, cloneElement } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const LargeIconButton: FC<Props> = ({
  title,
  children,
  onPress,
}: Props): JSX.Element => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return null;
          }
          return cloneElement(child, {
            ...child.props,
            style: { ...styles.icon, ...child.props.style },
          });
        })}
      </TouchableOpacity>
      <Text style={styles.btnLabel}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 120,
    height: 120,
    marginVertical: 25,
  },
  button: {
    width: "100%",
    height: "100%",
    borderWidth: 4,
    borderColor: "#6c9ade",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#6c9ade",
    fontSize: 55,
  },
  btnLabel: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default LargeIconButton;
