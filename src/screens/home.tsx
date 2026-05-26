import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import ButtonsHome from "../components/ButtonsHome";
import CardProduto from "../components/CardProduto";
import Footer from "../components/Footer";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Header />
        <LinearGradient
          colors={["#2563EB", "#06B6D4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.heroImage}
        >
          <Text style={styles.texto}>
            intelifones é uma empresa. ache os melhores aparelhos
          </Text>

          <Image
            source={require("../../assets/vetorCadastro.png")}
            style={styles.imagem}
          />
        </LinearGradient>
        <View style={styles.anuncio}>
          <View style={styles.textContainer}>
            <Text style={styles.logoText}>intelifones</Text>
            <Text style={styles.subText}>
              Cadastre-se para aproveitar ofertas exclusivas
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        <ButtonsHome />
        <CardProduto />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  body: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  heroImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  imagem: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  anuncio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 14,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "#E2E8F0",
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 13,
  },
});
