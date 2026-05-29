import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function CardProduto() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos em ofertas</Text>
      <View style={styles.produtos}>
        {[1, 2, 3, 4].map((item) => (
          <TouchableOpacity key={item} style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate("Detalhes")}>
            <Image
              source={require("../../assets/vetorCadastro.png")}
              style={styles.imagem}
            />
            <View style={styles.info}>
              <Text style={styles.nome} numberOfLines={2}>
                Nome do produto tal tal
              </Text>
              <Text style={styles.preco}>R$ 50,00</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Novo</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 14,
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
