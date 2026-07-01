import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
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

export default function recuperarSenha({ navigation }) {
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  const lidarComRecuperacao = async () => {
    if (!email.trim()) {
      showMessage({
        message: "Erro",
        description: "Por favor, digite o seu e-mail.",
        type: "danger",
      });
      return;
    }

    try {
      setCarregando(false);
      setCarregando(true);
      await api.post("/auth/recuperar-senha", {
        email: email.trim(),
      });

      showMessage({
        message: "Sucesso",
        description: "Se o e-mail será enviado!",
        type: "success",
      });

      setTimeout(() => navigation.navigate("ResetarSenha"), 2000);
    } catch (error) {
      console.log("Erro ao solicitar recuperação:", error);
      showMessage({
        message: "Erro",
        description:
          "Não foi possível processar a solicitação. Tente novamente.",
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

          <Text style={style.logo}>Recuperar senha</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }} 
        >
          <View style={style.container}>

            <View style={style.contentTop}>
              <View style={style.containerTitulo}>
                <Text style={style.titulo}>Recupere sua senha</Text>
                <Text style={style.subtitulo}>
                  Cadastre-se para aproveitar as melhores ofertas
                </Text>
              </View>

              <View style={style.containerInput}>
                <Text style={style.label}>Email</Text>
                <TextInput
                  style={style.input}
                  placeholder="exemplo@email.com"
                  placeholderTextColor="#64748B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>


            <View style={style.containerButton}>
              <TouchableOpacity
                style={style.button}
                onPress={lidarComRecuperacao}

              >
                <Text style={style.buttonText}>Enviar email</Text>
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
  scroll: {
    flex: 1,
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
    gap: 20, 
  },
  containerButton: {
    width: "100%",
    marginTop: 20, 
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
    gap: 20,
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
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
