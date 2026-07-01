import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";
import { showMessage } from "react-native-flash-message";

export default function ResetarSenha({ navigation }) {
  const [token, setToken] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const lidarComRedefinicao = async () => {
    if (!token.trim() || !novaSenha.trim()) {
      showMessage({
        message: "Erro",
        description: "Por favor, preencha todos os campos.",
        type: "danger",
      });
      return;
    }

    if (novaSenha.length < 6) {
      showMessage({
        message: "Erro",
        description: "A senha deve conter pelo menos 6 caracteres.",
        type: "danger",
      });
      return;
    }

    try {
      setCarregando(true);
      

      await api.post("/auth/resetar-senha", {
        token: token.trim(),
        novaSenha: novaSenha,
      });

      showMessage({
        message: "Sucesso",
        description: "Sua senha foi redefinida com sucesso!",
        type: "success",
      });

      setTimeout(() => navigation.navigate("Login"), 2000);
    } catch (error) {
      console.log("Erro ao redefinir senha:", error);
      showMessage({
        message: "Erro",
        description: "Token inválido ou expirado. Tente novamente.",
        type: "danger",
      });
    } finally {
      setCarregando(false);
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

          <Text style={style.logo}>Nova Senha</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={style.container}>
            <View style={style.contentTop}>
              <View style={style.containerTitulo}>
                <Text style={style.titulo}>Crie uma nova senha</Text>
                <Text style={style.subtitulo}>
                  Insira o código enviado para o seu e-mail e escolha sua nova credencial de acesso.
                </Text>
              </View>

              <View style={style.containerInput}>
                <Text style={style.label}>Código de Verificação (Token)</Text>
                <TextInput
                  style={style.input}
                  placeholder="Cole o token aqui"
                  placeholderTextColor="#64748B"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={token}
                  onChangeText={setToken}
                />
              </View>

              <View style={[style.containerInput, { marginTop: 14 }]}>
                <Text style={style.label}>Nova Senha</Text>
                <TextInput
                  style={style.input}
                  placeholder="Digite sua nova senha"
                  placeholderTextColor="#64748B"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                />
              </View>
            </View>

            <View style={style.containerButton}>
              <TouchableOpacity
                style={style.button}
                onPress={lidarComRedefinicao}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={style.buttonText}>Redefinir senha</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: "space-between", 
    width: "100%",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 15,
  },
  contentTop: {
    width: "100%",
    gap: 16,
  },
  containerTitulo: {
    gap: 6,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 24,
    color: "#2563EB",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
    lineHeight: 20,
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
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 52, 
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});