import React, { FC } from "react";
import { View, StyleSheet, Linking } from "react-native";
import ConfirmModel from "./ConfirmModel";

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const PermissionWarning: FC<Props> = ({
  visible,
  onClose,
  title,
  message,
}): JSX.Element => {
  const handleOpenSettings = (): void => {
    onClose();
    Linking.openSettings();
  };

  return (
    <ConfirmModel
      primaryBtnTitle="Open Settings"
      dangerBtnTitle="I will not"
      title={title}
      message={message}
      visible={visible}
      onDangerBtnPress={onClose}
      onPrimaryBtnPress={handleOpenSettings}
    />
  );
};

export default PermissionWarning;
