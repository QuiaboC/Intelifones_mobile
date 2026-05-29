import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";

export default function Compras({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Compras</Text>
      </View>

      <View style={styles.containerFiltro}>
        <TextInput
          style={styles.filtro}
          placeholder="Pesquisar produto"
          placeholderTextColor="#64748B"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {[1, 2].map((item) => (
          <View key={item} style={styles.produtoCard}>
            <View style={styles.containerImagem}>
              <Image
                source={require("../../assets/vetorHome.png")}
                style={styles.imagem}
              />
            </View>

            <View style={styles.containerText}>
              <View style={styles.badgeConteudo}>
                <View>
                  <Text style={styles.tituloProduto} numberOfLines={2}>
                    Nome do produto
                  </Text>

                  <Text style={styles.descricao}>Descrição do produto</Text>
                </View>
                <View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Novo</Text>
                  </View>
                  <Text style={styles.preco}>R$ 50,00</Text>
                </View>
              </View>

              <View style={styles.containerAcoes}>
                <TouchableOpacity style={styles.buttonSecundario}>
                  <Text style={styles.buttonSecundarioText}>Ver compra</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrincipal}>
                  <Text style={styles.buttonPrincipalText}>Comprar mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#2563EB",
  },

  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  containerFiltro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 15,
  },

  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
  },
  scroll: {
    padding: 10,
    paddingBottom: 30,
  },

  produtoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    gap: 12,
  },

  containerImagem: {
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 14,
  },

  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },

  containerText: {
    flex: 1,
    gap: 10,
  },

  tituloProduto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  descricao: {
    fontSize: 13,
    color: "#64748B",
  },
  badgeConteudo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 4,
  },

  containerAcoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  buttonSecundario: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonSecundarioText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 13,
  },

  buttonPrincipal: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonPrincipalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
