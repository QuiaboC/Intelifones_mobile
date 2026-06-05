import { View,StyleSheet } from "react-native";
import FiltroCategoria from "../components/FiltroCategoria";

export default function Teste(){
    return(
        <View style={styles.container}>
            <FiltroCategoria/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});