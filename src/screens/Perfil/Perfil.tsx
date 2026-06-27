import { View, ScrollView, Image, Text, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";
import { styles } from "./style";
import {
  ChevronRight,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  Handbag,
  Info,
  PackageOpen,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import api from "../../../services/api";

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
  async function carregarUsuario() {
    try {
      const response = await api.get("/usuarios/me");
      setUsuario(response.data);
      await AsyncStorage.setItem(
        "@usuario",
        JSON.stringify(response.data)
      );
    } catch (error) {
      console.log(error.response?.data || error);
    }
  }

  carregarUsuario();
}, []);

  const alterarFoto = async () => {
  const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissao.granted) {
    alert("Permissão negada.");
    return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (resultado.canceled) return;

  const imagem = resultado.assets[0];

  const formData = new FormData();

  try {
    if (Platform.OS === "web") {
      const responseImagem = await fetch(imagem.uri);
      const blob = await responseImagem.blob();

      formData.append("arquivo", blob, "usuario.png");
    } else {
      formData.append("arquivo", {
        uri: imagem.uri,
        name: "usuario.jpg",
        type: "image/jpeg",
      } as any);
    }

    const response = await api.put("/usuarios/me/imagem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setUsuario(response.data);
  } catch (error: any) {
    console.log(error.response?.data || error);
  }
};

  const atividades = [
    {
      id: 1,
      nome: "Minhas compras",
      icone: <Package size={22} color="#2563EB" />,
      rota: "Compras",
    },
    {
      id: 2,
      nome: "Vendas",
      icone: <Handbag size={22} color="#2563EB" />,
      rota: "Vendas",
      apenasVendedor: true,
    },
    {
      id: 3,
      nome: "Favoritos",
      icone: <Heart size={22} color="#2563EB" />,
      rota: "Favoritos",
    },
    {
      id: 4,
      nome: "Carrinho",
      icone: <ShoppingCart size={22} color="#2563EB" />,
      rota: "Carrinho",
    },
    {
      id: 5,
      nome: "Meus Produtos",
      icone: <PackageOpen size={22} color="#2563EB" />,
      rota: "MeusProdutos",
      apenasVendedor: true,
    },
  ];

  const configuracoes = [
    {
      id: 1,
      nome: "Informações de Perfil",
      icone: <Info size={22} color="#2563EB" />,
      rota: "EditarUsuario",
    },
    {
      id: 2,
      nome: "Configurações",
      icone: <Settings size={22} color="#2563EB" />,
      rota: "Teste",
    },
  ];

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@usuario");
    await AsyncStorage.removeItem("@sessao");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPerfil}>
        <TouchableOpacity style={styles.ContainerImagem} onPress={alterarFoto}>
          <Image
            source={
              usuario?.imagem
                ? {
                     uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/usuarios/${usuario.imagem}` ,
                  }
                : require("../../../assets/vetorHome.png")
            }
            style={styles.imagem}
          />
        </TouchableOpacity>

        <View style={styles.infoPerfil}>
          <Text style={styles.NomePerfil}>{usuario?.nome}</Text>

          <TouchableOpacity
            style={styles.buttonPerfil}
            onPress={() => navigation.navigate("PerfilUsuario")}
          >
            <Text style={styles.textPerfil}>Meu perfil</Text>

            <ChevronRight size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.badgeTipo}>
          <Text style={styles.badgeTipoText}>
            {usuario?.role === "VENDEDOR" ? "Vendedor" : "Comprador"}
          </Text>
        </View>
      </View>
      {usuario?.role === "VENDEDOR" ? (
        <View style={styles.divulgar}>
          <View style={styles.post}>
            <View style={styles.postText}>
              <Text style={styles.postTitulo}>
                Venda seus produtos na nossa loja!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate("Cadastro")}
            >
              <Text style={styles.postButtonText}>Clique aqui</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.divulgar}>
          <View style={styles.post}>
            <View style={styles.postText}>
              <Text style={styles.postTitulo}>
                Confira os produtos disponíveis!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.postButton}
              onPress={() => navigation.navigate("Produtos")}
            >
              <Text style={styles.postButtonText}>Ver produtos</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.categoriaTexto}>Minhas atividades</Text>

        {atividades
          .filter(
            (item) => !item.apenasVendedor || usuario?.role === "VENDEDOR",
          )
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardOpcao}
              onPress={() => navigation.navigate(item.rota)}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconContainer}>{item.icone}</View>

                <Text style={styles.cardText}>{item.nome}</Text>
              </View>

              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}

        <Text style={styles.categoriaTexto}>Configurações e informações</Text>

        {configuracoes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cardOpcao}
            onPress={() => navigation.navigate(item.rota)}
          >
            <View style={styles.cardLeft}>
              <View style={styles.iconContainer}>{item.icone}</View>

              <Text style={styles.cardText}>{item.nome}</Text>
            </View>

            <ChevronRight size={20} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color="#EF4444" />

          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
