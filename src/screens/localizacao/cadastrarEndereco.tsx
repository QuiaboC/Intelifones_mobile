import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function cadastrarEndereco({ navigation }) {
  const [form, setForm] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    principal: true,
  });

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

  const cadastrarEndereco = async () => {
  try {
    const response = await api.post("/usuarios/enderecos", {
      logradouro: form.logradouro,
      numero: form.numero,
      complemento: form.complemento,
      bairro: form.bairro,
      cidade: form.cidade,
      uf: form.uf,
      cep: form.cep,
      principal: true,
    });
    console.log("Endereco cadastrado com sucesso", response.data);
    navigation.navigate("Localizacao");
  } catch (error) {
    console.log(error.response?.status);
    console.log(error.response?.data);
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
            <Text style={styles.label}>Logadouro</Text>
            <TextInput
              placeholder="logadouro"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.logradouro}
              onChangeText={(text) => handleChange("logradouro", text)}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.label}>Numero da casa</Text>
            <TextInput
              placeholder="Digite o numero da casa"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.numero}
              onChangeText={(text) => handleChange("numero", text)}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              placeholder="Complemento do endereco"
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
            <Text style={styles.label}>uf</Text>
            <TextInput
              placeholder="uf"
              placeholderTextColor="#64748B"
              style={styles.input}
              value={form.uf}
              onChangeText={(text) => handleChange("uf", text)}
            />
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.label}>cep</Text>
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
          <TouchableOpacity style={styles.button} onPress={cadastrarEndereco}>
            <Text style={styles.buttonText}>Cadastrar Endereco</Text>
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
