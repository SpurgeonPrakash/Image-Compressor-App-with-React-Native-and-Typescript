import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";

interface Props {}

const BackgroundImageEditor: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../source/background.png")}
        style={styles.bgImage}
        // resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    opacity: 0.1,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
});

export default BackgroundImageEditor;
