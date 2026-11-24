export type ProductCategory = "Tai nghe" | "Bàn phím" | "Chuột" | "Phụ kiện";

export type ProductSummary = {
  id: string;
  name: string;
  description: string;
  priceVnd: number;
  category: ProductCategory | null;
  image: { src: string; alt: string } | null;
};
