# AWS và vận hành

Ownership dưới đây là đề xuất để Tâm đối chiếu với Task Manager.

## AWS-01 · VPC, subnets và SG

- **Owner** Nhật (W2)
- **Mục tiêu** VPC, subnets và SG cho J7.
- **Files** `infra/terraform/modules/network/`
- **Phụ thuộc** Tech Lead duyệt CIDR và chi phí
- **Đầu vào** CIDR, hai AZ và cổng app
- **Triển khai** Tạo mạng, tuyến egress và SG theo luồng ALB → EC2 → RDS.
- **Nghiệm thu** ALB ở hai subnet public, DB ở subnet private, không có SSH public.
- **Cách kiểm thử** Chạy fmt, validate và review plan sau khi provider được cấu hình.
- **Lỗi thường gặp và kiến thức cần đọc** Gắn route Internet trực tiếp cho subnet RDS. Đọc về Subnet, route table, SG referencing và NAT/endpoints.
- **Ngoài phạm vi** WAF.

## AWS-02 · EC2, IAM và SSM

- **Owner** Nhật (W2)
- **Mục tiêu** EC2, IAM và SSM cho J7.
- **Files** `infra/terraform/modules/compute/`
- **Phụ thuộc** AWS-01, AWS-05
- **Đầu vào** Subnet, SG, AMI, ECR và quyền đọc secret
- **Triển khai** Thêm instance profile tối thiểu, Docker và khả năng SSM.
- **Nghiệm thu** EC2 hiện trong SSM, pull được ECR và chỉ nhận traffic app từ ALB.
- **Cách kiểm thử** Review plan, kiểm tra SSM và Docker sau lần deploy được duyệt.
- **Lỗi thường gặp và kiến thức cần đọc** Thiếu đường ra cho SSM Agent. Đọc về Instance profile, SSM Agent và đường egress.
- **Ngoài phạm vi** Auto Scaling.

## AWS-03 · RDS private

- **Owner** Nhật (W2)
- **Mục tiêu** RDS private cho J7.
- **Files** `infra/terraform/modules/database/`
- **Phụ thuộc** AWS-01
- **Đầu vào** Subnets private, SG và cấu hình PostgreSQL
- **Triển khai** Thêm subnet group và RDS mã hóa, quản lý credentials qua AWS.
- **Nghiệm thu** Không public, TCP 5432 chỉ từ EC2, URL ứng dụng lấy từ runtime config.
- **Cách kiểm thử** Review plan; sau deploy được duyệt, kết nối TLS từ EC2.
- **Lỗi thường gặp và kiến thức cần đọc** Mở 5432 theo CIDR public. Đọc về RDS subnet group, TLS và state Terraform.
- **Ngoài phạm vi** Backup/restore drill.

## AWS-04 · ALB và HTTPS

- **Owner** Nhật (W2)
- **Mục tiêu** ALB và HTTPS cho J7.
- **Files** `infra/terraform/modules/load-balancer/`
- **Phụ thuộc** AWS-01, AWS-02, domain và chứng chỉ ACM
- **Đầu vào** Subnet public, SG, target EC2 và ARN ACM
- **Triển khai** Thêm listener HTTPS, chuyển HTTP sang HTTPS và health check `/api/health`.
- **Nghiệm thu** HTTPS hợp lệ và target healthy.
- **Cách kiểm thử** Review plan, chạy curl HTTPS sau deploy được duyệt.
- **Lỗi thường gặp và kiến thức cần đọc** Health check dùng path trả 501. Đọc về ACM, target group và health check.
- **Ngoài phạm vi** WAF và CDN.

## AWS-05 · ECR

- **Owner** Nhật (W2)
- **Mục tiêu** ECR cho J7.
- **Files** `infra/terraform/modules/registry/`
- **Phụ thuộc** Region và tên repo được duyệt
- **Đầu vào** Tên repo và chính sách lưu image
- **Triển khai** Khai báo ECR, scan image và chính sách lifecycle.
- **Nghiệm thu** Có repo URL output, repository private và triển khai dùng digest.
- **Cách kiểm thử** Validate, review plan rồi thử push/pull sau khi được duyệt.
- **Lỗi thường gặp và kiến thức cần đọc** Tái dùng tag làm mất khả năng truy vết image. Đọc về ECR auth, digest và IAM scopes.
- **Ngoài phạm vi** GitHub Actions push.

## AWS-06 · Ghép dev và deploy thủ công

- **Owner** Nhật (W2)
- **Mục tiêu** Ghép dev và deploy thủ công cho J7.
- **Files** `infra/terraform/environments/dev/`, `docs/03-task-briefs/cloud-tasks.md`
- **Phụ thuộc** AWS-01 đến AWS-05, WEB-05 (image)
- **Đầu vào** Region, domain, digest, cấu hình RDS và backend state
- **Triển khai** Nối module, review plan, ghi quy trình deploy, migrate và rollback.
- **Nghiệm thu** Deployment dev lặp lại qua SSM, HTTPS hoạt động, checkout COD vượt smoke test.
- **Cách kiểm thử** Chạy fmt/validate, review plan, chạy smoke test sau deploy được duyệt.
- **Lỗi thường gặp và kiến thức cần đọc** Rollback image khi schema đã thay đổi không tương thích. Đọc về Remote state, migration tương thích và rollback image.
- **Ngoài phạm vi** Auto-deploy.

## OPS-01 · CI/CD sau MVP

- **Owner** Tâm điều phối (Sau MVP)
- **Mục tiêu** CI/CD sau MVP cho J7.
- **Files** `.github/workflows/`
- **Phụ thuộc** MVP và Tech Lead duyệt
- **Đầu vào** Build, test và quyền triển khai
- **Triển khai** Tách kiểm tra PR khỏi deployment có phê duyệt.
- **Nghiệm thu** CI phản ánh trạng thái thật, deploy cần phê duyệt.
- **Cách kiểm thử** Dùng PR thử và kiểm tra logs workflow.
- **Lỗi thường gặp và kiến thức cần đọc** Dùng cùng quyền cho PR từ fork và deploy. Đọc về GitHub Actions, OIDC và environment protection.
- **Ngoài phạm vi** Bật auto-deploy trong scaffold.

Trình tự tích hợp: WEB-05 build image trước, AWS-06 triển khai digest đã duyệt, sau đó WEB-05 chạy smoke test AWS.
