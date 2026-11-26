import type { Product } from "../catalog/product";

// Ảnh minh họa SVG nhúng sẵn (data URI) để thử đường <img> mà không cần máy chủ ảnh hay thư mục public/.
function placeholderImage(hexColor: string): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect width='4' height='3' fill='%23${hexColor}'/%3E%3C/svg%3E`;
}

// Dữ liệu giả cho /products, chỉ dùng khi NODE_ENV === "development".
// demo-001..004 trùng id/name/description/priceVnd với fixture trang chủ để link từ trang chủ không gãy.
export const demoProducts = [
  { id: "demo-001", name: "Tai nghe không dây", description: "Tai nghe chụp tai cho góc làm việc.", priceVnd: 590000, stockQuantity: 25, imageUrl: placeholderImage("e8e5ff") },
  { id: "demo-002", name: "Bàn phím cơ compact", description: "Bố cục gọn cho bàn làm việc nhỏ.", priceVnd: 890000, stockQuantity: 12, imageUrl: placeholderImage("d9fa75") },
  { id: "demo-003", name: "Chuột không dây", description: "Thiết kế gọn để mang theo laptop.", priceVnd: 350000, stockQuantity: 40, imageUrl: placeholderImage("ffe3d6") },
  { id: "demo-004", name: "Hub USB-C", description: "Phụ kiện mở rộng kết nối trên bàn làm việc.", priceVnd: 450000, stockQuantity: 8, imageUrl: placeholderImage("d6f0ff") },
  // Hết hàng: vẫn hiển thị kèm nhãn "Hết hàng".
  { id: "demo-005", name: "Webcam Full HD", description: "Webcam 1080p cho học và họp trực tuyến.", priceVnd: 720000, stockQuantity: 0, imageUrl: placeholderImage("f5d6ff") },
  // Không có ảnh: hiển thị "Chưa có ảnh".
  { id: "demo-006", name: "Giá đỡ laptop nhôm", description: "Giá đỡ nâng màn hình laptop lên tầm mắt.", priceVnd: 280000, stockQuantity: 15, imageUrl: null },
] as const satisfies readonly Product[];
