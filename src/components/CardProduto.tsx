import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function CardProduto() {

  const navigation = useNavigation();
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
    .get("http://10.0.0.110:8080/produtos")
    .then((response) => setProduto(response.data))
  },[])


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos em ofertas</Text>
      <View style={styles.produtos}>
        {produto.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate("Detalhes", { id: item.id})}>
            <Image
              source={{ uri: item.image }}
              style={styles.imagem}
            />
            <View style={styles.info}>
              <Text style={styles.nome} numberOfLines={1}>
                {item.nome}
              </Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.estadoConservacao}</Text>
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
