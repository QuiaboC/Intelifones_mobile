import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preview({navigation}) {
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
            source={require("../../assets/vetorHome.png")}
            style={style.imagem}
          />

          <View style={style.textContainer}>
            <Text style={style.logo}>
              Intelifones
            </Text>

            <Text style={style.descricao}>
              Bem-vindo ao melhor aplicativo para comprar smartphones,
              acessórios e tecnologia.
            </Text>
          </View>
        </View>

        <View style={style.buttons}>
          <TouchableOpacity style={style.buttonPrimary} onPress={() => navigation.navigate('Login')}>
            <Text style={style.buttonPrimaryText}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.buttonSecondary} onPress={() => navigation.navigate('Registro')}>
            <Text style={style.buttonSecondaryText}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: "center",
    marginTop: 10,
  },
  imagem: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  descricao: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#E2E8F0",
    fontWeight: "400",
    paddingHorizontal: 10,
  },
  buttons: {
    width: "100%",
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});