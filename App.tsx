import React, { FC } from "react";
import { View, Text } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";

interface Props {}

const App: FC<Props> = (): JSX.Element | null => {
  return <AppNavigator />;
};

export default App;
