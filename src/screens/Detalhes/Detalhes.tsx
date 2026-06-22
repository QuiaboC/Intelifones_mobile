import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Bell, ChevronLeft, Heart, ShoppingCart } from "lucide-react-native";
import Footer from "../../components/Footer";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { styles } from "./style";

export default function Detalhes({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [produto, setProduto] = useState([]);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    api
      .get(`/produtos/${id}`)
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const adicionarCarrinho = async () => {
    try {
      await api.post("/carrinho", {
        produtoId: produto.id,
        quantidade: 1,
      });
      navigation.navigate("Carrinho");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorito = async () => {
    try {
      if (favorito) {
        await api.delete(`/favoritos/${produto.id}`);
        setFavorito(false);
      } else {
        await api.post(`/favoritos/${produto.id}`);
        setFavorito(true);
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

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
          <Image
            source={{ uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/${produto.imagem}` }}
            style={styles.imagem}
          />
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.containerTitulo}>
            <Text style={styles.titulo}>{produto.nome}</Text>
            <TouchableOpacity onPress={toggleFavorito}>
              <Heart
                color={favorito ? "#2563EB" : "#06B6D4"}
                fill={favorito ? "#2563EB" : "transparent"}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.descricao}>{produto.descricao}</Text>
          <Text style={styles.descricao}>Estoque: {produto.quantidade}</Text>
          <View style={styles.containerPreco}>
            <Text style={styles.preco}>R$ {produto.preco}</Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: produto.usado ? "#FEE2E2" : "#DCFCE7",
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {produto.usado ? "Usado" : "Novo"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonPrincipal} onPress={adicionarCarrinho}>
            <Text style={styles.buttonPrincipalText}>Comprar agora</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecundario}
            onPress={adicionarCarrinho}
          >
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
