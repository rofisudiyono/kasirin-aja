export type TambahProdukCategory = "Makanan" | "Minuman" | "Snack" | "";

export interface TambahProdukVariantOption {
  name: string;
  price: string;
}

export interface TambahProdukVariantGroup {
  name: string;
  values: TambahProdukVariantOption[];
}
