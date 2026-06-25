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

  scroll: {
    padding: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
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
  inputImage: {
    height: 250,
    borderWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderStyle: "dashed",
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  textArea: {
    minHeight: 100,
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
