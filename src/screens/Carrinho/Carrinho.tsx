import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  BrushCleaning,
  ChevronLeft,
  ShoppingCart,
  Trash,
} from "lucide-react-native";
import { styles } from "./style";
import { useState, useEffect } from "react";
import api from "../../../services/api";

export default function Carrinho({ navigation }) {
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api
      .get("/carrinho")
      .then((response) => setCarrinho(response.data))
      .catch((error) => console.log(error));
  }, []);

  const atualizarQuantidade = async (itemId, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    try {
      await api.put(`/carrinho/item/${itemId}`, null, {
        params: { quantidade: novaQuantidade },
      });
      setCarrinho((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantidade: novaQuantidade } : item,
        ),
      );
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const total = carrinho.reduce((acc, item) => {
    return acc + item.quantidade * item.produto.preco;
  }, 0);

  const removerItem = async (itemId) => {
    try {
      await api.delete(`/carrinho/item/${itemId}`);
      setCarrinho((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const limparCarrinho = async () => {
    try {
      await api.delete("/carrinho/limpar");
      const response = await api.get("/carrinho");
      setCarrinho(response.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const filtrosFiltrados = carrinho.filter((item) =>
    item.produto.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ChevronLeft size={30} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Carrinho</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.containerFiltro}>
          <TextInput
            style={styles.filtro}
            placeholder="Pesquisar produto"
            placeholderTextColor="#64748B"
            value={busca}
            onChangeText={setBusca}
          />

          <TouchableOpacity style={styles.button} onPress={limparCarrinho}>
            <BrushCleaning size={20} color="#fff" />
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {filtrosFiltrados.length === 0 ? (
          <View style={styles.containerCarrinho}>
            <View style={styles.iconContainer}>
              <ShoppingCart size={34} color="#2563EB" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titulo}>Seu carrinho está vazio</Text>
              <Text style={styles.subtitulo}>
                Adicione produtos para começar
              </Text>
            </View>
          </View>
        ) : (
          filtrosFiltrados.map((item) => (
            <View key={item.id} style={styles.produtoCarrinho}>
              <View style={styles.containerImagem}>
                <Image
                  source={{
                  uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/${item.produto.imagem}`,
                }}
                  style={styles.imagem}
                />
              </View>

              <View style={styles.containerText}>
                <Text style={styles.tituloProduto} numberOfLines={1}>
                  {item.produto.nome}
                </Text>
                <Text style={styles.descricao} numberOfLines={1}>
                  {item.produto.descricao}
                </Text>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: item.produto.usado ? "#FEE2E2" : "#DCFCE7",
                    },
                  ]}
                >
                  <Text 
                    style={[
                      styles.badgeText, 
                      { color: item.produto.usado ? "#EF4444" : "#10B981" }
                    ]}
                  >
                    {item.produto.usado ? "Usado" : "Novo"}
                  </Text>
                </View>


                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                  >
                    <Text style={{ fontWeight: "bold", color: "#1E293B" }}>-</Text>
                  </TouchableOpacity>

                  <Text style={{ fontWeight: "600", paddingHorizontal: 4 }}>{item.quantidade}</Text>

                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                  >
                    <Text style={{ fontWeight: "bold", color: "#1E293B" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removerItem(item.id)}
                >
                  <Trash size={18} color="#EF4444" />
                </TouchableOpacity>

                <Text style={styles.preco}>
                  R$ {item.produto.preco.toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {carrinho && carrinho.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={{ fontSize: 13, color: "#64748B" }}>Total do pedido</Text>
            <Text style={styles.totalTexto}>R$ {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonFinalizar}
            onPress={() =>
              navigation.navigate("Checkout", { total: total.toFixed(2) })
            }
          >
            <Text style={styles.buttonFinalizarText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}