import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import api from "../../../services/api";
import { ChevronLeft, ImageIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import * as ImagePicker from "expo-image-picker";
import ButtonSelect from "../../components/ButtonSelect";

export default function Editar({ navigation }) {
  const route = useRoute();
  const { id } = route.params;
  const [categorias, setCategorias] = useState([]);
  const [imagem, setImagem] = useState<any>(null);
  const [form, setForm] = useState({
    nome: "",
    categoria_id: "",
    preco: "",
    descricao: "",
    usado: false,
    quantidade: "",
  });

  useEffect(() => {
    api
      .get(`/produtos/${id}`)
      .then((response) => {
        const produto = response.data;

        setForm({
          nome: produto.nome || "",
          categoria_id: produto.categoria?.id || "",
          preco: String(produto.preco || ""),
          descricao: produto.descricao || "",
          usado: produto.usado,
          quantidade: String(produto.quantidade || ""),
        });

        if (produto.imagem) {
          setImagem({
            uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/produtos/${produto.imagem}`,
          });
        }
      })
      .catch((error) => console.log(error));

    api
      .get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.log(error));
  }, [id]);

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
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };
  const editarProduto = async () => {
    try {
      const response = await api.put(`/produtos/${id}`, {
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        quantidade: Number(form.quantidade),
        usado: form.usado,
        categoria_id: Number(form.categoria_id),
      });

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

        await api.post(`/produtos/${id}/imagem`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigation.goBack();
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
    }
  };

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
              value={String(form.preco)}
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
                  <ImageIcon size={30} color="#2563EB" />
                  <Text>Selecionar nova imagem</Text>
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
              <Picker.Item label="Selecione" value="" />
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

          <TouchableOpacity style={styles.button} onPress={editarProduto}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
