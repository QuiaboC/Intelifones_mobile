import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { ShoppingCart, Trash } from "lucide-react-native";
import Footer from "../components/Footer";

export default function Carrinho(){
    return(
         <SafeAreaView style={styles.container}>
            <Header/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.containerCarrinho}>
                    <ShoppingCart size={35} color="#2563EB"/>
                    <View ><Text style={styles.titulo}>Seu Carrinho está vazio</Text>
                    <Text style={styles.subtitulo}>Adicione produtos para começar</Text></View>
            </View>
            <View style={styles.produtoCarrinho}>
                <View style={styles.containerImagem}><Image
                                source={require("../../assets/vetorHome.png")}
                                style={styles.imagem}
                              /></View>
                    
                    <View style={styles.containerText}><Text style={styles.tituloProduto}>Nome do produto</Text>
                    <Text style={styles.subtitulo}>Descrição do produto</Text>
                    <Text>Novo</Text></View>
                    <View style={styles.containerButton}><TouchableOpacity><Trash color="red"/></TouchableOpacity><Text>R$ 50.00</Text></View>
            </View>
            </ScrollView>
            <Footer/>
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F5F9",
    }, 
    containerCarrinho: {
        padding: 25,
        gap: 25,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#ffff",
        alignItems: "center",
    },
    titulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563EB",
    },
    subtitulo: {
        fontWeight: "400"
    },
    produtoCarrinho:{
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        gap: 10,
        backgroundColor: "#ffff",

    },
    containerImagem: {
        backgroundColor: "#F1F5F9",
    },
    imagem: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    containerText:{
        flex: 1,
        gap: 2,
    },
    tituloProduto: {
        fontSize: 15,
        fontWeight: "700",
    },
    containerButton: {
        alignItems: "center",
        gap: 2,
    }
})