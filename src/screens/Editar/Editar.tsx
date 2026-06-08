import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

export default function Editar({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    preco: "",
    descricao: "",
    image: "",
    usado: "",
    estadoConservacao: "",
    quantidade: "",
    ativo: "",
  });

  useEffect(() => {
  axios
    .get(`http://10.31.35.20:8080/produtos/${id}`)
    .then((response) => {
      const produto = response.data;

      setForm({
        nome: produto.nome || "",
        categoria_id: produto.categoria?.id || "",
        preco: String(produto.preco || ""),
        descricao: produto.descricao || "",
        image: produto.image || "",
        usado: produto.usado ? "SIM" : "NÃO",
        estadoConservacao:
          (produto.estadoConservacao || "").toUpperCase(),
        quantidade: String(produto.quantidade || ""),
        ativo: produto.ativo ?? true,
      });
    })
    .catch((error) => console.log(error));

  axios
    .get("http://192.168.56.1:8080/categorias")
    .then((response) => setCategorias(response.data))
    .catch((error) => console.log(error));
}, [id]);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };
  const EditarPerfil = async (id) => {
  try {
    const response = await axios.put(
      `http://10.31.35.20:8080/produtos/${id}`,
      {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        categoria: form.categoria_id, 
        image: form.image,
        usado: form.usado === "SIM",
        estadoConservacao: form.estadoConservacao,
        quantidade: Number(form.quantidade),
        ativo: true,
      }
    );

    console.log("Editado com sucesso:", response.data);

    navigation.goBack();
  } catch (error) {
    console.log("Erro ao salvar:", error?.response?.data || error);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Editar</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.card}>
          <View style={styles.containerTitulo}>
            <Text style={styles.nome}>Editar Produto</Text>

            <Text style={styles.subtitulo}>
              Atualize as informações do seu produto.
            </Text>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Nome do Produto</Text>

            <TextInput
              placeholder="Digite o nome do produto"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.nome}
              onChangeText={(text) => handleChange("nome", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Categoria</Text>

            <Picker
  selectedValue={form.categoria_id}
  onValueChange={(itemValue) =>
    handleChange("categoria_id", itemValue)
  }
  style={styles.input}
>
  
  <Picker.Item label="Selecione" value="" />

  {categorias.map((item) => (
    <Picker.Item
      key={item.id}
      label={item.nome}
      value={item.id}
    />
  ))}
</Picker>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Preço</Text>

            <TextInput
              placeholder="R$ 0,00"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              style={styles.input}
              value={String(form.preco)}
              onChangeText={(text) => handleChange("preco", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Imagem</Text>

            <TextInput
              placeholder="URL da imagem"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.image}
              onChangeText={(text) => handleChange("image", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Estado de Conservação</Text>

            <Picker
  selectedValue={form.estadoConservacao}
  onValueChange={(itemValue) =>
    handleChange("estadoConservacao", itemValue)
  }
  style={styles.input}
>
  <Picker.Item label="Selecione" value="" />
  <Picker.Item label="Novo" value="Novo" />
  <Picker.Item label="Seminovo" value="Semi Novo" />
  <Picker.Item label="Usado" value="Usado" />
</Picker>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Produto Usado?</Text>

            <Picker
                          selectedValue={form.usado}
                          onValueChange={(itemValue) =>
                            handleChange("usado", itemValue)
                          }
                          style={styles.input}
                        >
                          <Picker.Item label="Selecione" value="" />
                          <Picker.Item label="Sim" value="Sim" />
                          <Picker.Item label="Não" value="Não" />
                        </Picker>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Quantidade</Text>

            <TextInput
              placeholder="Quantidade disponível"
              placeholderTextColor="#64748B"
              keyboardType="numeric"
              style={styles.input}
              value={String(form.quantidade)}
              onChangeText={(text) => handleChange("quantidade", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Descrição</Text>

            <TextInput
              placeholder="Descreva o produto"
              placeholderTextColor="#64748B"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[styles.input, styles.textArea]}
              value={form.descricao}
              onChangeText={(text) => handleChange("descricao", text)}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => EditarPerfil(id)}
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}