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
import { style } from "../../styles/login";

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
