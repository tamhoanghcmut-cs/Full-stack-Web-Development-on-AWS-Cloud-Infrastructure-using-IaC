import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, OrderStatus } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
async function main() {
  const customer = await prisma.customer.upsert({
    where: { email: "khachhang.demo@j7.local" },
    update: {},
    create: {
      fullName: "Nguyễn Văn Khách",
      email: "khachhang.demo@j7.local",
      passwordHash: "demo_hash_customer_123",
      phone: "0901234567",
      address: "123 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    },
  });

  const staff = await prisma.staff.upsert({
    where: { email: "nhanvien.demo@j7.local" },
    update: {},
    create: {
      fullName: "Trần Thị Nhân Viên",
      email: "nhanvien.demo@j7.local",
      passwordHash: "demo_hash_staff_123",
      phone: "0909876543",
      department: "Vận hành đơn hàng",
      position: "Nhân viên xử lý đơn",
      role: "STAFF",
    },
  });

  const p1 = await prisma.product.upsert({
    where: { id: "prod-j7-mouse-01" },
    update: {},
    create: {
      id: "prod-j7-mouse-01",
      name: "Chuột không dây J7 Pro Wireless",
      description: "Chuột công thái học kết nối 2.4GHz & Bluetooth, pin sạc USB-C.",
      priceVnd: 450000,
      stock: 25,
      imageUrl: "/images/mouse-pro.png",
    },
  });

  const p2 = await prisma.product.upsert({
    where: { id: "prod-j7-keyb-02" },
    update: {},
    create: {
      id: "prod-j7-keyb-02",
      name: "Bàn phím cơ J7 Mechanical 75%",
      description: "Switch tactile êm ái, hot-swap, keycap PBT bền bỉ.",
      priceVnd: 1290000,
      stock: 15,
      imageUrl: "/images/keyboard-75.png",
    },
  });

  const p3 = await prisma.product.upsert({
    where: { id: "prod-j7-hub-03" },
    update: {},
    create: {
      id: "prod-j7-hub-03",
      name: "Hub USB-C 7-in-1 J7 Dock",
      description: "Hỗ trợ HDMI 4K, PD 100W, 3x USB-A, khe thẻ SD/TF.",
      priceVnd: 680000,
      stock: 30,
      imageUrl: "/images/usbc-hub.png",
    },
  });

  const orderId = "order-j7-demo-001";
  const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });

  if (!existingOrder) {
    const qty1 = 1;
    const qty2 = 1;
    const totalVnd = p1.priceVnd * qty1 + p3.priceVnd * qty2;

    await prisma.order.create({
      data: {
        id: orderId,
        totalVnd,
        paymentMethod: "COD",
        status: OrderStatus.PENDING,
        customerId: customer.id,
        staffId: staff.id,
        items: {
          create: [
            {
              productId: p1.id,
              quantity: qty1,
              unitPriceVnd: p1.priceVnd,
            },
            {
              productId: p3.id,
              quantity: qty2,
              unitPriceVnd: p3.priceVnd,
            },
          ],
        },
      },
    });
  }

  console.log("Seed hoàn tất:", {
    customerEmail: customer.email,
    staffEmail: staff.email,
    products: [p1.name, p2.name, p3.name],
    orderId,
  });
}

main()
  .catch((e) => {
    console.error("Lỗi khi chạy seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });