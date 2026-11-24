# Đóng góp cho J7

1. Đối chiếu Task ID và owner với Task Manager. Tạo branch theo task, ví dụ `feat/web-02-catalog`.
2. Đọc contract trước khi sửa UI hoặc API. Với thay đổi contract, yêu cầu Tâm review cùng Phát và Nhật.
3. Dùng Node.js 22 LTS (từ 22.12), npm, Docker và Terraform khi làm cloud.

Chạy từ thư mục gốc bằng PowerShell:

```powershell
npm.cmd --prefix web ci
npm.cmd --prefix web run typecheck
npm.cmd --prefix web run build
npm.cmd --prefix web run dev
```

Mở `http://localhost:3000`. Kiểm tra `/api/health` trả 200 và `/api/products` trả 501 trong scaffold. Để chuẩn bị DB cho API-01:

```powershell
Copy-Item web/.env.example web/.env  # Chỉ chạy nếu web/.env chưa tồn tại
docker compose up -d db
```

Sau khi có migration, chạy theo API-01. Chỉ dùng cấu hình local mẫu với Compose trên máy dev.

```powershell
docker build -t j7-web:local web
docker run --rm -p 127.0.0.1:3000:3000 j7-web:local
terraform fmt -check -recursive infra/terraform
terraform -chdir=infra/terraform/environments/dev init -backend=false
terraform -chdir=infra/terraform/environments/dev validate
```

Mỗi PR nêu mục tiêu, cách kiểm thử và kết quả thực tế. Ví dụ, ghi “`GET /api/products` → 501, đúng với scaffold”.
