import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  body: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  heroImage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  imagem: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  anuncio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 14,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "#E2E8F0",
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 13,
  },
});
