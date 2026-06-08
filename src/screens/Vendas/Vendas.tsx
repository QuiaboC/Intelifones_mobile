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
import { styles } from "./style";

export default function Vendas({ navigation }) {
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState("");

  useFocusEffect(
    useCallback(() => {
      axios
        .get("http://10.31.35.20:8080/produtos")
        .then((response) => setProduto(response.data))
        .catch((error) => console.log(error));
    }, []),
  );

  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://10.31.35.20:8080/produtos/${id}`);
      setProduto((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filtrosFiltrados = produto.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );

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
          value={busca}
          onChangeText={setBusca}
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
        {filtrosFiltrados.map((item) => (
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
                onPress={() => navigation.navigate("Editar", { id: item.id })}
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
