import { createContext, ReactNode, useContext, useState } from "react";
import { MenuItem } from "../types/menu";

export interface CartItem {
  item: MenuItem;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: MenuItem, qty?: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // State keranjang: kalau berubah, semua layar yang memakainya ikut render ulang
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...prev, { item, qty }];
    });
  };

  const clearCart = () => setCart([]);

  let totalItems = 0;
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItems += cart[i].qty;
    totalPrice += cart[i].qty * cart[i].item.price;
  }

  return (
    <CartContext.Provider
      value={{ cart, totalItems, totalPrice, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }
  return ctx;
}