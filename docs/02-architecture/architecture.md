# Kiến trúc đề xuất

Trình duyệt → HTTPS ALB → Docker trên EC2 → PostgreSQL private trên RDS. ECR giữ image. EC2 dùng instance profile để pull image và SSM để quản trị.

- `web/src/app/` chứa trang. `components/` chứa UI dùng lại. Route Handlers trong `app/api/` xử lý HTTP, gọi `lib/validators/` để kiểm tra input và `lib/services/` để thực hiện nghiệp vụ. Service truy cập Prisma qua `lib/db.ts`.
- ALB đặt ở ít nhất hai subnet public. EC2 nhận cổng ứng dụng từ SG của ALB. RDS dùng subnet group private ở hai AZ và nhận TCP 5432 từ SG của EC2. Chốt egress qua NAT hoặc endpoints dựa trên chi phí và nhu cầu.
- HTTPS cần domain và ACM certificate. Cổng 80 chuyển hướng HTTPS. `/api/health` kiểm tra process. Smoke test checkout xác minh đường đi tới DB.
- Deploy dev dùng digest từ ECR, nạp thông tin kết nối qua quyền IAM giới hạn và áp dụng migration có kiểm soát. State Terraform cần backend bảo vệ trước lần deploy đầu.

Ví dụ checkout: UI gửi ID và số lượng. Service đọc giá hiện hành, trừ tồn có điều kiện và ghi đơn cùng các dòng hàng trong một transaction.

[ADR-001](ADR-001-web-stack.md) đang chờ Tâm duyệt. Các module hiện khai báo input dự kiến. Outputs và wiring thuộc AWS-01 đến AWS-06.
