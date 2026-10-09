export type MenuType = "bakso" | "minuman" | "tambahan";

export interface MenuItem {
  readonly id: string;
  name: string;
  price: number;
  type?: MenuType; // tanda "?" = opsional
  isAvailable: boolean;
}