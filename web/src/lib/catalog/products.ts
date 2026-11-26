import type { Product } from "./product";

// Quy ước giá trị trả về:
//   getProducts()    -> [] là rỗng; ném lỗi (throw) là lỗi, do app/products/error.tsx xử lý.
//   getProductById() -> null là không tìm thấy (trang gọi notFound()); ném lỗi là lỗi.
//
// TODO(API-02, owner=Nhật): Nối service đọc catalog ở nhánh production. Nghiệm thu: Chỉ trả sản phẩm active, giá nguyên VND và ID thật; 404 thành null, 5xx thành throw.
// TODO(WEB-02B, owner=Phát): Khi nối API thật, đổi /products sang render động (hoặc revalidate). Hiện trang được prerender tĩnh lúc build nên danh sách thật sẽ bị đóng băng.
export async function getProducts(): Promise<readonly Product[]> {
  if (process.env.NODE_ENV === "development") {
    const { loadDemoProducts } = await import("../demo/products");

    return loadDemoProducts();
  }

  return [];
}

export async function getProductById(id: string): Promise<Product | null> {
  if (process.env.NODE_ENV === "development") {
    const { loadDemoProducts } = await import("../demo/products");
    const products = await loadDemoProducts();

    return products.find((product) => product.id === id) ?? null;
  }

  return null;
}
