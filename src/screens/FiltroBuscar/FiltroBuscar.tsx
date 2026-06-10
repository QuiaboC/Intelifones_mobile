import api from "../../../services/api";
import { ChevronLeft, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./style";

export default function FiltroBuscar({ navigation }) {
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => setProduto(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filtrosFiltrados = busca.trim()
    ? produto.filter((item) =>
        item.nome.toLowerCase().includes(busca.toLowerCase()),
      )
    : [];

  return (
    <SafeAreaView style={style.container}>
      <View style={style.inputContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} />
        </TouchableOpacity>
        <TextInput
          placeholder="Buscar no Intelifones"
          style={style.input}
          value={busca}
          onChangeText={setBusca}
          returnKeyType="search"
          onSubmitEditing={() => navigation.navigate("Produtos", { busca })}
        />
      </View>
      <ScrollView style={style.scroll}>
        {filtrosFiltrados.map((item) => (
          <TouchableOpacity
            style={style.produto}
            key={item.id}
            onPress={() => navigation.navigate("Detalhes", { id: item.id })}
          >
            <Search size={25} />
            <Text
              style={style.textoProduto}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
