import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { style } from "./style";
import { salvarToken } from "../../../services/auth";
import { useState } from "react";
import api from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const fazerLogin = async () => {
    if (!form.email.trim()) return alert("Informe o email");
    if (!form.senha.trim()) return alert("Informe a senha");
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        senha: form.senha,
      });

      await salvarToken(response.data.token);

      await AsyncStorage.setItem(
        "@usuario",
        JSON.stringify({
          nome: response.data.nome,
          email: response.data.email,
          role: response.data.role,
        }),
      );

      navigation.replace("Home");
      showMessage({
        message: "Sucesso",
        description: "Login realizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.log(error?.response?.data);
      showMessage({
        message: "Erro",
        description: "Email ou senha incorretos.",
        type: "danger",
        style: {
          paddingTop: 30,
          paddingBottom: 20,
        },
      });
    }
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
          <TouchableOpacity onPress={() => navigation.navigate("Loading")}>
            <ChevronLeft color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={style.logo}>Login</Text>
        </View>

        <View style={style.container}>
          <View style={style.containerTitulo}>
            <Text style={style.titulo}>Bem vindo ao Intelifones</Text>
            <Text style={style.subtitulo}>
              Entre na sua conta para se conectar
            </Text>
          </View>

          <View style={style.containerInput}>
            <Text style={style.label}>Email</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#64748B"
              style={style.input}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

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

          <TouchableOpacity>
            <Text style={style.esqueceuSenha}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <View style={style.containerButton}>
            <TouchableOpacity style={style.button} onPress={fazerLogin}>
              <Text style={style.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={style.footerText}>
            <Text style={style.textFooter}>Não tem uma conta ainda?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text style={style.cadastroText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
