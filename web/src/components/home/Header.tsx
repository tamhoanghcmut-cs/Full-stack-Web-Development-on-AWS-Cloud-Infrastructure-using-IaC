import Link from "next/link";
import styles from "./home.module.css";

function NavigationLinks() {
  return (
    <>
      <Link href="/" aria-current="page">Trang chủ</Link>
      <Link href="/products">Sản phẩm</Link>
      <Link href="/cart">Giỏ hàng</Link>
    </>
  );
}

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerRow}>
        <Link href="/" className={styles.brand}><span aria-hidden="true">J7</span> J7 Retail</Link>
        <nav aria-label="Điều hướng chính" className={styles.desktopNav}>
          <NavigationLinks />
        </nav>
        <details className={styles.mobileMenu}>
          <summary>Danh mục</summary>
          <nav aria-label="Điều hướng chính" className={styles.mobileNav}>
            <NavigationLinks />
          </nav>
        </details>
      </div>
    </header>
  );
}
