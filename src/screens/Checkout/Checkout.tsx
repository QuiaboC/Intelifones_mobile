import { Picker } from "@react-native-picker/picker";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../services/api";
import { showMessage } from "react-native-flash-message";
import { style } from "./style";
import CardConfirmar from "../../components/CardConfirmar";
import ButtonSelect from "../../components/ButtonSelect";

export default function Checkout({ navigation }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    Cep: "",
    Telefone: "",
    Endereco: "",
    Complemento: "",
    Numero: "",
    FormaPagamento: "",
  });

  const camposInvalidos =
    !form.Endereco.trim() ||
    !form.Cep.trim() ||
    !form.Numero.trim() ||
    !form.FormaPagamento.trim() ||
    !form.Telefone.trim();

  const handleChange = (campo, valor) => {
    if (campo === "Telefone") {
      const numbers = valor.replace(/\D/g, "");
      if (numbers.length <= 2) {
        valor = numbers;
      } else if (numbers.length <= 7) {
        valor = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        valor = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    if (campo === "Cep") {
      const numbers = valor.replace(/\D/g, "");
      if (numbers.length <= 5) {
        valor = numbers;
      } else {
        valor = `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
      }
    }
    if (campo === "Numero") {
      valor = valor.replace(/\D/g, "");
    }
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const finalizarCompra = async () => {
    setModal(false);
    try {
      await api.post("/pedidos/finalizar", {
        endereco: form.Endereco,
        complemento: form.Complemento,
        numero: form.Numero,
        cep: form.Cep,
        formaPagamento: form.FormaPagamento,
        telefoneContato: form.Telefone,
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
        description:
          error?.response?.data?.message || "Erro ao finalizar compra!",
        type: "danger",
      });
    }
  };

  const opcoesPagamento = ["Pix", "Cartão de crédito", "Boleto"];
  const mapaValoresInversos: Record<string, string> = {
    pix: "Pix",
    cartao_credito: "Cartão de crédito",
    boleto: "Boleto",
  };
  const pagamentoSelecionadoTexto =
    mapaValoresInversos[form.FormaPagamento] || "";
  const lidarComSelecaoPagamento = (opcaoEscolhida: string) => {
    const mapaValores: Record<string, string> = {
      Pix: "pix",
      "Cartão de crédito": "cartao_credito",
      Boleto: "boleto",
    };
    const valorApi = mapaValores[opcaoEscolhida] || "";
    handleChange("FormaPagamento", valorApi);
  };

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
                Informe os dados de entrega e pagamento
              </Text>
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>CEP</Text>
              <TextInput
                style={style.input}
                placeholder="00000-000"
                placeholderTextColor="#64748B"
                value={form.Cep}
                onChangeText={(text) => handleChange("Cep", text)}
              />
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>Telefone para contato</Text>
              <TextInput
                style={style.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#64748B"
                value={form.Telefone}
                onChangeText={(text) => handleChange("Telefone", text)}
              />
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>Endereço</Text>
              <TextInput
                style={style.input}
                placeholder="Rua, Avenida, etc."
                placeholderTextColor="#64748B"
                value={form.Endereco}
                onChangeText={(text) => handleChange("Endereco", text)}
              />
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>Complemento</Text>
              <TextInput
                style={style.input}
                placeholder="Apartamento, sala, etc."
                placeholderTextColor="#64748B"
                value={form.Complemento}
                onChangeText={(text) => handleChange("Complemento", text)}
              />
            </View>

            <View style={style.containerInput}>
              <Text style={style.label}>Número da casa</Text>
              <TextInput
                style={style.input}
                placeholder="Número da casa"
                placeholderTextColor="#64748B"
                value={form.Numero}
                onChangeText={(text) => handleChange("Numero", text)}
              />
            </View>

            <ButtonSelect
              label="Forma de pagamento"
              opcoes={opcoesPagamento}
              selecionado={pagamentoSelecionadoTexto}
              aoSelecionar={lidarComSelecaoPagamento}
            />
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
