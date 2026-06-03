import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditarUsuario({navigation}){

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpfCnpj: "",
        senha: "",
        ativo: "",
    });

    const handleChange = (campo, valor) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <ChevronLeft size={30} color="#fff" />
                    </TouchableOpacity>
            
                    <Text style={styles.headerTitulo}>Informações de perfil</Text>
                  </View>
        <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
              >
                <View style={styles.card}>
                    <View><View style={styles.containerTitulo}>
                    <Text style={styles.nome}>Verifique seus dados</Text>
        
                    <Text style={styles.subtitulo}>
                      Atualize as informações do seu Perfil.
                    </Text>
                  </View>
        
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Nome de usuario</Text>
        
                    <TextInput
                      placeholder="Nome"
                      placeholderTextColor="#64748B"
                      style={styles.input}
                      value={form.nome}
                      onChangeText={(text) => handleChange("nome", text)}
                    />
                  </View>
        
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>telefone</Text>
        
                    <TextInput
                      placeholder="telefone"
                      placeholderTextColor="#64748B"
                      keyboardType="numeric"
                      style={styles.input}
                      value={String(form.telefone)}
                      onChangeText={(text) => handleChange("telefone", text)}
                    />
                  </View>
        
                  <View style={styles.containerInput}>
                    <Text style={styles.label}>Cnpj</Text>
        
                    <TextInput
                      placeholder="Cpnj"
                      placeholderTextColor="#64748B"
                      style={styles.input}
                      value={form.cpfCnpj}
                      onChangeText={(text) => handleChange("cpfCnpj", text)}
                    />
                  </View></View>
                  
        
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }
        
        const styles = StyleSheet.create({
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
            flex: 1,
          },
        
          card: {
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 18,
            flexDirection: "column",
            justifyContent: "space-between",
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
            gap: 10,
            marginBottom: 20,
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