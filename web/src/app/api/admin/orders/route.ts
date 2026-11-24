import { notImplemented } from "../../not-implemented";

// TODO(API-04, owner=Nhật): 401 khi thiếu xác thực, 403 khi thiếu quyền, admin được quản lý sản phẩm và đơn. Nghiệm thu: Thử anonymous, tài khoản thường và admin hợp lệ.
export function GET() {
  return notImplemented();
}
