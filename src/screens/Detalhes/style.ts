import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#2563EB",
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
  },
  scroll: {
    paddingBottom: 30,
  },
  containerImagem: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagem: {
    width: "85%",
    height: 220,
    resizeMode: "contain",
  },
  containerInfo: {
    paddingHorizontal: 20,
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },
  descricao: {
    fontSize: 14,
    lineHeight: 22,
    color: "#64748B",
  },
  containerPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  preco: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563EB",
  },
  badge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    color: "#10B981",
    fontWeight: "600",
    fontSize: 13,
  },
  containerButtons: {
    paddingHorizontal: 20,
    marginTop: 25,
    gap: 12,
  },
  buttonPrincipal: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonPrincipalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecundario: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonSecundarioText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },
  containerTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});