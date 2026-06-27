import { Picker } from "@react-native-picker/picker";
import { Camera, ChevronLeft, ImageIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import api from "../../../services/api";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import ButtonSelect from "../../components/ButtonSelect";

export default function Cadastro({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    preco: "",
    descricao: "",
    usado: null,
    quantidade: "",
  });

  const [imagem, setImagem] = useState<any>(null);

  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0]);
    }
  };

  const handleChange = (campo, valor) => {
    if (campo === "quantidade") {
      valor = valor.replace(/\D/g, "");
    }

    if (campo === "preco") {
      valor = valor.replace(/[^0-9,.]/g, "");
    }

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

      const produto = response.data;

      if (imagem) {
        const formData = new FormData();

        if (Platform.OS === "web") {
          const response = await fetch(imagem.uri);
          const blob = await response.blob();

          formData.append("arquivo", blob, "produto.png");
        } else {
          formData.append("arquivo", {
            uri: imagem.uri,
            name: "produto.jpg",
            type: "image/jpeg",
          } as any);
        }

        try {
          await api.post(`/produtos/${produto.id}/imagem`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (err) {
          console.log("Erro upload imagem:", err?.response?.data || err);
        }
      }
      showMessage({
        message: "Sucesso",
        description: "Produto cadastrado com sucesso!",
        type: "success",
      });
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


  const opcoesCategorias = categorias.map((cat) => cat.nome);
  const categoriaSelecionadaNome =
    categorias.find((cat) => cat.id === form.categoria_id)?.nome || "";
  const lidarSelecaoCategoria = (nomeSelecionado) => {
    const categoriaEncontrada = categorias.find(
      (cat) => cat.nome === nomeSelecionado,
    );
    if (categoriaEncontrada) {
      handleChange("categoria_id", categoriaEncontrada.id);
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

          <ButtonSelect
            label="Categoria"
            opcoes={opcoesCategorias}
            selecionado={categoriaSelecionadaNome}
            aoSelecionar={lidarSelecaoCategoria}
          />

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

            <TouchableOpacity
              style={styles.inputImage}
              onPress={selecionarImagem}
            >
              {imagem ? (
                <Image
                  source={{ uri: imagem.uri }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <>
                  <ImageIcon size={30} color={"#2563EB"} />
                  <Text>
                    {imagem ? "Imagem selecionada" : "Selecionar a imagem"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
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
              onChangeText={(text) =>
                handleChange("quantidade", text.replace(/\D/g, ""))
              }
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
