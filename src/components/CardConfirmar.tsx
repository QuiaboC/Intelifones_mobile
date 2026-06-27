import { ShoppingBag } from "lucide-react-native";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";

export default function CardConfirmar({ visivel, aoFechar, aoConfirmar }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visivel}
      onRequestClose={aoFechar}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          
          <View style={styles.cardIcon}>
            <ShoppingBag size={40} color={"#2563EB"} />
            <Text style={styles.cardText}>
              Você tem certeza que deseja finalizar a compra?
            </Text>
          </View>

          <View style={styles.cardButton}>
            <TouchableOpacity 
              style={[styles.Button, styles.buttonCancelar]} 
              onPress={aoFechar}
            >
              <Text style={[styles.ButtonText, styles.buttonCancelarText]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.Button, styles.buttonConfirmar]} 
              onPress={aoConfirmar}
            >
              <Text style={styles.ButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF", 
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 380,
    height: 250,
    padding: 34,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardIcon: {
    alignItems: "center",
    gap: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#1E293B",
  },
  cardButton: {
    flexDirection: "row",
    gap: 25,
  }, 
  Button: {
    flex: 1, 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonConfirmar: {
    backgroundColor: "#2563EB",
  },
  buttonCancelar: {
    backgroundColor: "#F1F5F9", 
  },
  ButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonCancelarText: {
    color: "#64748B", 
  }
});