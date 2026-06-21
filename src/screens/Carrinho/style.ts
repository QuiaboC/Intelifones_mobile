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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },

  iconContainer: {
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#E2E8F0",
  },

  textContainer: {
    flex: 1,
    gap: 4,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2563EB",
  },

  subtitulo: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    gap: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  qtyButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginTop: 4,
  },

  deleteButton: {
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 10,
  },

  header: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    backgroundColor: "#2563EB",
    gap: 10,
  },
  
  headerTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffff",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    padding: 12,
    backgroundColor: "#fff",
    gap: 12,
  },

  totalContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 4,
  },
  totalTexto: {
    marginTop: 6,
    color: "#16A34A",
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonFinalizar: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonFinalizarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  containerFiltro: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 5,
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
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
