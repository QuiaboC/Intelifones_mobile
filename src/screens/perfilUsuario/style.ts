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
  containerPerfil: {
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  containerImagem: {
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    padding: 10,
    marginBottom: 12,
  },
  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  nomePerfil: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  textPerfil: {
    color: "#DBEAFE",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  scroll: {
    padding: 12,
    paddingBottom: 30,
    gap: 14,
  },
  cardOpcao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
});
