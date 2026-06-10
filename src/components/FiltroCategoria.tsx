import axios from "axios";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FiltroCategoria({
  onClose,
  categoriaSelecionada,
  setCategoriaSelecionada,
}) {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categorias")
      .then((response) => setCategoria(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.indicador} />
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Categorias</Text>
        <TouchableOpacity style={styles.buttonSair} onPress={onClose}>
          <X size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriasContainer}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setCategoriaSelecionada(null);
            onClose();
          }}
        >
          <Text style={styles.nomeCategoria}>Todos</Text>
        </TouchableOpacity>
        {categoria.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              setCategoriaSelecionada(item.id);
              onClose();
            }}
          >
            <Text style={styles.nomeCategoria}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "60%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  indicador: {
    width: 50,
    height: 5,
    backgroundColor: "#CBD5E1",
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 15,
  },

  containerTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
  },

  buttonSair: {
    backgroundColor: "#F1F5F9",
    padding: 8,
    borderRadius: 999,
  },

  categoriasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 20,
  },

  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 999,
  },
  nomeCategoria: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
});
