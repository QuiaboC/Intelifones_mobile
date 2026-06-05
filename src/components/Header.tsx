import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Bell, ShoppingCart } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header() {

  const navigation = useNavigation();

  return (
    <View style={styles.header}>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.nome}>Intelifones</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filtro}
        onPress={() => navigation.navigate("FiltroBuscar")}
      ><Text style={styles.textInput}>Digite aqui</Text></TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Bell color="#fff" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
        <ShoppingCart color="#fff" size={24} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
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
  textInput: {
    color: "#64748B",
  }
});