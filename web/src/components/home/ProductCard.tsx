import Link from "next/link";
import type { ProductSummary } from "../../lib/catalog/product-summary";
import { DeviceArt } from "./DeviceArt";
import styles from "./home.module.css";

const formatPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

export function ProductCard({ product, preview }: { product: ProductSummary; preview: boolean }) {
  const href = `/products/${encodeURIComponent(product.id)}`;

  return (
    <article className={styles.productCard}>
      <div className={styles.productArt}>
        {product.image ? (
          // Catalog images can be hosted on the approved media origin without a Next optimizer dependency.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image.src} alt={product.image.alt} loading="lazy" />
        ) : product.category ? (
          <DeviceArt category={product.category} label={`Minh họa ${product.name}`} />
        ) : (
          <span className={styles.imageFallback}>Chưa có ảnh</span>
        )}
      </div>
      <div className={styles.productInfo}>
        {product.category && <p className={styles.productCategory}>{product.category}</p>}
        <h3><Link href={href} prefetch={false}>{product.name}</Link></h3>
        <p>{product.description}</p>
        <p className={styles.price}>{formatPrice.format(product.priceVnd)}</p>
        {/* TODO(WEB-02, owner=Phát): Dùng chi tiết thật theo ID từ catalog. Nghiệm thu: ID hợp lệ hiện chi tiết, ID thiếu trả 404. */}
        {preview && <p className={styles.previewNote}>Trang chi tiết đang phát triển</p>}
      </div>
    </article>
  );
}
