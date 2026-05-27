import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { ChevronDown } from "lucide-react-native";
import Footer from "../components/Footer";

export default function Produtos() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.containerCategoria}>
        <View style={styles.categoria}>
          <Text style={styles.textCategoria}>
            Categoria
          </Text>
          <ChevronDown size={18} color="#475569" />
        </View>
        <View style={styles.categoria}>
          <Text style={styles.textCategoria}>
            Preço
          </Text>
          <ChevronDown size={18} color="#475569" />
        </View>
        <View style={styles.categoriaSemBorda}>
          <Text style={styles.textCategoria}>
            Condição
          </Text>
          <ChevronDown size={18} color="#475569" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.produtos}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.card}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../assets/vetorCadastro.png")}
                style={styles.imagem}
              />
              <View style={styles.info}>
                <Text
                  style={styles.nome}
                  numberOfLines={2}
                >
                  Nome do produto tal tal
                </Text>
                <Text style={styles.preco}>
                  R$ 50,00
                </Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Novo
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  containerCategoria: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 10,
  },
  categoria: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
  },
  categoriaSemBorda: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  textCategoria: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  scroll: {
    padding: 14,
    paddingBottom: 30,
  },
    produtos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
  },
  imagem: {
    width: "100%",
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
  info: {
    gap: 6,
  },
  nome: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  preco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },
  badge: {
    backgroundColor: "#DCFCE7",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
  },
});