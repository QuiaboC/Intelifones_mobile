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
import { useEffect, useState } from "react";
import axios from "axios";

export default function Compras({ navigation }) {
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    axios
      .get("http://10.0.0.110:8080/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filtrosFiltrados = produto.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );

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
          onChangeText={setBusca}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {filtrosFiltrados.map((item) => (
          <View key={item.id} style={styles.produtoCard}>
            <View style={styles.containerImagem}>
              <Image source={{ uri: item.image }} style={styles.imagem} />
            </View>

            <View style={styles.containerText}>
              <View style={styles.badgeConteudo}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.tituloProduto} numberOfLines={1}>
                    {item.nome}
                  </Text>
                  <Text style={styles.descricao} numberOfLines={1}>
                    {item.descricao}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={[
                      styles.badge,
                      item.estadoConservacao === "novo"
                        ? styles.badgeNovo
                        : item.estadoConservacao === "seminovo"
                          ? styles.badgeSeminovo
                          : styles.badgeUsado,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        item.estadoConservacao === "novo"
                          ? styles.badgeTextoNovo
                          : item.estadoConservacao === "seminovo"
                            ? styles.badgeTextoSeminovo
                            : styles.badgeTextoUsado,
                      ]}
                    >
                      {item.estadoConservacao}
                    </Text>
                  </View>
                  <Text style={styles.preco}>
                    R$ {Number(item.preco).toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.containerAcoes}>
                <TouchableOpacity
                  style={styles.buttonSecundario}
                  onPress={() =>
                    navigation.navigate("Detalhes", { id: item.id })
                  }
                >
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
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    gap: 12,
    alignItems: "flex-start",
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
