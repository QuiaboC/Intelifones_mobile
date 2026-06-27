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
    elevation: 2,
  },

  containerImagem: {
    width: 80,
    height: 80,
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
  badgeConteudo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  containerAcoes: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  buttonSecundario: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonSecundarioText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 13,
  },

  buttonPrincipal: {
    flex: 1,
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonPrincipalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  badgePreco:{
    alignItems: "flex-end"
  }
});
