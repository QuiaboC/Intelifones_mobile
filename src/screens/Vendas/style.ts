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
    padding: 15,
  },

  filtro: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  scroll: {
    padding: 10,
    paddingBottom: 10,
  },

  produtoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    gap: 12,
  },

  containerImagem: {
    backgroundColor: "#F8FAFC",
    padding: 10,
    borderRadius: 14,
  },

  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },

  containerText: {
    flex: 1,
    gap: 5,
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

  badge: {
    backgroundColor: "#DCFCE7",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "600",
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 4,
  },

  containerButton: {
    gap: 10,
  },

  editButton: {
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 10,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 10,
  },
});