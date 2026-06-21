import { ShoppingCart, Tag, Sparkles, PackageOpen } from "lucide-react-native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ButtonsHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Produtos")}
      >
        <View style={styles.image}>
          <ShoppingCart color="#fff" size={22} />
        </View>
        <Text style={styles.text}>Mais vendidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Produtos")}
      >
        <View style={styles.image}>
          <Tag color="#fff" size={22} />
        </View>
        <Text style={styles.text}>Ofertas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Favoritos")}
      >
        <View style={styles.image}>
          <Sparkles color="#fff" size={22} />
        </View>
        <Text style={styles.text}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Compras")}
      >
        <View style={styles.image}>
          <PackageOpen color="#fff" size={22} />
        </View>
        <Text style={styles.text}>Minhas compras</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
  },
  button: {
    alignItems: "center",
    width: 70,
  },
  image: {
    backgroundColor: "#2563EB",
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#0F172A",
  },
});
