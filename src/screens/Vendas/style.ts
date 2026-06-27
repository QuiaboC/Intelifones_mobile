import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  containerFiltro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 5,
    marginBottom: 10,
  },

  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
  },
});