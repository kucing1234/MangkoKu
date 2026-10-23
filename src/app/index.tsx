import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import {
  Alert,
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
=======
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
>>>>>>> 524a40a52c2ac0fdff933662e91fa78316f17120
import { styles } from "../constants/styles";
import { useCart } from "../context/CartContext";
import { menus } from "../data/menus";
import { MenuItem, MenuType } from "../types/menu";

const LOGO_URL =
  "https://img.magnific.com/premium-vector/bakso-indonesian-meatball-bowl-hand-drawn-logo_513640-1467.jpg?w=2000";

type Filter = "semua" | MenuType;
const filters: Filter[] = ["semua", "bakso", "minuman", "tambahan"];

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation();
  const { addToCart, totalItems } = useCart();

  // useState: kategori yang sedang dipilih
  const [filter, setFilter] = useState<Filter>("semua");

  // useEffect: judul header ikut berubah saat jumlah keranjang berubah
  useEffect(() => {
    navigation.setOptions({
      title: totalItems > 0 ? `Mangkoku (${totalItems})` : "Mangkoku",
    });
  }, [totalItems, navigation]);

  // Loop primitif: hitung menu yang tersedia
  let availableCount = 0;
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].isAvailable) {
      availableCount++;
    }
  }

<<<<<<< HEAD
  // Function bawaan (Alert) dibungkus function custom
  // Di web pakai window.alert, di HP/emulator pakai Alert bawaan React Native
  const handleOrder = (item: MenuItem) => {
    const message = `${item.name} berhasil dipesan!`;
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert("Pesanan Masuk", message);
    }
=======
  const shownMenus =
    filter === "semua" ? menus : menus.filter((m) => m.type === filter);

  const handleOrder = (item: MenuItem) => {
    addToCart(item);
>>>>>>> 524a40a52c2ac0fdff933662e91fa78316f17120
  };

  // Function custom: membuat kartu menu dari satu data
  const renderMenuCard = (item: MenuItem) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/menu/${item.id}`)}
      >
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type ?? "menu"}</Text>
          {/* Inline style dinamis: warna harga sesuai ketersediaan */}
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 6,
              color: item.isAvailable ? "#15803D" : "#9CA3AF",
              textDecorationLine: item.isAvailable ? "none" : "line-through",
            }}
          >
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
        </View>

        {/* Ternary: tombol pesan atau label habis */}
        {item.isAvailable ? (
          <Pressable style={styles.button} onPress={() => handleOrder(item)}>
            <Ionicons name="add-circle" size={18} color="white" />
            <Text style={styles.buttonText}>Pesan</Text>
          </Pressable>
        ) : (
          <Text style={{ color: "#DC2626", fontWeight: "bold" }}>Habis</Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: LOGO_URL }} style={styles.logo} />
        <Text style={styles.title}>Mangkoku</Text>
        <Text style={styles.tagline}>Semangkok hangat, setiap hari.</Text>
        <Text style={styles.summary}>
          {availableCount} dari {menus.length} menu tersedia hari ini
        </Text>
      </View>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, filter === f && styles.chipTextActive]}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={shownMenus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderMenuCard(item)}
        showsVerticalScrollIndicator={false}
      />

      {totalItems > 0 && (
        <Pressable
          style={styles.cartBar}
          onPress={() => router.push("/keranjang")}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.cartBarText}>
            Lihat Keranjang ({totalItems} item)
          </Text>
        </Pressable>
      )}
    </View>
  );
}