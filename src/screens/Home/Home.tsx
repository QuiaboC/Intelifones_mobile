import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import ButtonsHome from "../../components/ButtonsHome";
import CardProduto from "../../components/CardProduto";
import Footer from "../../components/Footer";
import { styles } from "./style";

export default function Home({ navigation }) {
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
            source={require("../../../assets/vetorCadastro.png")}
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Registro")}
          >
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
