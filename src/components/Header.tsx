import { View, StyleSheet, Text, TextInput } from "react-native";
import { List, ShoppingCart } from "lucide-react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.nome}>intelifones</Text>
      <TextInput
        style={styles.filtro}
        placeholder="Digite aqui"
      />
      <List color="#ffff" size={24}/>
      <ShoppingCart color="#ffff" size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2563EB",
    gap: 5,
  },
  nome: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffff",
  },
  filtro: {
    backgroundColor: "#ffff",
    padding: 5,
    borderWidth: 0,
    borderRadius: 10,
  },
});
