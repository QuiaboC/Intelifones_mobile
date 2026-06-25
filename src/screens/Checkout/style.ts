import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
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
    padding: 10,
    gap: 10,
    flex: 1,
  },
  containerTitulo: {
    marginBottom: 20,
    gap: 5,
  },
  nome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },
  subtitulo: {
    fontSize: 15,
    color: "#64748B",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerInput: {
    gap: 6,
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: "#0F172A",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
