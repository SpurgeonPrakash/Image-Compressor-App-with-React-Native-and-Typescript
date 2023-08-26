import React, { FC } from "react";
import LottieView from "lottie-react-native";

interface Props {
  visible: boolean;
}

const BusyLoading: FC<Props> = ({ visible }): JSX.Element | null => {
  if (!visible) {
    return null;
  }
  return (
    <LottieView
      source={require("../source/loading.json")}
      autoPlay
      loop
      speed={2}
      style={{ width: 200, height: 200 }}
    />
  );
};

export default BusyLoading;
