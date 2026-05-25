import { House, Grid2x2, ShoppingCart, Heart, User } from "lucide-react-native";

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function Footer() {
  const menus = [
    {
      id: 1,
      nome: "Início",
      icone: <House color="#2563EB" size={24} />,
    },
    {
      id: 2,
      nome: "Categorias",
      icone: <Grid2x2 color="#64748B" size={24} />,
    },
    {
      id: 3,
      nome: "Carrinho",
      icone: <ShoppingCart color="#64748B" size={24} />,
    },
    {
      id: 4,
      nome: "Favoritos",
      icone: <Heart color="#64748B" size={24} />,
    },
    {
      id: 5,
      nome: "Perfil",
      icone: <User color="#64748B" size={24} />,
    },
  ];

  return (
    <View style={styles.container}>
      {menus.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.button}
          activeOpacity={0.7}
        >
          {item.icone}
          <Text style={[styles.nome, item.id === 1 && styles.text]}>
            {item.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopColor: "#E2E8F0",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  nome: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  text: {
    color: "#2563EB",
    fontWeight: "700",
  },
});
