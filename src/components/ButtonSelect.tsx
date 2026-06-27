import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { ChevronDown, X } from "lucide-react-native";

export default function ButtonSelect({
  label,
  opcoes,
  selecionado,
  aoSelecionar,
}) {
  const [modal, setModal] = useState(false);

  const lidarComSelecao = (opcao) => {
    aoSelecionar(opcao);
    setModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModal(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, !selecionado && { color: "#64748B" }]}>
          {selecionado ? selecionado : "Selecione.."}
        </Text>
        <ChevronDown size={18} color={"#64748B"}/>
      </TouchableOpacity>

      <Modal
        visible={modal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >

        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.indicador} />

            <View style={styles.containerTitulo}>
              <Text style={styles.titulo}>{label ? label : "Selecione uma opção"}</Text>

              <TouchableOpacity style={styles.buttonSair} onPress={() => setModal(false)}>
                <X size={20} color="#2563EB" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={opcoes}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              renderItem={({ item }) => {
                const isSelected = selecionado === item;
                return (
                  <TouchableOpacity
                    style={[
                      styles.opcaoButton,
                      isSelected && styles.opcaoSelecionada
                    ]}
                    onPress={() => lidarComSelecao(item)}
                  >
                    <Text style={[
                      styles.opcaoText,
                      isSelected && styles.opcaoTextoSelecionado
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 14,
    color: "#0F172A",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    maxHeight: "50%",
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
    marginBottom: 18,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },
  buttonSair: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  opcaoButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  opcaoSelecionada: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  opcaoText: {
    fontSize: 16,
    color: "#334155",
    fontWeight: "500",
  },
  opcaoTextoSelecionado: {
    color: "#2563EB",
    fontWeight: "600",
  },
});