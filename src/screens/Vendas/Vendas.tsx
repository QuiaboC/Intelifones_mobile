import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";

export default function Vendas({ navigation }) {
  const [vendas, setVendas] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  useEffect(() => {
    api
      .get("/pedidos/vendas")
      .then((response) => setVendas(response.data))
      .catch((error) => console.log(error));
  }, []);

  const abrirDetalhes = (venda) => {
    setVendaSelecionada(venda);
    setModalVisivel(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>Minhas Vendas</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {vendas.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.produtoCard}
            onPress={() => abrirDetalhes(item)}
            activeOpacity={0.7}
          >
            <View style={styles.containerImagem}>
              <Image
                source={{
                  uri: `https://unalienable-jacki-exclamatorily.ngrok-free.dev/uploads/${item.produto.imagem}`,
                }}
                style={styles.imagem}
              />
            </View>

            <View style={styles.containerText}>
              <Text style={styles.tituloProduto} numberOfLines={1}>
                {item.produto.nome}
              </Text>
              <Text style={styles.descricao}>
                Qtd: {item.quantidade} unidade(s)
              </Text>
              <Text style={styles.preco}>
                R$ {(item.quantidade * item.precoUnitario).toFixed(2)}
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusTexto}>{item.pedido.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {vendaSelecionada && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => setModalVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalVisualTitulo}>Detalhes da Venda</Text>
                <View style={styles.divisor} />

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.secaoTitulo}>Cliente</Text>
                  <Text style={styles.modalInfo}>
                    Nome: {vendaSelecionada.pedido.comprador.nome}
                  </Text>
                  <Text style={styles.modalInfo}>
                    Telefone: {vendaSelecionada.pedido.telefoneContato}
                  </Text>
                  <Text style={styles.modalInfo}>
                    E-mail: {vendaSelecionada.pedido.comprador.email}
                  </Text>

                  <View style={styles.divisorAninhado} />

                  <Text style={styles.secaoTitulo}>Endereço de Entrega</Text>
                  <Text style={styles.modalInfo}>
                    Rua: {vendaSelecionada.pedido.endereco}
                  </Text>
                  <Text style={styles.modalInfo}>
                    Número: {vendaSelecionada.pedido.numero}
                  </Text>
                  <Text style={styles.modalInfo}>
                    CEP: {vendaSelecionada.pedido.cep}
                  </Text>
                  {vendaSelecionada.pedido.complemento && (
                    <Text style={styles.modalInfo}>
                      Ponto de Ref: {vendaSelecionada.pedido.complemento}
                    </Text>
                  )}

                  <View style={styles.divisorAninhado} />

                  <Text style={styles.secaoTitulo}>Pagamento</Text>
                  <Text style={styles.modalInfo}>
                    Método:{" "}
                    {vendaSelecionada.pedido.formaPagamento.replace("_", " ")}
                  </Text>
                  <Text style={styles.modalInfo}>
                    Status: {vendaSelecionada.pedido.status}
                  </Text>
                </ScrollView>

                <TouchableOpacity
                  style={styles.btnFecharModal}
                  onPress={() => setModalVisivel(false)}
                >
                  <Text style={styles.btnFecharTexto}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#2563EB",
  },

  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  scroll: {
    padding: 10,
    paddingBottom: 30,
  },
  produtoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },

  containerImagem: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
  },

  imagem: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  containerText: {
    flex: 1,
    gap: 10,
  },

  tituloProduto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  descricao: {
    fontSize: 13,
    color: "#64748B",
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 4,
  },

  statusContainer: {
    backgroundColor: "#fff3e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusTexto: {
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: "80%",
  },
  modalVisualTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  divisor: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  divisorAninhado: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  secaoTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  modalInfo: {
    fontSize: 15,
    color: "#444",
    marginBottom: 4,
  },
  btnFecharModal: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 14,
    marginTop: 16,
    alignItems: "center",
  },
  btnFecharTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
