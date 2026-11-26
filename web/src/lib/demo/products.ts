import type { Product } from "../catalog/product";
import { demoProducts } from "./products.fixture";

// Kịch bản thử giao diện, chỉ đọc ở đây (không có trong page hay URL). Đặt tạm trong phiên terminal, ví dụ:
//   $env:J7_DEMO_SCENARIO="empty"; npm.cmd --prefix web run dev
//   slow  = chờ 2 giây rồi trả dữ liệu (thử trạng thái đang tải)
//   empty = trả danh sách rỗng
//   error = ném lỗi (thử error.tsx)
export async function loadDemoProducts(): Promise<readonly Product[]> {
  const scenario = process.env.J7_DEMO_SCENARIO;

  if (scenario === "slow") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  if (scenario === "error") {
    throw new Error("DEMO_UNAVAILABLE");
  }

  if (scenario === "empty") {
    return [];
  }

  return demoProducts;
}
