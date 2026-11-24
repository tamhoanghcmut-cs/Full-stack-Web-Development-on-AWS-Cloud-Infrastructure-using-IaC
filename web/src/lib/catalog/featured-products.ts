import type { ProductSummary } from "./product-summary";

type FeaturedCatalog = {
  products: readonly ProductSummary[];
  source: "fixture" | "catalog";
};

// TODO(API-02, owner=Nhật): Nối service đọc catalog ở nhánh production.
// Nghiệm thu: Chỉ trả sản phẩm active theo thứ tự ổn định, giá nguyên VND và ID thật.
export async function getFeaturedProducts(): Promise<FeaturedCatalog> {
  if (process.env.NODE_ENV === "development") {
    const { featuredProducts } = await import("../demo/featured-products.fixture");

    return {
      products: featuredProducts.map((product) => ({ ...product, image: null })),
      source: "fixture",
    };
  }

  return { products: [], source: "catalog" };
}
