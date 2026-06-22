import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { styles } from "./style";

export default function Compras({ navigation }) {
  const [historico, setHistorico] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api
      .get("/pedidos/historico")
      .then((response) => setHistorico(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filtrosFiltrados = historico.filter((item) =>
    item.produto.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  const comprarAgora = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        produtoId: produtoId,
        quantidade: 1,
      });
      navigation.navigate("Carrinho");
    } catch (error) {
      console.log(error?.response?.data);
      alert("Erro no compra mais.");
    }
  };

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
              <Image
                source={{ uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/${item.produto.imagem}` }}
                style={styles.imagem}
              />
            </View>

            <View style={styles.containerText}>
              <View style={styles.badgeConteudo}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.tituloProduto} numberOfLines={1}>
                    {item.produto.nome} 
                  </Text>
                  <Text style={styles.descricao} numberOfLines={1}>
                    {item.produto.descricao} 
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={[
                      styles.badge,
                      item.produto.usado ? styles.badgeUsado : styles.badgeNovo, 
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        item.produto.usado
                          ? styles.badgeTextoUsado
                          : styles.badgeTextoNovo,
                      ]}
                    >
                      {item.produto.usado ? "Usado" : "Novo"}
                    </Text>
                  </View>
                  <Text style={styles.preco}>
                    R$ {Number(item.precoUnitario).toFixed(2)}{" "}
              
                  </Text>
                </View>
              </View>

              <View style={styles.containerAcoes}>
                <TouchableOpacity
                  style={styles.buttonSecundario}
                  onPress={() =>
                    navigation.navigate("Detalhes", { id: item.produto.id })
                  } 
                >
                  <Text style={styles.buttonSecundarioText}>Ver compra</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonPrincipal,
                    item.produto.quantidade === 0 && { opacity: 0.5 }, 
                  ]}
                  onPress={() => comprarAgora(item.produto.id)} 
                  disabled={item.produto.quantidade === 0} 
                >
                  <Text style={styles.buttonPrincipalText}>
                    {item.produto.quantidade === 0
                      ? "Sem estoque"
                      : "Comprar agora"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
