import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";
import { menus } from "../data/menus";
import { MenuItem } from "../types/menu";

export default function Index() {
  // Loop primitif: hitung menu yang tersedia
  let availableCount = 0;
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].isAvailable) {
      availableCount++;
    }
  }

  // Function bawaan (Alert) dibungkus function custom
  const handleOrder = (item: MenuItem) => {
    Alert.alert("Pesanan Masuk", `${item.name} berhasil dipesan!`);
  };

  // Function custom: membuat kartu menu dari satu data
  const renderMenuCard = (item: MenuItem) => {
    return (
      <View style={styles.card}>
        {/* Gambar menu, kalau kosong pakai gambar pengganti */}
        <Image
          source={{ uri: item.image ?? "https://picsum.photos/200" }}
          style={[styles.foto, { opacity: item.isAvailable ? 1 : 0.4 }]}
        />

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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="restaurant" size={48} color="#B91C1C" />
        <Text style={styles.title}>Mangkoku</Text>
        <Text style={styles.tagline}>Semangkok hangat, setiap hari.</Text>
        <Text style={styles.summary}>
          {availableCount} dari {menus.length} menu tersedia hari ini
        </Text>
      </View>

      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderMenuCard(item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}