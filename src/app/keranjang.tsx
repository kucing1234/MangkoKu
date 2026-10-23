import { useRouter } from "expo-router";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";
import { useCart } from "../context/CartContext";

export default function Keranjang() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert("Pesanan Masuk", "Pesananmu sedang disiapkan!");
    clearCart();
    // replace: mengganti halaman, jadi tidak bisa kembali ke keranjang
    router.replace("/");
  };

  return (
    <View style={styles.detailContainer}>
      {cart.length === 0 ? (
        <Text style={styles.type}>Keranjang masih kosong.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(c) => c.item.id}
            renderItem={({ item: c }) => (
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{c.item.name}</Text>
                  <Text style={styles.type}>
                    {c.qty} x Rp {c.item.price.toLocaleString("id-ID")}
                  </Text>
                </View>
                <Text style={styles.name}>
                  Rp {(c.qty * c.item.price).toLocaleString("id-ID")}
                </Text>
              </View>
            )}
          />
          <Text style={styles.totalText}>
            Total: Rp {totalPrice.toLocaleString("id-ID")}
          </Text>
          <Pressable style={styles.bigButton} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Pesan Sekarang</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={[styles.bigButton, { backgroundColor: "#6B7280" }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </Pressable>
    </View>
  );
}