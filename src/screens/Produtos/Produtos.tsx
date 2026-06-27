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
import api from "../../../services/api";
import { styles } from "./style";
import FiltroCategoria from "../../components/FiltroCategoria";

export default function Produtos({ navigation }) {
  const route = useRoute();
  const buscaInicial = route.params?.busca || "";
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState(buscaInicial);
  const [mostrarCategoria, setMostrarCategoria] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [usado, setUsado] = useState(null);
  const [ordemPreco, setOrdemPreco] = useState(null);

  useEffect(() => {
    api
      .get("/produtos/disponiveis")
      .then((response) => setProduto(response.data));
  }, []);

  const produtosFiltrados = produto
    .filter((item) => {
      const filtroBusca = item.nome.toLowerCase().includes(busca.toLowerCase());

      const filtroCategoria =
        categoriaSelecionada === null ||
        String(item.categoria?.id) === String(categoriaSelecionada);

      const filtroUsado = usado === null || item.usado === usado;

      return filtroBusca && filtroCategoria && filtroUsado;
    })
    .sort((a, b) => {
      if (ordemPreco === "asc") {
        return a.preco - b.preco;
      }

      if (ordemPreco === "desc") {
        return b.preco - a.preco;
      }

      return 0;
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ChevronLeft size={25} color="#ffff" />
        </TouchableOpacity>

        <TextInput
          style={styles.filtro}
          placeholder="Digite aqui produto"
          placeholderTextColor="#64748B"
          value={busca}
          onChangeText={setBusca}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
          <Bell color="#fff" size={25} />
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
        <TouchableOpacity
          style={styles.categoria}
          onPress={() => setMostrarCategoria(true)}
        >
          <Text style={styles.textCategoria}>Preço</Text>
          <ChevronDown size={18} color="#475569" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoriaSemBorda}
          onPress={() => setMostrarCategoria(true)}
        >
          <Text style={styles.textCategoria}>Condição</Text>
          <ChevronDown size={18} color="#475569" />
        </TouchableOpacity>
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
              onPress={() => navigation.navigate("Detalhes", { id: item.id })}
            >
              <Image
                source={{
                  uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/produtos/${item.imagem}`,
                }}
                style={styles.imagem}
              />
              <View style={styles.info}>
                <Text style={styles.nome} numberOfLines={2}>
                  {item.nome}
                </Text>
                <Text style={styles.preco}>R$ {item.preco}</Text>
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: item.usado ? "#FEF3C7" : "#DCFCE7",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      item.usado && { color: "#D97706" },
                    ]}
                  >
                    {item.usado ? "Usado" : "Novo"}
                  </Text>
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
            usado={usado}
            setUsado={setUsado}
            ordemPreco={ordemPreco}
            setOrdemPreco={setOrdemPreco}
          />
        </>
      )}
    </SafeAreaView>
  );
}
