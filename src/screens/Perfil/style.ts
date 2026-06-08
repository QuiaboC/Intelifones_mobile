import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  scroll: {
    padding: 12,
    paddingBottom: 30,
    gap: 14,
  },

  containerPerfil: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 20,
    backgroundColor: "#2563EB",
  },

  ContainerImagem: {
    backgroundColor: "#DBEAFE",
    borderRadius: 999,
    padding: 10,
  },

  imagem: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },

  infoPerfil: {
    flex: 1,
    gap: 6,
  },

  NomePerfil: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  buttonPerfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  textPerfil: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  divulgar: {
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#2563EB",
  },

  post: {
    backgroundColor: "#fff",
    padding: 11,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  postText: {
    flex: 1,
    marginRight: 12,
    gap: 4,
  },

  postTitulo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  postSubtitulo: {
    fontSize: 13,
    color: "#64748B",
  },

  postButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  cardOpcao: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  logoutButton: {
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 15,
  },
  categoriaTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 10,
    marginBottom: 2,
  },
});
