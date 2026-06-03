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
import axios from "axios";

export default function Registro({ navigation }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
    ativo: "",
  });

  const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const cadastrarUsuario = async () => {
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const response = await axios.post("http://10.0.0.110:8080/vendedores", {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        endereco: form.email,
        senha: form.senha,
        ativo: true,
      });
      console.log("cadastrado com sucesso", response.data);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="#fff" size={30} />
          </TouchableOpacity>

          <Text style={style.logo}>Registro</Text>
        </View>

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
      </SafeAreaView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
  },
  ContainerText: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 18,
  },
  logo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 15,
    gap: 18,
  },
  containerTitulo: {
    gap: 6,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 24,
    color: "#2563EB",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
    lineHeight: 22,
  },
  containerInput: {
    gap: 7,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 14,
    color: "#0F172A",
  },
  containerButton: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },
  textFooter: {
    color: "#475569",
    fontSize: 14,
  },
  loginText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
});
