import { ChevronLeft, MapPin } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import api from "../../../services/api";
import { showMessage } from "react-native-flash-message";
import { style } from "./style";
import CardConfirmar from "../../components/CardConfirmar";
import ButtonSelect from "../../components/ButtonSelect";

const FRETE_SIMULADO = {
  pix: 0,
  cartao_credito: 9.9,
  boleto: 4.9,
};

export default function Checkout({ navigation }) {
  const [modal, setModal] = useState(false);
  const [enderecos, setEnderecos] = useState([]);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [loading, setLoading] = useState(true);
  

  useFocusEffect(
    useCallback(() => {
      api
        .get("/usuarios/enderecos")
        .then((res) => {
          setEnderecos(res.data);
          const principal = res.data.find((e) => e.principal);
          if (principal) setEnderecoSelecionado(principal);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, [])
  );

  const opcoesEndereco = enderecos.map(
    (e) => `${e.logradouro}, ${e.numero} - ${e.bairro}, ${e.cidade}`
  );

  const opcoesPagamento = ["Pix", "Cartão de crédito", "Boleto"];

  const mapaValores: Record<string, string> = {
    Pix: "pix",
    "Cartão de crédito": "cartao_credito",
    Boleto: "boleto",
  };

  const mapaValoresInversos: Record<string, string> = {
    pix: "Pix",
    cartao_credito: "Cartão de crédito",
    boleto: "Boleto",
  };

  const frete = formaPagamento ? FRETE_SIMULADO[formaPagamento] ?? 0 : null;

  const enderecoTexto = enderecoSelecionado
    ? `${enderecoSelecionado.logradouro}, ${enderecoSelecionado.numero} - ${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade}`
    : "";

  const aoSelecionarEndereco = (texto: string) => {
    const encontrado = enderecos.find(
      (e) =>
        `${e.logradouro}, ${e.numero} - ${e.bairro}, ${e.cidade}` === texto
    );
    setEnderecoSelecionado(encontrado || null);
  };

  const camposInvalidos = !enderecoSelecionado || !formaPagamento;

  const finalizarCompra = async () => {
    setModal(false);
    try {
      await api.post("/pedidos/finalizar", {
        endereco: enderecoSelecionado.logradouro,
        complemento: enderecoSelecionado.complemento || "",
        numero: enderecoSelecionado.numero,
        cep: enderecoSelecionado.cep,
        formaPagamento,
        telefoneContato: "",
        valorFrete: frete,
      });

      showMessage({
        message: "Sucesso",
        description: "Compra finalizada com sucesso!",
        type: "success",
      });

      navigation.navigate("Compras");
    } catch (error) {
      console.log(error?.response?.data);
      showMessage({
        message: "Erro",
        description: error?.response?.data?.message || "Erro ao finalizar compra!",
        type: "danger",
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
            <ChevronLeft size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={style.headerTitulo}>Checkout</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
          <ChevronLeft size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={style.headerTitulo}>Checkout</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scroll}
      >
        <View style={style.card}>
          <View style={style.cardInput}>
            <View style={style.containerTitulo}>
              <Text style={style.nome}>Finalizar Pedido</Text>
              <Text style={style.subtitulo}>
                Selecione o endereço e forma de pagamento
              </Text>
            </View>

            {enderecos.length === 0 ? (
              <TouchableOpacity
                style={styles.semEndereco}
                onPress={() => navigation.navigate("cadastrarEndereco")}
              >
                <MapPin size={20} color="#2563EB" />
                <Text style={styles.semEnderecoTexto}>
                  Nenhum endereço cadastrado. Toque para adicionar.
                </Text>
              </TouchableOpacity>
            ) : (
              <ButtonSelect
                label="Endereço de entrega"
                opcoes={opcoesEndereco}
                selecionado={enderecoTexto}
                aoSelecionar={aoSelecionarEndereco}
              />
            )}

            <ButtonSelect
              label="Forma de pagamento"
              opcoes={opcoesPagamento}
              selecionado={mapaValoresInversos[formaPagamento] || ""}
              aoSelecionar={(op) => setFormaPagamento(mapaValores[op] || "")}
            />

            {frete !== null && (
              <View style={styles.freteContainer}>
                <Text style={styles.freteLabel}>Frete estimado</Text>
                <Text style={styles.freteValor}>
                  {frete === 0 ? "Grátis 🎉" : `R$ ${frete.toFixed(2)}`}
                </Text>
                {frete === 0 && (
                  <Text style={styles.freteDica}>Pix sem custo de entrega!</Text>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[
              style.button,
              camposInvalidos && { backgroundColor: "#CBD5E1" },
            ]}
            onPress={() => setModal(true)}
            disabled={camposInvalidos}
          >
            <Text style={style.buttonText}>Finalizar</Text>
          </TouchableOpacity>

          <CardConfirmar
            visivel={modal}
            aoFechar={() => setModal(false)}
            aoConfirmar={finalizarCompra}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  semEndereco: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#EFF6FF",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 16,
  },
  semEnderecoTexto: {
    flex: 1,
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "500",
  },
  freteContainer: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 4,
  },
  freteLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  freteValor: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16A34A",
  },
  freteDica: {
    fontSize: 12,
    color: "#16A34A",
  },
});
