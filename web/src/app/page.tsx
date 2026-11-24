import Link from "next/link";

// TODO(WEB-01, owner=Phát): Trang chủ có liên kết truy cập được và giao diện responsive. Nghiệm thu: Mở `/` trên mobile và desktop, điều hướng bằng Tab.
export default function Page() {
  return (
    <>
      <h1>J7 Retail</h1>
      <p>Tính năng đang được phát triển.</p>
      <nav aria-label="Cửa hàng">
        <Link href="/products">Sản phẩm</Link>{" · "}
        <Link href="/cart">Giỏ hàng</Link>
      </nav>
    </>
  );
}
