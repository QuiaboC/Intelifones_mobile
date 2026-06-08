import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
  },

  ContainerText: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 20,
  },

  logo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  containerTitulo: {
    gap: 7,
  },
  titulo:{
    fontSize: 22,
    color: "#2563EB",
    fontWeight: "bold"
  },
  subtitulo: {
    fontSize: 17,
    color: "#475569",
    marginBottom: 10,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    width: "100%",
    gap: 25,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 24,
    paddingVertical: 30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 20,
  },

  containerInput: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 14,
  },
  esqueceuSenha: {
    color: "#2563EB",
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  containerButton: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  textFooter: {
    color: "#475569",
    fontSize: 14,
  },
  cadastroText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
});
