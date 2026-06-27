import { View,StyleSheet } from "react-native";
import ButtonSelect from "../components/ButtonSelect";


export default function Teste(){
    return(
        <View style={styles.container}>
            <ButtonSelect/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});