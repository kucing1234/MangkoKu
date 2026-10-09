import { MenuItem } from "../types/menu";

export const menus: MenuItem[] = [
  { id: "1", name: "Bakso Urat", price: 15000, type: "bakso", isAvailable: true },
  { id: "2", name: "Bakso Beranak", price: 20000, type: "bakso", isAvailable: true },
  { id: "3", name: "Bakso Mercon", price: 18000, type: "bakso", isAvailable: false },
  { id: "4", name: "Bakso Tlogomas", price: 17000, type: "bakso", isAvailable: true },
  { id: "5", name: "Es Teh Manis", price: 5000, type: "minuman", isAvailable: true },
  { id: "6", name: "Es Jeruk", price: 6000, type: "minuman", isAvailable: true },
  { id: "7", name: "Tahu Bakso", price: 3000, type: "tambahan", isAvailable: true },
  { id: "8", name: "Kerupuk", price: 2000, type: "tambahan", isAvailable: false },
];