import { ChevronLeft, Plus, MapPin, Trash, Edit } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";
import atualizarEndereco from "./atualizarEndereco";

export default function Localizacao({ navigation }) {
  const [localizacao, setLocalizacao] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    api
      .get("/usuarios/enderecos")
      .then((res) => setLocalizacao(res.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(localizacao);

  const filtrosFiltrados = localizacao.filter((item) =>
    item.logradouro?.toLowerCase().includes(busca.toLowerCase()),
  );

  const deletaEndereco = async (id) => {
    try {
      const response = await api.delete(`/usuarios/enderecos/${id}`);
      setLocalizacao((prev) => prev.filter((item) => item.id !== id));
      console.log("localizacao excluida com sucesso", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const EnderecoPrincipal = async (id) => {
    try {
      const res = await api.patch(`/usuarios/enderecos/${id}/principal`);
      setLocalizacao((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, principal: true }
            : { ...item, principal: false },
        ),
      );
    } catch (error) {
      console.log(
        "Erro ao definir endereço principal:",
        error.response?.data || error,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Meus endereços</Text>
      </View>

      <View style={styles.containerFiltro}>
        <TextInput
          style={styles.filtro}
          placeholder="Pesquisar endereço"
          placeholderTextColor="#64748B"
          value={busca}
          onChangeText={setBusca}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("cadastrarEndereco")}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {filtrosFiltrados.map((item) => (
          <View key={item.id} style={styles.enderecoCard}>
            <View style={styles.acoesContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("atualizarEndereco", { id: item.id })
                }
                style={styles.botaoAcao}
              >
                <Edit size={20} color="#3B82F6" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => EnderecoPrincipal(item.id)}
                style={styles.botaoAcao}
              >
                <Edit size={20} color="#9fb621" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deletaEndereco(item.id)}
                style={styles.botaoAcao}
              >
                <Trash size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.cardHeader}>
              <View style={styles.iconeContainer}>
                <MapPin size={22} color="#2563EB" />
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.ruaTexto} numberOfLines={2}>
                  {item.logradouro}, {item.numero}
                </Text>
                {item.complemento ? (
                  <Text style={styles.complementoTexto}>
                    {item.complemento}
                  </Text>
                ) : null}
                <Text style={styles.bairroCidadeTexto}>
                  {item.bairro} • {item.cidade} - {item.uf}
                </Text>
                <Text style={styles.cepTexto}>CEP: {item.cep}</Text>
              </View>
            </View>

            {item.principal && (
              <View style={styles.tagPrincipal}>
                <Text style={styles.tagPrincipalTexto}>Principal</Text>
              </View>
            )}
          </View>
        ))}

        {filtrosFiltrados.length === 0 && (
          <Text style={styles.erroTexto}>Nenhum endereço encontrado.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#2563EB",
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  containerFiltro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: "#0F172A",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#10B981",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  enderecoCard: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 12,
  },
  iconeContainer: {
    backgroundColor: "#EFF6FF",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
    gap: 2,
    paddingRight: 65,
  },
  ruaTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },
  complementoTexto: {
    fontSize: 14,
    color: "#64748B",
    fontStyle: "italic",
  },
  bairroCidadeTexto: {
    fontSize: 14,
    color: "#475569",
    marginTop: 2,
  },
  cepTexto: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  acoesContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 8,
    zIndex: 10,
  },
  botaoAcao: {
    backgroundColor: "#F8FAFC",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tagPrincipal: {
    alignSelf: "flex-start",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 12,
  },
  tagPrincipalTexto: {
    color: "#0369A1",
    fontSize: 12,
    fontWeight: "700",
  },
  erroTexto: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 14,
    marginTop: 20,
  },
});
