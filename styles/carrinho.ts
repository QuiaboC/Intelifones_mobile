import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  scroll: {
    padding: 10,
    paddingBottom: 30,
    gap: 10,
  },

  containerCarrinho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 5,
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },

  subtitulo: {
    fontSize: 14,
    color: "#64748B",
  },

  produtoCarrinho: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 5,
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
    gap: 6,
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

  containerButton: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 10,
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: "row",
    backgroundColor: "#2563EB",
    gap: 10,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffff",
  }
});
