import axios from "axios";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastro({ navigation }) {
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

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };
  const cadastrarProduto = async () => {
    try {
      const response = await axios.post("http://10.0.0.110:8080/produtos", {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        categoria: form.categoria,
        image: form.image,
        usado: form.usado.toLowerCase() === "sim",
        estadoConservacao: form.estadoConservacao,
        quantidade: Number(form.quantidade),
        ativo: true,
      });
      console.log("Cadastrado:", response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Cadastro</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.card}>
          <View style={styles.containerTitulo}>
            <Text style={styles.nome}>Cadastrar Produto</Text>

            <Text style={styles.subtitulo}>
              Cadastre seu produto para vender na plataforma
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
              value={form.preco}
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
              value={form.usado}
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
              value={form.quantidade}
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

          <TouchableOpacity style={styles.button} onPress={cadastrarProduto}>
            <Text style={styles.buttonText}>Cadastrar Produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#2563EB",
  },

  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  scroll: {
    padding: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
  },

  containerTitulo: {
    marginBottom: 20,
    gap: 5,
  },

  nome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  subtitulo: {
    fontSize: 15,
    color: "#64748B",
  },

  containerInput: {
    gap: 6,
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: "#0F172A",
  },

  textArea: {
    minHeight: 100,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 15,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
