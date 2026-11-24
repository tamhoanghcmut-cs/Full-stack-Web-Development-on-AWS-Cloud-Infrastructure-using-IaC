# API contract dự kiến

Tâm duyệt contract trước khi Phát và Nhật tích hợp. JSON dùng camelCase. Giá là số nguyên VND. ID là chuỗi opaque. Các route nghiệp vụ trả 501 trong scaffold.

| Method | Route | Thành công |
|---|---|---|
| GET | `/api/health` | 200 với `{"status":"ok"}` |
| GET | `/api/products` | 200 với `{"products":[Product]}` |
| GET | `/api/products/{id}` | 200 với `{"product":Product}` |
| POST | `/api/orders` | 201 với `{"orderId":"ord_123","totalVnd":120000,"status":"PENDING"}` |
| GET, POST | `/api/admin/products` | 200 danh sách, 201 sản phẩm tạo mới |
| PATCH | `/api/admin/products/{id}` | 200 sản phẩm đã cập nhật, hỗ trợ đặt inactive |
| GET | `/api/admin/orders` | 200 danh sách đơn |
| PATCH | `/api/admin/orders/{id}` | 200 đơn đã cập nhật trạng thái |

Product gồm `id`, `name`, `description`, `priceVnd`, `stockQuantity`, `imageUrl` (có thể null). Catalog public chỉ hiển thị sản phẩm active. Admin product ghi các trường trên trừ ID và có thêm `active`. Admin lists bọc trong `products` hoặc `orders`, mutation bọc trong `product` hoặc `order`. Admin order tối thiểu gồm `id`, `status` và `totalVnd`. Đề xuất chuyển `PENDING` sang `CONFIRMED`, rồi `FULFILLED`. Tâm duyệt vòng đời và chính sách hủy trước khi mở rộng.

Ví dụ `CheckoutInput`:

```json
{"customerName":"An","phone":"0900000000","shippingAddress":"Địa chỉ giao hàng","items":[{"productId":"p_123","quantity":2}]}
```

COD là mặc định. Server xác thực input, lấy giá hiện hành từ DB và đảm bảo tồn không âm trong transaction. Giá snapshot được lưu theo dòng đơn.

Lỗi có dạng `{"error":{"code":"OUT_OF_STOCK","message":"Sản phẩm không đủ tồn kho."}}`. Dùng 400 cho input sai, 401 khi thiếu xác thực, 403 khi thiếu quyền, 404 khi không tìm thấy, 409 khi xung đột tồn hoặc trạng thái. Với 500, chỉ trả thông báo chung. Admin routes yêu cầu kiểm tra quyền server-side.
