export type DemoCategory = "Tai nghe" | "Bàn phím" | "Chuột" | "Phụ kiện";

export type DemoProduct = {
  id: string;
  name: string;
  category: DemoCategory;
  priceVnd: number;
  description: string;
};

export type FeaturedProductsResponse = {
  data: readonly DemoProduct[];
  source: "demo";
};
