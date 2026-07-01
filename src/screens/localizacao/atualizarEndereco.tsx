import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";
import { useRoute } from "@react-navigation/native";

export default function atualizarEndereco({ navigation }) {
  const route = useRoute();
  const { id } = route.params; 
  
  const [form, setForm] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  });

  useEffect(() => {
    api
      .get("/usuarios/enderecos")
      .then((res) => {
        const listaEnderecos = res.data;
        const enderecoEncontrado = listaEnderecos.find((item) => item.id === id);
        if (enderecoEncontrado) {
          setForm({
            logradouro: enderecoEncontrado.logradouro || "",
            numero: enderecoEncontrado.numero || "",
            complemento: enderecoEncontrado.complemento || "",
            bairro: enderecoEncontrado.bairro || "",
            cidade: enderecoEncontrado.cidade || "",
            uf: enderecoEncontrado.uf || "",
            cep: enderecoEncontrado.cep || "",
          });
        } else {
          console.log("Endereço não encontrado na sua lista de endereços.");
        }
      })
      .catch((error) => console.log("Erro ao carregar endereço:", error));
  }, [id]);

  const handleChange = (campo, valor) => {
    if (campo === "cep") {
      valor = valor.replace(/\D/g, "");
      valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");
      valor = valor.substring(0, 9);
    }

    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const salvarAlteracoes = async () => {
    try {
      const response = await api.put(`/usuarios/enderecos/${id}`, {
        logradouro: form.logradouro,
        numero: form.numero,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        uf: form.uf,
        cep: form.cep,
      });

      console.log("Endereço atualizado com sucesso!", response.data);
      navigation.navigate("Localizacao"); 
    } catch (error) {
      console.log("Erro ao atualizar:", error.response?.status);
      console.log("Detalhes do erro:", error.response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Editar Endereço</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.card}>
          <View style={styles.containerTitulo}>
            <Text style={styles.nome}>Atualizar Endereço</Text>
            <Text style={styles.subtitulo}>
              Modifique os campos necessários para atualizar a sua localização
            </Text>
          </View>
          
          <View style={styles.containerInput}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              placeholder="Logradouro"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.logradouro}
              onChangeText={(text) => handleChange("logradouro", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Número da casa</Text>
            <TextInput
              placeholder="Digite o número da casa"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.numero}
              onChangeText={(text) => handleChange("numero", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              placeholder="Complemento do endereço"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.complemento}
              onChangeText={(text) => handleChange("complemento", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Nome do bairro</Text>
            <TextInput
              placeholder="Digite o nome do bairro"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.bairro}
              onChangeText={(text) => handleChange("bairro", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>Nome da cidade</Text>
            <TextInput
              placeholder="Digite o nome da cidade"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.cidade}
              onChangeText={(text) => handleChange("cidade", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>UF</Text>
            <TextInput
              placeholder="UF"
              placeholderTextColor="#64748B"
              style={styles.input}
              maxLength={2}
              autoCapitalize="characters"
              value={form.uf}
              onChangeText={(text) => handleChange("uf", text)}
            />
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              placeholder="00000-000"
              placeholderTextColor="#64748B"
              style={styles.input}
              keyboardType="numeric"
              maxLength={9}
              value={form.cep}
              onChangeText={(text) => handleChange("cep", text)}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
            <Text style={styles.buttonText}>Salvar Alterações</Text>
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
    gap: 15,
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
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});