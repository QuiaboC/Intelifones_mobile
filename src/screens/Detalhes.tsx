import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Bell, ChevronLeft, ShoppingCart } from "lucide-react-native";
import Footer from "../components/Footer";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "../../styles/detalhes";

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
