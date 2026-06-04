import axios from "axios";
import { ChevronLeft, Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FiltroBuscar({ navigation }) {
  const [produto, setProduto] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    axios
      .get("http://10.0.0.110:8080/produtos")
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },

  scroll: {
    flex: 1,
  },

  produto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  textoProduto: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "500",
  },

  semResultado: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  semResultadoTexto: {
    color: "#64748B",
    fontSize: 15,
  },
});
