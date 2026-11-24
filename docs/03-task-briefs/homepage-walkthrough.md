# Trang chủ J7 Retail

Trang chủ `/` là giao diện chính của J7. Các phần đã triển khai gồm điều hướng desktop và mobile, hero, danh mục, khu vực sản phẩm nổi bật, lợi ích cửa hàng và footer. Chạy `npm.cmd --prefix web run dev` từ thư mục gốc rồi mở `http://localhost:3000`. Trang hoạt động khi chưa có PostgreSQL.

## Cấu trúc và luồng render

| Tệp | Vai trò |
|---|---|
| `web/src/app/page.tsx` | Server Component bố cục trang, metadata và Suspense riêng cho sản phẩm. |
| `web/src/components/home/Header.tsx` | Điều hướng bằng Next Link và menu mobile dùng `details`/`summary`. |
| `HeroSection.tsx`, `CategorySection.tsx`, `Footer.tsx` | Nội dung bán lẻ, minh họa CSS, lối tắt tới sản phẩm và liên kết trang. |
| `FeaturedProducts.tsx` | Server Component gọi lớp dữ liệu, hiển thị danh sách, empty hoặc thông báo lỗi. |
| `ProductCard.tsx`, `DeviceArt.tsx` | Render ảnh hoặc minh họa có nhãn, giá VND và link chi tiết theo ID. |
| `home.module.css` | Bố cục responsive và focus bàn phím. |
| `web/src/lib/catalog/featured-products.ts` | Điểm tích hợp nguồn dữ liệu. |
| `web/src/lib/catalog/product-summary.ts` | View model dùng chung cho card và lớp dữ liệu. |

`GET /` → `page.tsx` → `FeaturedProducts` → `getFeaturedProducts()` → nguồn dữ liệu → `ProductCard`.

Next.js render trang trên server. Suspense cung cấp thông báo tải khi nguồn dữ liệu chưa trả kết quả. Nếu lỗi đọc, section sản phẩm hiện thông báo trong khi phần còn lại của trang vẫn dùng được. Homepage lấy dữ liệu bằng lời gọi hàm, không gửi HTTP nội bộ hay yêu cầu một bước fetch từ browser.

## Dữ liệu hiện tại

- `next dev` đọc fixture trong `web/src/lib/demo/featured-products.fixture.ts`. Giá và sản phẩm có nhãn minh họa. Link dùng route hiện có `/products/[id]`, nơi chi tiết vẫn đang phát triển.
- `next build` và `next start` hiển thị trạng thái rỗng khi chưa có nguồn thật. Bản production không hiển thị sản phẩm hay giá từ fixture.
- `GET /api/demo/featured-products` là tiện ích giảng dạy độc lập, chỉ chạy ở dev và trả `404` trong production. API sản phẩm và đơn hàng hiện vẫn là placeholder `501`.

## Tích hợp catalog thật

1. **Nhật · API-01/API-02** triển khai Prisma và service catalog trong `web/src/lib/services/products.ts`. Chỉ chọn sản phẩm active, dùng thứ tự ổn định và giới hạn số lượng. Giữ contract API public đã duyệt.
2. **Nhật/Tâm** thay nhánh production đang trả mảng rỗng trong `web/src/lib/catalog/featured-products.ts` bằng lời gọi trực tiếp tới service. Ánh xạ kết quả sang `ProductSummary` với ID thật, giá nguyên VND, mô tả, danh mục tương ứng nếu có, và ảnh từ nguồn media đã duyệt. Dùng `null` cho ảnh hay danh mục còn thiếu. Kiểm thử khi nguồn rỗng và khi service báo lỗi.
3. **Tâm** chốt thời điểm làm mới catalog trước khi bật service. Trang hiện được prerender ở production. Nếu catalog cần đọc ở runtime, dùng `connection()` tại boundary đọc dữ liệu trước khi truy vấn, hoặc thống nhất cơ chế cache và revalidation phù hợp. Build cần tiếp tục chạy được khi thiếu PostgreSQL.
4. **Phát · WEB-02** hoàn thiện `/products` và `/products/[id]` theo [API contract](../02-architecture/api-contract.md). Nghiệm thu click thẻ mở đúng ID thật và ID không tồn tại trả `404`. Khi thêm ảnh thật, kiểm tra alt theo nội dung. Sau khi DB dev sẵn sàng, nhóm có thể bỏ nhánh fixture trong lớp dữ liệu.
5. **Phát · WEB-03/WEB-04** hoàn thiện giỏ hàng và checkout theo [task briefs](web-tasks.md). Tâm review điều hướng và các trạng thái trên desktop và mobile.

Bố cục `page.tsx` và các card tiếp tục nhận cùng view model sau khi đổi nguồn dữ liệu.
