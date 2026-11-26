"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/cart", label: "Giỏ hàng" },
] as const;

function NavigationLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </>
  );
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <>
      <nav aria-label="Điều hướng chính" className={styles.desktopNav}>
        <NavigationLinks pathname={pathname} />
      </nav>
      {/* key={pathname}: dựng lại <details> sau mỗi lần đổi trang để menu mobile tự đóng. */}
      <details key={pathname} className={styles.mobileMenu}>
        <summary>Menu</summary>
        <nav aria-label="Menu di động" className={styles.mobileNav}>
          <NavigationLinks pathname={pathname} />
        </nav>
      </details>
    </>
  );
}
