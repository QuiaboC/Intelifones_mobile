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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                <Heart size={50} color="#94A3B8" />
              </View>
              <Text style={styles.vazio}>Você ainda não tem produtos favoritos</Text>
              <Text style={styles.vazioDescricao}>
                Adicione-os por meio de "Meus favoritos" ou pelo coração nas páginas de produtos
              </Text>
            </View>
          ) : (
            favoritos.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Detalhes", { id: item.id })}
              >
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

                  <Text style={styles.preco}>
                    R$ {Number(item.preco).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
