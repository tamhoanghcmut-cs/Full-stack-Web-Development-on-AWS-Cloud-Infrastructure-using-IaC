# Phạm vi MVP

- Khách xem danh sách và chi tiết sản phẩm, quản lý giỏ, đặt COD và nhận mã đơn.
- API lưu đơn và dữ liệu sản phẩm trong PostgreSQL qua Prisma. Server tính giá, cập nhật tồn trong transaction và bảo vệ thao tác quản trị bằng xác thực/phân quyền.
- AWS dev gồm VPC, subnet, ALB HTTPS, EC2 chạy Docker với IAM/SSM, ECR và RDS private. Không mở SSH public. Bí mật được cấp lúc chạy ứng dụng.
- Nghiệm thu bằng deploy lặp lại và smoke test checkout qua HTTPS. Ví dụ, đặt hai sản phẩm và đối chiếu giá, mã đơn và số lượng tồn đã giảm.
- Sau MVP có CI/CD hoàn chỉnh, auto-deploy, CloudWatch nâng cao, load test, diễn tập backup/restore và WAF.

Tâm duyệt kiến trúc, contract, PR và nghiệm thu. Phát làm UI/đóng gói. Nhật làm API/DB W1 và AWS từ W2 theo Task Manager.
