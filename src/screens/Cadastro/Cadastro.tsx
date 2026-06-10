import { Picker } from "@react-native-picker/picker";
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
import api from "../../../services/api";

export default function Cadastro({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    preco: "",
    descricao: "",
    usado: false,
    quantidade: "",
  });

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const cadastrarProduto = async () => {
    try {
      const response = await api.post("/produtos", {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        quantidade: Number(form.quantidade),
        usado: form.usado,
        categoria_id: Number(form.categoria_id),
      });

      console.log("Cadastrado:", response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error?.response?.data || error);
    }
  };

  useEffect(() => {
    api
      .get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.log(error));
  }, []);

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

            <Picker
              selectedValue={form.categoria_id}
              onValueChange={(value) => handleChange("categoria_id", value)}
              style={styles.input}
            >
              <Picker.Item label="Selecione" value="" />

              {categorias.map((item) => (
                <Picker.Item key={item.id} label={item.nome} value={item.id} />
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
              value={form.preco}
              onChangeText={(text) => handleChange("preco", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Produto Usado?</Text>

            <Picker
              selectedValue={form.usado}
              onValueChange={(value) => handleChange("usado", value)}
              style={styles.input}
            >
              <Picker.Item label="Selecione" value={null} />
              <Picker.Item label="Sim" value={true} />
              <Picker.Item label="Não" value={false} />
            </Picker>
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
