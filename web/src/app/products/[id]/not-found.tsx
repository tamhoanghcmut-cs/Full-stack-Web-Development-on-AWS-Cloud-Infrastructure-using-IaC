import Link from "next/link";
import styles from "../../../components/home/home.module.css";

// Hiển thị khi [id]/page.tsx gọi notFound(). Next trả HTTP 404 vì chưa có streaming trước đó (không có loading.tsx ở cấp products/).
export default function ProductNotFound() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="product-not-found-title">
          <h1 id="product-not-found-title">Không tìm thấy sản phẩm</h1>
          <p className={styles.sectionNote}>Sản phẩm bạn tìm không tồn tại hoặc đã ngừng bán.</p>
          <Link href="/products" className={styles.cta}>Xem tất cả sản phẩm</Link>
        </section>
      </div>
    </div>
  );
}
