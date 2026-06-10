import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarToken(token) {
  await AsyncStorage.setItem("@token", token);
}

export async function obterToken() {
  return await AsyncStorage.getItem("@token");
}

export async function removerToken() {
  return await AsyncStorage.removeItem("@token");
}

export async function salvarSessao(usuario, token) {
  await AsyncStorage.setItem(
    "@sessao",
    JSON.stringify({
      usuario,
      token,
    })
  );
}