import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#B91C1C" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Mangkoku" }} />
        <Stack.Screen name="menu/[id]" options={{ title: "Detail Menu" }} />
        <Stack.Screen name="keranjang" options={{ title: "Keranjang" }} />
        <Stack.Screen name="resep/index" options={{ title: "Resep Inspirasi" }} />
        <Stack.Screen name="resep/[id]" options={{ title: "Detail Resep" }} />
      </Stack>
    </CartProvider>
  );
}