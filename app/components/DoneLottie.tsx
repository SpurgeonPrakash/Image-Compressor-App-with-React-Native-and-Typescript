import React, { FC } from "react";
import LottieView from "lottie-react-native";

interface Props {
  visible: boolean;
  onFinish?: () => void;
}

const DoneLottie: FC<Props> = ({ visible, onFinish }): JSX.Element | null => {
  if (!visible) {
    return null;
  }
  return (
    <LottieView
      source={require("../source/done.json")}
      autoPlay
      loop={false}
      //   speed={2}
      style={{ width: 200, height: 200 }}
      onAnimationFinish={onFinish}
    />
  );
};

export default DoneLottie;
