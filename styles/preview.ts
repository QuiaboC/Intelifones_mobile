import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: "center",
    marginTop: 10,
  },
  imagem: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  descricao: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#E2E8F0",
    fontWeight: "400",
    paddingHorizontal: 10,
  },
  buttons: {
    width: "100%",
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonPrimaryText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
