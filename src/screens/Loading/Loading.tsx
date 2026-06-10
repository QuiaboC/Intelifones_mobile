import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { obterToken } from "../../../services/auth";

export default function Loading({ navigation }) {
  useEffect(() => {
    verificarLogin();
  }, []);

  async function verificarLogin() {
    const token = await obterToken();

    if (token) {
      navigation.replace("Home");
    } else {
      navigation.replace("Preview");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}