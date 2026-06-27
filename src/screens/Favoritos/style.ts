import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
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

  scroll: {
    padding: 12,
    paddingBottom: 30,
  },

  produtos: {
    gap: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  imagem: {
    width: 70,
    height: 70,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: "#F8FAFC",
  },

  info: {
    flex: 1,
    gap: 4,
  },

  nome: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
  },

  preco: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2563EB",
  },

  vazioContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 12,
  },
  iconeVazio: {
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#E2E8F0",
  },
  vazio: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  vazioDescricao: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },
  botoes: {
    flexDirection: "row",
    gap: 20,
  },
  botaoVerMais: {
    paddingVertical: 6,
  },
  botaoVerMaisText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "bold",
  },
  precoContainer: {
    alignItems: "center",
    height: "100%",
    gap: 4,
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
});
