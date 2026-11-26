import Link from "next/link";
import { HeaderNav } from "./HeaderNav";
import styles from "./layout.module.css";

export function Header() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerRow}>
        <Link href="/" className={styles.brand}><span aria-hidden="true">J7</span> J7 Retail</Link>
        <HeaderNav />
      </div>
    </header>
  );
}
