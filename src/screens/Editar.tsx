import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/editar";

export default function Editar({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
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
      .get(`http://10.0.0.110:8080/produtos/${id}`)
      .then((response) => setForm(response.data))
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
        `http://10.0.0.110:8080/produtos/${id}`,
        {
          nome: form.nome,
          descricao: form.descricao,
          preco: Number(form.preco),
          categoria: form.categoria,
          image: form.image,
          usado:
            typeof form.usado === "boolean"
              ? form.usado
              : form.usado.toLowerCase() === "sim",
          estadoConservacao: form.estadoConservacao,
          quantidade: Number(form.quantidade),
          ativo: true,
        },
      );

      console.log("Editado com sucesso:", response.data);

      navigation.goBack();
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
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

            <TextInput
              placeholder="Smartphone, Notebook, Tablet ou Acessório"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.categoria}
              onChangeText={(text) => handleChange("categoria", text)}
            />
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

            <TextInput
              placeholder="Novo, Seminovo ou Usado"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.estadoConservacao}
              onChangeText={(text) => handleChange("estadoConservacao", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Produto Usado?</Text>

            <TextInput
              placeholder="Sim ou Não"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={String(form.usado)}
              onChangeText={(text) => handleChange("usado", text)}
            />
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