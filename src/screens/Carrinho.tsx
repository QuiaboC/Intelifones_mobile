import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { ChevronLeft, ShoppingCart, Trash } from "lucide-react-native";
import { styles } from "../../styles/carrinho";

export default function Carrinho({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={30} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Carrinho</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.containerCarrinho}>
          <View style={styles.iconContainer}>
            <ShoppingCart size={34} color="#2563EB" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.titulo}>Seu carrinho está fazio</Text>
            <Text style={styles.subtitulo}>Adicione produtos para começar</Text>
          </View>
        </View>

        {[1, 2].map((item) => (
          <View key={item} style={styles.produtoCarrinho}>
            <View style={styles.containerImagem}>
              <Image
                source={require("../../assets/vetorHome.png")}
                style={styles.imagem}
              />
            </View>

            <View style={styles.containerText}>
              <Text style={styles.tituloProduto} numberOfLines={2}>
                Nome do produto
              </Text>
              <Text style={styles.descricao}>Descrição do produto</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Novo</Text>
              </View>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.deleteButton}>
                <Trash size={20} color="#EF4444" />
              </TouchableOpacity>

              <Text style={styles.preco}>R$ 50,00</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
