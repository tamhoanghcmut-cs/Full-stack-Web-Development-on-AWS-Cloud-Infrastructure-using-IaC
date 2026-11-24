# Web, API và dữ liệu

Ownership dưới đây là đề xuất để Tâm đối chiếu với Task Manager.

## WEB-01 · Trang chủ

- **Owner** Phát (W1)
- **Mục tiêu** Trang chủ cho J7.
- **Files** `web/src/app/page.tsx`, `web/src/app/layout.tsx`, `web/src/components/`
- **Phụ thuộc** —
- **Đầu vào** Điều hướng MVP
- **Triển khai** Tạo điều hướng bàn phím tới danh mục và giỏ.
- **Nghiệm thu** Trang chủ có liên kết truy cập được và giao diện responsive.
- **Cách kiểm thử** Mở `/` trên mobile và desktop, điều hướng bằng Tab.
- **Lỗi thường gặp và kiến thức cần đọc** Dùng div thay cho liên kết làm mất điều hướng bằng bàn phím. Đọc về App Router layout và HTML ngữ nghĩa.
- **Ngoài phạm vi** Thiết kế thương hiệu nâng cao.

## WEB-02 · Danh mục và chi tiết

- **Owner** Phát (W1)
- **Mục tiêu** Danh mục và chi tiết cho J7.
- **Files** `web/src/app/products/`, `web/src/components/`
- **Phụ thuộc** API-02
- **Đầu vào** DTO Product và ID
- **Triển khai** Kết nối dữ liệu, thêm trạng thái tải, rỗng, lỗi và 404.
- **Nghiệm thu** Danh sách và chi tiết hiển thị dữ liệu thật, ID sai cho 404.
- **Cách kiểm thử** Mở danh sách, sản phẩm hợp lệ và ID sai.
- **Lỗi thường gặp và kiến thức cần đọc** Hiển thị trang rỗng khi API trả 404. Đọc về Server Components, dynamic params và đơn vị giá.
- **Ngoài phạm vi** Quản trị sản phẩm.

## WEB-03 · Giỏ hàng

- **Owner** Phát (W1)
- **Mục tiêu** Giỏ hàng cho J7.
- **Files** `web/src/app/cart/`, `web/src/components/`
- **Phụ thuộc** WEB-02
- **Đầu vào** ID, số lượng và giá hiển thị
- **Triển khai** Quản lý thêm, sửa, xóa và lưu giỏ trên trình duyệt.
- **Nghiệm thu** Tải lại giữ giỏ, người dùng sửa được số lượng và thấy trạng thái rỗng.
- **Cách kiểm thử** Thêm hai mặt hàng, tải lại, sửa và xóa.
- **Lỗi thường gặp và kiến thức cần đọc** Đọc localStorage trước hydration. Đọc về Client Components, hydration và localStorage.
- **Ngoài phạm vi** Giữ chỗ tồn kho.

## WEB-04 · Checkout COD

- **Owner** Phát (W1)
- **Mục tiêu** Checkout COD cho J7.
- **Files** `web/src/app/checkout/`
- **Phụ thuộc** WEB-03, API-03
- **Đầu vào** Giỏ và trường liên hệ theo API contract
- **Triển khai** Gửi một yêu cầu đang xử lý tại một thời điểm, hiển thị lỗi và mã đơn.
- **Nghiệm thu** Giỏ chỉ được xóa khi nhận 201, lỗi 409 giữ giỏ.
- **Cách kiểm thử** Thử giỏ hợp lệ, thiếu trường và hết hàng.
- **Lỗi thường gặp và kiến thức cần đọc** Xóa giỏ khi request thất bại. Đọc về Form validation và trạng thái request.
- **Ngoài phạm vi** Thanh toán trực tuyến.

## WEB-05 · Đóng gói và smoke test

- **Owner** Phát (W2)
- **Mục tiêu** Đóng gói và smoke test cho J7.
- **Files** `web/Dockerfile`, `web/.dockerignore`, `compose.yaml`, `web/tests/`
- **Phụ thuộc** API-01, WEB-04, AWS-06 (smoke AWS)
- **Đầu vào** Image, biến runtime và dữ liệu dev được duyệt
- **Triển khai** Kiểm tra image non-root, viết smoke test cho truy cập và checkout COD trên dev.
- **Nghiệm thu** Image chạy được, smoke test xác nhận 201 và phản ánh tồn kho.
- **Cách kiểm thử** Chạy build Docker rồi chạy smoke test trên môi trường dev được duyệt.
- **Lỗi thường gặp và kiến thức cần đọc** Đưa .env vào image. Đọc về Docker build context, env runtime và dữ liệu test.
- **Ngoài phạm vi** Tự động deploy.

## API-01 · Schema và client

- **Owner** Nhật (W1)
- **Mục tiêu** Schema và client cho J7.
- **Files** `web/prisma/`, `web/prisma7.config.ts`, `web/src/lib/db.ts`, `web/.env.example`
- **Phụ thuộc** —
- **Đầu vào** PostgreSQL dev và DTO dự kiến
- **Triển khai** Tạo Product, Order, OrderItem và migration, thêm adapter `@prisma/adapter-pg` và dùng lại Prisma client trong dev.
- **Nghiệm thu** Migration chạy trên DB sạch, khóa ngoại hợp lệ và giá snapshot dạng số nguyên.
- **Cách kiểm thử** Chạy `npx prisma validate`, `npx prisma generate` và migrate trên DB dev.
- **Lỗi thường gặp và kiến thức cần đọc** Dùng số thực cho giá. Đọc về Prisma migration, khóa ngoại và biến môi trường.
- **Ngoài phạm vi** Chạy migration AWS.

## API-02 · Đọc sản phẩm

- **Owner** Nhật (W1)
- **Mục tiêu** Đọc sản phẩm cho J7.
- **Files** `web/src/app/api/products/`, `web/src/lib/services/`
- **Phụ thuộc** API-01
- **Đầu vào** ID và bản ghi Product
- **Triển khai** Tách truy vấn vào service, ánh xạ DTO và lỗi.
- **Nghiệm thu** GET trả 200 cho danh sách và chi tiết hợp lệ, 404 khi không tìm thấy.
- **Cách kiểm thử** Gọi hai endpoint với ID hợp lệ và ID thiếu.
- **Lỗi thường gặp và kiến thức cần đọc** Lộ sản phẩm inactive trong API public. Đọc về HTTP status, DTO và lọc sản phẩm inactive.
- **Ngoài phạm vi** Ghi dữ liệu quản trị.

## API-03 · Đặt hàng và tồn kho

- **Owner** Nhật (W1)
- **Mục tiêu** Đặt hàng và tồn kho cho J7.
- **Files** `web/src/app/api/orders/route.ts`, `web/src/lib/services/`, `web/src/lib/validators/`
- **Phụ thuộc** API-01
- **Đầu vào** CheckoutInput và số lượng tồn
- **Triển khai** Validate payload, hợp nhất dòng trùng, cập nhật tồn có điều kiện và lưu đơn trong transaction.
- **Nghiệm thu** 201 khi thành công, 400 khi payload sai, 409 khi thiếu tồn, rollback đầy đủ và tồn không âm khi có yêu cầu đồng thời.
- **Cách kiểm thử** Gửi giá giả, số lượng sai và hai đơn tranh cùng đơn vị tồn.
- **Lỗi thường gặp và kiến thức cần đọc** Đọc tồn rồi ghi vô điều kiện gây bán vượt tồn. Đọc về Isolation, transaction, khóa hoặc cập nhật có điều kiện.
- **Ngoài phạm vi** Cổng thanh toán.

## API-04 · Quản trị có phân quyền

- **Owner** Nhật (W1)
- **Mục tiêu** Quản trị có phân quyền cho J7.
- **Files** `web/src/app/api/admin/`, `web/src/lib/services/`, `web/src/lib/validators/`
- **Phụ thuộc** API-01, Tech Lead duyệt cơ chế xác thực
- **Đầu vào** Danh tính, vai trò và thao tác admin
- **Triển khai** Kiểm tra quyền server-side trước khi đọc/ghi, validate và giảm tối đa dữ liệu cá nhân trả về.
- **Nghiệm thu** 401 khi thiếu xác thực, 403 khi thiếu quyền, admin được quản lý sản phẩm và đơn.
- **Cách kiểm thử** Thử anonymous, tài khoản thường và admin hợp lệ.
- **Lỗi thường gặp và kiến thức cần đọc** Chỉ ẩn nút ở UI mà thiếu kiểm tra quyền server. Đọc về Session, authorization và chống CSRF nếu dùng cookie.
- **Ngoài phạm vi** UI admin nâng cao.
