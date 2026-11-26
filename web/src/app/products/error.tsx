"use client"; // Error boundary bắt buộc là Client Component

import { useEffect } from "react";
import styles from "../../components/home/home.module.css";

// Next 16.4.6: nhận { error, retry } (retry lấy lại dữ liệu và render lại).
// Không hiển thị error.message cho người dùng; chi tiết chỉ ghi ở console (dùng error.digest để đối chiếu log server).
export default function ProductsError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error("Unable to load products", error);
  }, [error]);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="products-error-title">
          <h1 id="products-error-title">Không thể tải sản phẩm</h1>
          <p className={styles.status} role="alert">Đã có lỗi khi tải dữ liệu sản phẩm. Vui lòng thử lại.</p>
          <button type="button" className={styles.cta} onClick={() => retry()}>Thử lại</button>
        </section>
      </div>
    </div>
  );
}
