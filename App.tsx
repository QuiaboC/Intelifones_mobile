import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/home";
import Login from "./src/screens/login";
import Registro from "./src/screens/registro";
import Preview from "./src/screens/preview";
import Produtos from "./src/screens/Produtos";
import Carrinho from "./src/screens/Carrinho";
import Perfil from "./src/screens/Perfil";
import Vendas from "./src/screens/Vendas";
import Compras from "./src/screens/Compras";
import Detalhes from "./src/screens/Detalhes";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#2563EB" translucent={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Preview"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registro" component={Registro} />
          <Stack.Screen name="Preview" component={Preview} />
          <Stack.Screen name="Produtos" component={Produtos} />
          <Stack.Screen name="Carrinho" component={Carrinho}/>
          <Stack.Screen name="Perfil" component={Perfil}/>
          <Stack.Screen name="Vendas" component={Vendas}/>
          <Stack.Screen name="Compras" component={Compras}/>
          <Stack.Screen name="Detalhes" component={Detalhes}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
