import { View, StyleSheet, Text, TextInput } from "react-native";
import { List, ShoppingCart } from "lucide-react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.nome}>intelifones</Text>
      <TextInput
        style={styles.filtro}
        placeholder="Digite aqui"
        placeholderTextColor="#64748B"
      />
      <List color="#fff" size={24} />
      <ShoppingCart color="#fff" size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2563EB",
    gap: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    fontSize: 14,
    color: "#0F172A",
  },
});
