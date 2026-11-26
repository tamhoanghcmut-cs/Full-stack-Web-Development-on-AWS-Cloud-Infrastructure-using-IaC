import { notFound } from "next/navigation";
import styles from "../../../components/home/home.module.css";
import { ProductDetail } from "../../../components/products/ProductDetail";
import { getProductById } from "../../../lib/catalog/products";

// Không bọc tra cứu trong Suspense và không có loading.tsx ở cấp products/: nhờ vậy notFound() chạy trước khi
// streaming bắt đầu và Next trả HTTP 404 thật (xem loading.md, mục Status codes).
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.section}>
          <ProductDetail product={product} />
        </div>
      </div>
    </div>
  );
}
