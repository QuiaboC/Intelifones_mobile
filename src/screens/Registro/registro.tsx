import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { style } from "./style";
import api from "../../../services/api";
import { salvarToken } from "../../../services/auth";
import { Picker } from "@react-native-picker/picker";
import { showMessage } from "react-native-flash-message";
import ButtonSelect from "../../components/ButtonSelect";

export default function Registro({ navigation }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
    role: "COMPRADOR",
  });

  const handleChange = (campo, valor) => {
  if (campo === "telefone") {
    const numbers = valor.replace(/\D/g, "");

    if (numbers.length <= 2) {
      valor = numbers;
    } else if (numbers.length <= 7) {
      valor = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      valor = `(${numbers.slice(0, 2)}) ${numbers.slice(
        2,
        7
      )}-${numbers.slice(7, 11)}`;
    }
  }

  setForm((prev) => ({
    ...prev,
    [campo]: valor,
  }));
};

  const cadastrarUsuario = async () => {
    if (!form.nome.trim()) return alert("Informe o nome");
    if (!form.email.trim()) return alert("Informe o email");
    if (form.senha.length < 6)
      return alert("A senha deve ter pelo menos 6 caracteres");
    if (form.senha !== form.confirmarSenha)
      return alert("As senhas não coincidem");

    try {
      const response = await api.post("/auth/register", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone,
        endereco: form.endereco,
        role: form.role,
      });

      await salvarToken(response.data.token);
      navigation.replace("Login");
    } catch (error) {
      showMessage({
        message: "Erro",
        description: "Erro ao cadastrar. Verifique os dados.",
        type: "danger",
      });
    }
  };

  const opcoesTipoUsuario = ["Comprador", "Vendedor"];
  const roleSelecionadoTexto = form.role === "COMPRADOR" ? "Comprador" : "Vendedor";
  const lidarComSelecaoRole = (opcaoEscolhida) => {
    const valorApi = opcaoEscolhida === "Comprador" ? "COMPRADOR" : "VENDEDOR";
    handleChange("role", valorApi);
  };

  return (
    <LinearGradient
      colors={["#2563EB", "#06B6D4", "#F1F5F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style.gradient}
    >
      <SafeAreaView style={style.body}>
        <View style={style.ContainerText}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="#fff" size={30} />
          </TouchableOpacity>

          <Text style={style.logo}>Registro</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style.container}>
            <View style={style.containerTitulo}>
              <Text style={style.titulo}>Crie sua conta</Text>

              <Text style={style.subtitulo}>
                Cadastre-se para aproveitar as melhores ofertas
              </Text>
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>Nome</Text>
              <TextInput
                placeholder="Digite seu nome"
                placeholderTextColor="#64748B"
                style={style.input}
                value={form.nome}
                onChangeText={(text) => handleChange("nome", text)}
              />
            </View>
            <View style={style.containerInput}>
              <Text style={style.label}>Email</Text>
              <TextInput
                placeholder="seuemail@gmail.com"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                style={style.input}
                value={form.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>
            <View style={style.containerInput}>
              <Text style={style.label}>Telefone</Text>
              <TextInput
                placeholder="(81) 99999-9999"
                placeholderTextColor="#64748B"
                keyboardType="phone-pad"
                style={style.input}
                value={form.telefone}
                onChangeText={(text) => handleChange("telefone", text)}
              />
            </View>
            <View style={style.containerInput}>
              <Text style={style.label}>Endereço</Text>
              <TextInput
                placeholder="Digite seu endereço"
                placeholderTextColor="#64748B"
                style={style.input}
                value={form.endereco}
                onChangeText={(text) => handleChange("endereco", text)}
              />
            </View>
            <ButtonSelect
              label="Tipo de Usuário"
              opcoes={opcoesTipoUsuario}
              selecionado={roleSelecionadoTexto}
              aoSelecionar={lidarComSelecaoRole}
            />
            <View style={style.containerInput}>
              <Text style={style.label}>Senha</Text>
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#64748B"
                secureTextEntry
                style={style.input}
                value={form.senha}
                onChangeText={(text) => handleChange("senha", text)}
              />
            </View>
            <View style={style.containerInput}>
              <Text style={style.label}>Confirmar senha</Text>
              <TextInput
                placeholder="Confirmar senha"
                placeholderTextColor="#64748B"
                secureTextEntry
                style={style.input}
                value={form.confirmarSenha}
                onChangeText={(text) => handleChange("confirmarSenha", text)}
              />
            </View>
            <View style={style.containerButton}>
              <TouchableOpacity style={style.button} onPress={cadastrarUsuario}>
                <Text style={style.textButton}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
            <View style={style.footerText}>
              <Text style={style.textFooter}>Já possui uma conta?</Text>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={style.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
