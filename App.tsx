import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/home";
import Login from "./src/screens/login";
import Registro from "./src/screens/registro";
import Preview from "./src/screens/preview";
import Produtos from "./src/screens/Produtos";
import Carrinho from "./src/screens/Carrinho";
import Perfil from "./src/screens/Perfil";
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
