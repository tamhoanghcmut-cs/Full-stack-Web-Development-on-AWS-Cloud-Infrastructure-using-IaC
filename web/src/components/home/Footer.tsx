import Link from "next/link";
import styles from "./home.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerRow}>
        <div><strong>J7 Retail & Distribution</strong><p>Thiết bị điện tử và phụ kiện công nghệ.</p></div>
        <nav aria-label="Điều hướng cuối trang" className={styles.nav}>
          <Link href="/">Trang chủ</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/cart">Giỏ hàng</Link>
        </nav>
      </div>
    </footer>
  );
}
