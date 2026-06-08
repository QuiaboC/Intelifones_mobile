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
import axios from "axios";
import { styles } from "./style";

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
