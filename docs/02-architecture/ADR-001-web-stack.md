# ADR-001 · Web stack

**Trạng thái** Proposed. **Người duyệt** Tâm.

Dùng Next.js App Router và TypeScript cho UI và Route Handlers. Prisma 7 quản lý truy cập PostgreSQL. Đóng gói bằng Docker và chạy trên EC2, với ALB, RDS và ECR do Terraform quản lý.

Nhóm dùng một repo và một image ứng dụng để giảm số dịch vụ phải tích hợp. Ranh giới UI, API, service, validation và DB vẫn rõ ràng. Ví dụ, handler đặt hàng gọi order service, nơi quản lý transaction qua Prisma.

Tâm xác nhận stack, phiên bản và contract trước khi mở rộng scaffold.
