import type { DemoProduct } from "./types";

export const featuredProducts = [
  { id: "demo-001", name: "Tai nghe không dây", category: "Tai nghe", priceVnd: 590000, description: "Tai nghe chụp tai cho góc làm việc." },
  { id: "demo-002", name: "Bàn phím cơ compact", category: "Bàn phím", priceVnd: 890000, description: "Bố cục gọn cho bàn làm việc nhỏ." },
  { id: "demo-003", name: "Chuột không dây", category: "Chuột", priceVnd: 350000, description: "Thiết kế gọn để mang theo laptop." },
  { id: "demo-004", name: "Hub USB-C", category: "Phụ kiện", priceVnd: 450000, description: "Phụ kiện mở rộng kết nối trên bàn làm việc." },
] as const satisfies readonly DemoProduct[];
