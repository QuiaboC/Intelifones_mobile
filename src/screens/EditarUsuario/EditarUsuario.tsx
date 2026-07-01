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

export default function EditarUsuario({ navigation }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    ativo: "",
  });

  useEffect(() => {
    api
      .get("/usuarios/me")
      .then((response) => setForm(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (campo, valor) => {
    if (campo === "cpf") {
      const numbers = valor.replace(/\D/g, "").slice(0, 11);

      if (numbers.length <= 3) {
        valor = numbers;
      } else if (numbers.length <= 6) {
        valor = `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
      } else if (numbers.length <= 9) {
        valor = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
      } else {
        valor = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
          6,
          9
        )}-${numbers.slice(9, 11)}`;
      }
    } 
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const editarUsuario = async () => {
    try {
      const response = await api.put("/usuarios/me", {
        nome: form.nome,
        telefone: form.telefone,
        cpf: form.cpf,
      });
      console.log(response.data);
      navigation.navigate("Perfil");
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

        <Text style={styles.headerTitulo}>Informações de perfil</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.card}>
          <View>
            <View style={styles.containerTitulo}>
              <Text style={styles.nome}>Verifique seus dados</Text>

              <Text style={styles.subtitulo}>
                Atualize as informações do seu Perfil.
              </Text>
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.label}>Nome de usuario</Text>

              <TextInput
                placeholder="Nome"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={form.nome}
                onChangeText={(text) => handleChange("nome", text)}
              />
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.label}>telefone</Text>

              <TextInput
                placeholder="telefone"
                placeholderTextColor="#64748B"
                keyboardType="numeric"
                style={styles.input}
                value={String(form.telefone)}
                onChangeText={(text) => handleChange("telefone", text)}
              />
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.label}>CPF</Text>

              <TextInput
                placeholder="000.000.000-00"
                placeholderTextColor="#64748B"
                style={styles.input}
                value={form.cpf}
                onChangeText={(text) => handleChange("cpf", text)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={editarUsuario}
          >
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
