import Link from "next/link";

// TODO(WEB-03, owner=Phát): Tải lại giữ giỏ, người dùng sửa được số lượng và thấy trạng thái rỗng. Nghiệm thu: Thêm hai mặt hàng, tải lại, sửa và xóa.
export default function Page() {
  return (
    <>
      <h1>Giỏ hàng</h1>
      <p>Tính năng đang được phát triển.</p>
      <Link href="/checkout">Đặt hàng COD</Link>
    </>
  );
}
