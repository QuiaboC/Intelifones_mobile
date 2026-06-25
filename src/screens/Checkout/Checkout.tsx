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

export default function Checkout({ navigation }) {
  const [form, setForm] = useState({
    Cep: "",
    Telefone: "",
    Endereco: "",
    Complemento: "",
    Numero: "",
    FormaPagamento: "",
  });

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

    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const finalizarCompra = async () => {
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

          <View style={style.containerInput}>
            <Text style={style.label}>Forma de pagamento</Text>
            <Picker
              style={style.input}
              selectedValue={form.FormaPagamento}
              onValueChange={(itemValue) =>
                handleChange("FormaPagamento", itemValue)
              }
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Pix" value="pix" />
              <Picker.Item label="Cartão de crédito" value="cartao_credito" />
              <Picker.Item label="Boleto" value="boleto" />
            </Picker>
          </View>

          <TouchableOpacity style={style.button} onPress={finalizarCompra}>
            <Text style={style.buttonText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
