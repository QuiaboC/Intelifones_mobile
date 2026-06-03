import { ChevronLeft, Search } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FiltroBuscar({navigation}){
    return(
        <SafeAreaView style ={style.container}>
            <View style = {style.inputContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}><ChevronLeft size={20}/></TouchableOpacity>
                <TextInput placeholder="Buscar no Intelifones" style = {style.input}/>
            </View>
            <ScrollView style = {style.scroll}>
                <TouchableOpacity style = {style.produto}>
                    <Search size={20}/>
                    <Text>Nome do produto</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        padding: 10,
        flexDirection: "row",
        gap: 20,
        borderBottomWidth: 1,
        borderColor: "#0F172A",
        alignItems: "center",
    },
    input: {
        flex: 1,
        padding: 5,
    },
    scroll: {
        flex: 1
    },
    produto: {
        padding: 15,
        flexDirection: "row",
        gap: 20,
        alignItems:"center"
    }
})