import type { ReactNode } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import styles from "../components/layout/layout.module.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className={styles.site}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
