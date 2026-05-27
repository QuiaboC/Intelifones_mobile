import {
  House,
  Grid2x2,
  ShoppingCart,
  Heart,
  User
} from "lucide-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet
} from "react-native";
import {
  useNavigation,
  useRoute
} from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const menus = [
    {
      id: 1,
      nome: "Início",
      Icone: House,
      rota: "Home"
    },
    {
      id: 2,
      nome: "Produtos",
      Icone: Grid2x2,
      rota: "Produtos"
    },
    {
      id: 3,
      nome: "Carrinho",
      Icone: ShoppingCart,
      rota: "Carrinho"
    },
    {
      id: 4,
      nome: "Favoritos",
      Icone: Heart,
      rota: "Favoritos"
    },
    {
      id: 5,
      nome: "Perfil",
      Icone: User,
      rota: "Perfil"
    },
  ];

  return (
    <View style={styles.container}>
      {menus.map((item) => {
        const ativo = route.name === item.rota;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.rota)}
          >
            <item.Icone
              color={ativo ? "#2563EB" : "#64748B"}
              size={24}
            />

            <Text
              style={[
                styles.nome,
                ativo && styles.text
              ]}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  nome: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "500",
  },

  text: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
