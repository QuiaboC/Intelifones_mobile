import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Bell, ChevronDown, ChevronLeft } from "lucide-react-native";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "./style";
import FiltroCategoria from "../../components/FiltroCategoria";

export default function Produtos({ navigation }) {
  const route = useRoute();
  const buscaInicial = route.params?.busca || "";
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState(buscaInicial);
  const [mostrarCategoria, setMostrarCategoria] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.0.0.110:8080/produtos")
      .then((response) => setProduto(response.data));
  }, []);

  const produtosFiltrados = produto.filter((item) => {
    const filtroBusca = item.nome.toLowerCase().includes(busca.toLowerCase());

    const filtroCategoria =
      categoriaSelecionada === null ||
      String(item.categoria_id) === String(categoriaSelecionada);

    return filtroBusca && filtroCategoria;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#ffff" />
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
        <TouchableOpacity
          style={styles.categoria}
          onPress={() => setMostrarCategoria(true)}
        >
          <Text style={styles.textCategoria}>Categoria</Text>
          <ChevronDown size={18} color="#475569" />
        </TouchableOpacity>
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
      {mostrarCategoria && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMostrarCategoria(false)}
          />
          <FiltroCategoria
            onClose={() => setMostrarCategoria(false)}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
          />
        </>
      )}
    </SafeAreaView>
  );
}
