import {
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  CreditCard,
  MapPin,
  Lock,
  Bell,
} from "lucide-react-native";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilUsuario({ navigation }) {
  const opcoes = [
    {
      id: 1,
      nome: "Informações de Perfil",
      icone: <User size={22} color="#2563EB" />,
    },
    {
      id: 2,
      nome: "Segurança",
      icone: <Shield size={22} color="#2563EB" />,
    },
    {
      id: 3,
      nome: "Cartões",
      icone: <CreditCard size={22} color="#2563EB" />,
    },
    {
      id: 4,
      nome: "Localização",
      icone: <MapPin size={22} color="#2563EB" />,
    },
    {
      id: 5,
      nome: "Privacidade",
      icone: <Lock size={22} color="#2563EB" />,
    },
    {
      id: 6,
      nome: "Comunicação",
      icone: <Bell size={22} color="#2563EB" />,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Meu Perfil</Text>
      </View>

      <View style={styles.containerPerfil}>
        <View style={styles.containerImagem}>
          <Image
            source={require("../../assets/vetorHome.png")}
            style={styles.imagem}
          />
        </View>

        <Text style={styles.nomePerfil}>Cleiton Paixão</Text>
        <Text style={styles.textPerfil}>cleiton@gmail.com</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {opcoes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cardOpcao}
            activeOpacity={0.8}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>{item.icone}</View>

              <Text style={styles.cardText}>{item.nome}</Text>
            </View>

            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}
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
  containerPerfil: {
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  containerImagem: {
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    padding: 10,
    marginBottom: 12,
  },
  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  nomePerfil: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  textPerfil: {
    color: "#DBEAFE",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  scroll: {
    padding: 12,
    paddingBottom: 30,
    gap: 14,
  },
  cardOpcao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
});
