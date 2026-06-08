import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

export default function Preview({ navigation }) {
  return (
    <LinearGradient
      colors={["#2563EB", "#06B6D4", "#F1F5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style.gradient}
    >
      <SafeAreaView style={style.container}>
        <View style={style.hero}>
          <Image
            source={require("../../../assets/vetorHome.png")}
            style={style.imagem}
          />

          <View style={style.textContainer}>
            <Text style={style.logo}>Intelifones</Text>

            <Text style={style.descricao}>
              Bem-vindo ao melhor aplicativo para comprar smartphones,
              acessórios e tecnologia.
            </Text>
          </View>
        </View>

        <View style={style.buttons}>
          <TouchableOpacity
            style={style.buttonPrimary}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={style.buttonPrimaryText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.buttonSecondary}
            onPress={() => navigation.navigate("Registro")}
          >
            <Text style={style.buttonSecondaryText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
