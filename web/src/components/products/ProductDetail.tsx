import Link from "next/link";
import type { Product } from "../../lib/catalog/product";
import styles from "./products.module.css";

// Chưa có hàm định dạng giá dùng chung (ProductCard giữ bản riêng, không export), nên khai báo cùng cấu hình ở đây.
const formatPrice = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

export function ProductDetail({ product }: { product: Product }) {
  const soldOut = product.stockQuantity <= 0;

  return (
    <article className={styles.detail} aria-labelledby="product-title">
      <Link href="/products" className={styles.back}><span aria-hidden="true">←</span> Quay lại danh sách sản phẩm</Link>
      <div className={styles.layout}>
        <div className={styles.art}>
          {product.imageUrl ? (
            // Ảnh catalog có thể nằm ở origin media được duyệt, không phụ thuộc Next image optimizer (giống ProductCard).
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <span className={styles.noImage}>Chưa có ảnh</span>
          )}
        </div>
        <div className={styles.info}>
          <h1 id="product-title" className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{formatPrice.format(product.priceVnd)}</p>
          <p className={soldOut ? `${styles.stock} ${styles.soldOut}` : styles.stock}>{soldOut ? "Hết hàng" : "Còn hàng"}</p>
          <p className={styles.description}>{product.description}</p>
          {/* TODO(WEB-04A, owner=Phát): Nút thêm vào giỏ. Nghiệm thu: thêm sản phẩm vào giỏ lưu trên trình duyệt (xem WEB-03). Hiện chỉ là nút vô hiệu hóa, chưa có logic giỏ hàng. */}
          <div className={styles.actions}>
            <button type="button" className={styles.addToCart} disabled aria-describedby="add-to-cart-note">Thêm vào giỏ</button>
            <p id="add-to-cart-note" className={styles.note}>Sắp có</p>
          </div>
        </div>
      </div>
    </article>
  );
}
