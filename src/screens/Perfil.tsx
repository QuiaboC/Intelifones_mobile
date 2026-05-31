import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Footer from "../components/Footer";

import {
  ChevronRight,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  Handbag,
  Info,
} from "lucide-react-native";

export default function Perfil({navigation}) {
  const atividades = [
    {
      id: 1,
      nome: "Minhas compras",
      icone: <Package size={22} color="#2563EB" />,
      rota: "Compras"
    },
    {
      id: 2,
      nome: "Vendas",
      icone: <Handbag size={22} color="#2563EB" />,
      rota: "Vendas"
    },
    {
      id: 3,
      nome: "Favoritos",
      icone: <Heart size={22} color="#2563EB" />,
      rota: "Favoritos"
    },
    {
      id: 4,
      nome: "Carrinho",
      icone: <ShoppingCart size={22} color="#2563EB" />,
      rota: "Carrinho"
    },
  ];

  const configuracoes = [
    {
      id: 1,
      nome: "Informações",
      icone: <Info size={22} color="#2563EB" />,
      rota: "Informações"
    },
    {
      id: 2,
      nome: "Configurações",
      icone: <Settings size={22} color="#2563EB" />,
      rota: "Configurações"
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPerfil}>
        <View style={styles.ContainerImagem}>
          <Image
            source={require("../../assets/vetorHome.png")}
            style={styles.imagem}
          />
        </View>

        <View style={styles.infoPerfil}>
          <Text style={styles.NomePerfil}>Cleiton Paixão</Text>

          <TouchableOpacity style={styles.buttonPerfil} onPress={() => navigation.navigate("PerfilUsuario")}>
            <Text style={styles.textPerfil}>Meu perfil</Text>

            <ChevronRight size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divulgar}>
        <View style={styles.post}>
          <View style={styles.postText}>
            <Text style={styles.postTitulo}>
              Venda seus produtos na nossa loja!
            </Text>
          </View>
          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.categoriaTexto}>Minhas atividades</Text>

        {atividades.map((item) => (
          <TouchableOpacity key={item.id} style={styles.cardOpcao} onPress={() => navigation.navigate(item.rota)}>
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>{item.icone}</View>

              <Text style={styles.cardText}>{item.nome}</Text>
            </View>

            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        <Text style={styles.categoriaTexto}>Configurações e informações</Text>

        {configuracoes.map((item) => (
          <TouchableOpacity key={item.id} style={styles.cardOpcao} onPress={() => navigation.navigate(item.rota)}>
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>{item.icone}</View>

              <Text style={styles.cardText}>{item.nome}</Text>
            </View>

            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />

          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  scroll: {
    padding: 12,
    paddingBottom: 30,
    gap: 14,
  },

  containerPerfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 20,
    backgroundColor: "#2563EB",
  },

  ContainerImagem: {
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    padding: 10,
  },

  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },

  infoPerfil: {
    flex: 1,
    gap: 6,
  },

  NomePerfil: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  buttonPerfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  textPerfil: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  divulgar: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#2563EB",
  },

  post: {
    backgroundColor: "#fff",
    padding: 11,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  postText: {
    flex: 1,
    marginRight: 12,
    gap: 4,
  },

  postTitulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  postSubtitulo: {
    fontSize: 13,
    color: "#64748B",
  },

  postButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  cardOpcao: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  logoutButton: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 15,
  },
  categoriaTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 10,
    marginBottom: 2,
  },
});
