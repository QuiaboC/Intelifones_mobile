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
  usado,
  setUsado,
  ordemPreco,
  setOrdemPreco,
}) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.0.110:8080/api/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.indicador} />

      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Filtros</Text>

        <TouchableOpacity style={styles.buttonSair} onPress={onClose}>
          <X size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitulo}>Condição</Text>

        <TouchableOpacity
          style={[styles.card, usado === null && styles.cardSelecionado]}
          onPress={() => setUsado(null)}
        >
          <Text style={styles.nomeItem}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, usado === false && styles.cardSelecionado]}
          onPress={() => setUsado(false)}
        >
          <Text style={styles.nomeItem}>Novo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, usado === true && styles.cardSelecionado]}
          onPress={() => setUsado(true)}
        >
          <Text style={styles.nomeItem}>Usado</Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Preço</Text>

        <TouchableOpacity
          style={[styles.card, ordemPreco === "asc" && styles.cardSelecionado]}
          onPress={() => setOrdemPreco("asc")}
        >
          <Text style={styles.nomeItem}>Menor preço</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, ordemPreco === "desc" && styles.cardSelecionado]}
          onPress={() => setOrdemPreco("desc")}
        >
          <Text style={styles.nomeItem}>Maior preço</Text>
        </TouchableOpacity>

        <Text style={styles.subtitulo}>Categorias</Text>

        <TouchableOpacity
          style={[
            styles.card,
            categoriaSelecionada === null && styles.cardSelecionado,
          ]}
          onPress={() => setCategoriaSelecionada(null)}
        >
          <Text style={styles.nomeItem}>Todas</Text>
        </TouchableOpacity>

        {categorias.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              categoriaSelecionada === item.id && styles.cardSelecionado,
            ]}
            onPress={() => setCategoriaSelecionada(item.id)}
          >
            <Text style={styles.nomeItem}>{item.nome}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.botaoAplicar} onPress={onClose}>
          <Text style={styles.textoBotao}>Aplicar filtros</Text>
        </TouchableOpacity>
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
    paddingBottom: 12,
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
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },

  containerTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  buttonSair: {
    padding: 4,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },

  cardSelecionado: {
    backgroundColor: "#DBEAFE",
    borderColor: "#2563EB",
  },

  nomeItem: {
    fontSize: 16,
  },

  botaoAplicar: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
