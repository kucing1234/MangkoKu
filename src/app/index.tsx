import { Ionicons } from "@expo/vector-icons";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// ===== TYPE & INTERFACE =====
type MenuType = "bakso" | "minuman" | "tambahan";

interface MenuItem {
  readonly id: string;
  name: string;
  price: number;
  type?: MenuType;
  isAvailable: boolean;
}

// ===== ARRAY OF OBJECTS =====
const menus: MenuItem[] = [
  { id: "1", name: "Bakso Urat", price: 15000, type: "bakso", isAvailable: true },
  { id: "2", name: "Bakso Beranak", price: 20000, type: "bakso", isAvailable: true },
  { id: "3", name: "Bakso Mercon", price: 18000, type: "bakso", isAvailable: false },
  { id: "4", name: "Bakso Tlogomas", price: 17000, type: "bakso", isAvailable: true },
  { id: "5", name: "Es Teh Manis", price: 5000, type: "minuman", isAvailable: true },
  { id: "6", name: "Es Jeruk", price: 6000, type: "minuman", isAvailable: true },
  { id: "7", name: "Tahu Bakso", price: 3000, type: "tambahan", isAvailable: true },
  { id: "8", name: "Kerupuk", price: 2000, type: "tambahan", isAvailable: false },
];

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
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type ?? "menu"}</Text>
          {/* Inline style dinamis */}
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

        {/* Ternary: tombol atau label habis */}
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

// ===== STYLESHEET =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#B91C1C",
    marginTop: 6,
  },
  tagline: {
    fontSize: 14,
    color: "#7C2D12",
    marginTop: 2,
  },
  summary: {
    fontSize: 13,
    color: "#431407",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#431407",
  },
  type: {
    fontSize: 12,
    color: "#9A3412",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#EA580C",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 4,
  },
});