import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";
import { styles } from "./style";

export default function Vendas({ navigation }) {
  const [vendas, setVendas] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [busca, setBusca] = useState("");

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

  const filtrosFiltrados = vendas.filter((item) =>
    item.produto.nome.toLowerCase().includes(busca.toLowerCase()),
  );

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
        <View style={styles.containerFiltro}>
          <TextInput
            style={styles.filtro}
            placeholder="Pesquisar produto"
            placeholderTextColor="#64748B"
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {filtrosFiltrados.map((item) => (
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