import { getProducts } from "../../lib/catalog/products";
import { ProductCard } from "../home/ProductCard";
import styles from "../home/home.module.css";

// Lỗi từ getProducts() được để nổi lên để app/products/error.tsx xử lý.
export async function ProductList() {
  const products = await getProducts();

  if (products.length === 0) {
    return <p className={styles.status}>Hiện chưa có sản phẩm.</p>;
  }

  return (
    <ul className={`${styles.productGrid} ${styles.clickableCards}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={{
              id: product.id,
              name: product.name,
              description: product.description,
              priceVnd: product.priceVnd,
              category: null,
              image: product.imageUrl ? { src: product.imageUrl, alt: product.name } : null,
            }}
            preview={false}
            soldOut={product.stockQuantity <= 0}
          />
        </li>
      ))}
    </ul>
  );
}
