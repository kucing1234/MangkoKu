import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../constants/styles";
import { useCart } from "../../context/CartContext";
import { menus } from "../../data/menus";

export default function MenuDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  // useState: jumlah porsi yang akan dipesan
  const [qty, setQty] = useState(1);

  const item = menus.find((m) => m.id === id);

  if (!item) {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailName}>Menu tidak ditemukan</Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailName}>{item.name}</Text>
      <Text style={styles.type}>{item.type ?? "menu"}</Text>
      <Text style={styles.detailPrice}>
        Rp {item.price.toLocaleString("id-ID")}
      </Text>

      {item.isAvailable ? (
        <>
          <View style={styles.qtyRow}>
            <Pressable
              style={styles.qtyButton}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.qtyText}>{qty}</Text>
            <Pressable style={styles.qtyButton} onPress={() => setQty(qty + 1)}>
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.bigButton}
            onPress={() => {
              addToCart(item, qty);
              router.push("/keranjang");
            }}
          >
            <Text style={styles.buttonText}>Tambah ke Keranjang</Text>
          </Pressable>
        </>
      ) : (
        <Text style={{ color: "#DC2626", fontWeight: "bold", marginTop: 16 }}>
          Menu ini sedang habis
        </Text>
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