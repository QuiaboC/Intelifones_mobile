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
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function PerfilUsuario({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  
    useEffect(() => {
      async function carregarUsuario() {
        const usuarioSalvo = await AsyncStorage.getItem("@usuario");
  
        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      }
  
      carregarUsuario();
    }, []);
  const opcoes = [
    {
      id: 1,
      nome: "Informações de Perfil",
      icone: <User size={22} color="#2563EB" />,
      rota: "EditarUsuario"
    },
    {
      id: 2,
      nome: "Segurança",
      icone: <Shield size={22} color="#2563EB" />,
      rota: ""
    },
    {
      id: 3,
      nome: "Cartões",
      icone: <CreditCard size={22} color="#2563EB" />,
      rota: ""
    },
    {
      id: 4,
      nome: "Localização",
      icone: <MapPin size={22} color="#2563EB" />,
      rota: ""
    },
    {
      id: 5,
      nome: "Privacidade",
      icone: <Lock size={22} color="#2563EB" />,
      rota: ""
    },
    {
      id: 6,
      nome: "Comunicação",
      icone: <Bell size={22} color="#2563EB" />,
      rota: ""
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
            source={require("../../../assets/vetorHome.png")}
            style={styles.imagem}
          />
        </View>

        <Text style={styles.nomePerfil}>{usuario?.nome}</Text>
        <Text style={styles.textPerfil}>{usuario?.email}</Text>
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
            onPress={() => navigation.navigate(item.rota)}
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
