import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },

  scroll: {
    flex: 1,
  },

  produto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  textoProduto: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "500",
  },

  semResultado: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  semResultadoTexto: {
    color: "#64748B",
    fontSize: 15,
  },
});
