import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Bell, ChevronLeft, ShoppingCart } from "lucide-react-native";
import Footer from "../components/Footer";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detalhes({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    axios
      .get(`http://10.0.0.110:8080/produtos/${id}`)
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(produto);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={25} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Bell color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <ShoppingCart color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.containerImagem}>
          <Image source={{ uri: produto.image }} style={styles.imagem} />
        </View>

        <View style={styles.containerInfo}>
          <Text style={styles.titulo}>{produto.nome}</Text>
          <Text style={styles.descricao}>{produto.descricao}</Text>
          <View style={styles.containerPreco}>
            <Text style={styles.preco}>R$ {produto.preco}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{produto.estadoConservacao}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonPrincipal}>
            <Text style={styles.buttonPrincipalText}>Comprar agora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSecundario}>
            <ShoppingCart size={20} color="#2563EB" />
            <Text style={styles.buttonSecundarioText}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#2563EB",
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  scroll: {
    paddingBottom: 30,
  },
  containerImagem: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagem: {
    width: "85%",
    height: 220,
    resizeMode: "contain",
  },
  containerInfo: {
    paddingHorizontal: 20,
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },
  descricao: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B",
  },
  containerPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  preco: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563EB",
  },
  badge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#10B981",
    fontWeight: "600",
    fontSize: 13,
  },
  containerButtons: {
    paddingHorizontal: 20,
    marginTop: 25,
    gap: 12,
  },
  buttonPrincipal: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonPrincipalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecundario: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonSecundarioText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },
});
