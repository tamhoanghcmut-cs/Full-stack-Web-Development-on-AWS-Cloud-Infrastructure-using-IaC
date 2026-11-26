import { Suspense } from "react";
import { ProductList } from "../../components/products/ProductList";
import styles from "../../components/home/home.module.css";

// TODO(WEB-02, owner=Phát): Danh sách và chi tiết hiển thị dữ liệu thật, ID sai cho 404. Nghiệm thu: Mở danh sách, sản phẩm hợp lệ và ID sai.
export default function Page() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="products-title">
          <h1 id="products-title">Sản phẩm</h1>
          <Suspense fallback={<p className={styles.status} role="status">Đang tải sản phẩm…</p>}>
            <ProductList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
