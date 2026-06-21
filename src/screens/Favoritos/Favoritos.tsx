import { Bell, ChevronLeft, Heart } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { styles } from "./style";

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    api
      .get("/favoritos")
      .then((res) => setFavoritos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const excluirFavorito = (id) => {
    api
      .delete(`/favoritos/${id}`)
      .then(() => {
        setFavoritos((prevFavoritos) =>
          prevFavoritos.filter((item) => item.id !== id),
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ChevronLeft size={30} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Favoritos</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.produtos}>
          {favoritos.length === 0 ? (
            <View style={styles.vazioContainer}>
              <View style={styles.iconeVazio}>
                <Heart size={34} color="#2563EB" />
              </View>
              <Text style={styles.vazio}>
                Você ainda não tem produtos favoritos
              </Text>
              <Text style={styles.vazioDescricao}>
                Adicione-os por meio de "Meus favoritos" ou pelo coração nas
                páginas de produtos
              </Text>
            </View>
          ) : (
            favoritos.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={{
                    uri: `http://localhost:8080/uploads/${item.imagem}`,
                  }}
                  style={styles.imagem}
                />

                <View style={styles.info}>
                  <Text style={styles.nome} numberOfLines={2}>
                    {item.nome}
                  </Text>

                  <Text>{item.descricao}</Text>
                  <View style={styles.botoes}>
                    <TouchableOpacity
                      style={styles.botaoVerMais}
                      onPress={() =>
                        navigation.navigate("Detalhes", { id: item.id })
                      }
                    >
                      <Text style={styles.botaoVerMaisText}>Ver mais</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.botaoVerMais}
                      onPress={() => excluirFavorito(item.id)}
                    >
                      <Text style={styles.botaoVerMaisText}>
                        Excluir dos favoritos
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.precoContainer}>
                  <View style={styles.badge}>
                    <Text
                      style={[
                        styles.badgeText,
                        item.usado
                          ? styles.badgeTextoUsado
                          : styles.badgeTextoNovo,
                      ]}
                    >
                      {item.usado ? "Usado" : "Novo"}
                    </Text>
                  </View>

                  <Text style={styles.preco}>
                    R$ {Number(item.preco).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
