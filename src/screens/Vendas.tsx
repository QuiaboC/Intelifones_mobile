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
import { ChevronLeft, Edit, Plus, Trash } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function Vendas({ navigation }) {
  const [produto, setProduto] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get("http://10.0.0.110:8080/produtos")
        .then((response) => setProduto(response.data))
        .catch((error) => console.log(error));
    }, []),
  );

  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://10.0.0.110:8080/produtos/${id}`);
      setProduto((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Vendas</Text>
      </View>

      <View style={styles.containerFiltro}>
        <TextInput
          style={styles.filtro}
          placeholder="Pesquisar produto"
          placeholderTextColor="#64748B"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {produto.map((item) => (
          <View key={item.id} style={styles.produtoCard}>
            <View style={styles.containerImagem}>
              <Image source={{ uri: item.image }} style={styles.imagem} />
            </View>

            <View style={styles.containerText}>
              <Text style={styles.tituloProduto} numberOfLines={1}>
                {item.nome}
              </Text>

              <Text style={styles.descricao} numberOfLines={1}>
                {item.descricao}
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.estadoConservacao}</Text>
              </View>

              <Text style={styles.preco}>R$ {item.preco}</Text>
            </View>

            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("Editar", {id: item.id})}
              >
                <Edit size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                 onPress={() => deletarProduto(item.id)}
              >
                <Trash size={20} color="#EF4444" />
              </TouchableOpacity>
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

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  scroll: {
    padding: 10,
    paddingBottom: 10,
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
    gap: 5,
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

  containerButton: {
    gap: 10,
  },

  editButton: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 10,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 10,
  },
});
