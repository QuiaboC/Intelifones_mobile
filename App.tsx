import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/login";
import Registro from "./src/screens/Registro/registro";
import Preview from "./src/screens/Preview/preview";
import Produtos from "./src/screens/Produtos/Produtos";
import Carrinho from "./src/screens/Carrinho/Carrinho";
import Perfil from "./src/screens/Perfil/Perfil";
import Vendas from "./src/screens/Vendas/Vendas";
import Compras from "./src/screens/Compras/Compras";
import Detalhes from "./src/screens/Detalhes/Detalhes";
import Cadastro from "./src/screens/Cadastro/Cadastro";
import Editar from "./src/screens/Editar/Editar";
import PerfilUsuario from "./src/screens/perfilUsuario/PerfilUsuario";
import EditarUsuario from "./src/screens/EditarUsuario/EditarUsuario";
import FiltroBuscar from "./src/screens/FiltroBuscar/FiltroBuscar";
import Teste from "./src/screens/Teste";
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
          <Stack.Screen name="Carrinho" component={Carrinho} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Vendas" component={Vendas} />
          <Stack.Screen name="Compras" component={Compras} />
          <Stack.Screen name="Detalhes" component={Detalhes} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Editar" component={Editar} />
          <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
          <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
          <Stack.Screen name="FiltroBuscar" component={FiltroBuscar} />
          <Stack.Screen name="Teste" component={Teste} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
