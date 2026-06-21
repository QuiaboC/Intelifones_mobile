import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
  },
  ContainerText: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 18,
  },
  scroll: {
    flex: 1,
  },
  logo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
  flexGrow: 1,
  width: "100%",
  backgroundColor: "#F1F5F9",
  paddingHorizontal: 24,
  paddingTop: 28,
  paddingBottom: 20,
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  marginTop: 15,
  gap: 18,
},
  containerTitulo: {
    gap: 6,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 24,
    color: "#2563EB",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
    lineHeight: 22,
  },
  containerInput: {
    gap: 7,
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
    color: "#0F172A",
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
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },
  textFooter: {
    color: "#475569",
    fontSize: 14,
  },
  loginText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
  pickerContainer: {
  backgroundColor: "#fff",
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  overflow: "hidden",
},

picker: {
  color: "#0F172A",
},
});
