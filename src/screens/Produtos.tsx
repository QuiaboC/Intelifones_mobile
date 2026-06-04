import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Bell, ChevronDown, ChevronLeft } from "lucide-react-native";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Produtos({navigation}) {
  const route = useRoute();
  const buscaInicial = route.params?.busca || "";
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState(buscaInicial);

  useEffect(() => {
    axios
      .get("http://10.0.0.110:8080/produtos")
      .then((response) => setProduto(response.data));
  }, []);

  const produtosFiltrados = produto.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#ffff"/>
        </TouchableOpacity>

        <TextInput
          style={styles.filtro}
          placeholder="Digite aqui produto"
          placeholderTextColor="#64748B"
          value={busca}
          onChangeText={setBusca}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
          <Bell color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerCategoria}>
        <View style={styles.categoria}>
          <Text style={styles.textCategoria}>Categoria</Text>
          <ChevronDown size={18} color="#475569" />
        </View>
        <View style={styles.categoria}>
          <Text style={styles.textCategoria}>Preço</Text>
          <ChevronDown size={18} color="#475569" />
        </View>
        <View style={styles.categoriaSemBorda}>
          <Text style={styles.textCategoria}>Condição</Text>
          <ChevronDown size={18} color="#475569" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.produtos}>
          {produtosFiltrados.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.image }} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={2}>
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
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2563EB",
    gap: 10,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    fontSize: 14,
    color: "#0F172A",
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
