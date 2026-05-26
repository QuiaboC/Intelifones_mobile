import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft } from "lucide-react-native";

export default function Login({ navigation }) {
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
            />
          </View>

          <View style={style.containerInput}>
            <Text style={style.label}>Senha</Text>

            <TextInput
              placeholder="Senha"
              placeholderTextColor="#64748B"
              secureTextEntry
              style={style.input}
            />
          </View>

          <TouchableOpacity>
            <Text style={style.esqueceuSenha}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <View style={style.containerButton}>
            <TouchableOpacity
              style={style.button}
              onPress={() => navigation.navigate("Home")}
            >
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

const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
  },

  ContainerText: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 20,
  },

  logo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  containerTitulo: {
    gap: 7,
  },
  titulo:{
    fontSize: 22,
    color: "#2563EB",
    fontWeight: "bold"
  },
  subtitulo: {
    fontSize: 17,
    color: "#475569",
    marginBottom: 10,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 25,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingVertical: 30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 20,
  },

  containerInput: {
    gap: 8,
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
  },
  esqueceuSenha: {
    color: "#2563EB",
    fontWeight: "600",
    alignSelf: "flex-end",
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
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  textFooter: {
    color: "#475569",
    fontSize: 14,
  },
  cadastroText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
});
