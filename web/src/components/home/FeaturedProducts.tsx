import { getFeaturedProducts } from "../../lib/catalog/featured-products";
import { ProductCard } from "./ProductCard";
import styles from "./home.module.css";

export async function FeaturedProducts() {
  try {
    const { products, source } = await getFeaturedProducts();

    if (products.length === 0) {
      return <p className={styles.status}>Hiện chưa có sản phẩm nổi bật.</p>;
    }

    return (
      <>
        {source === "fixture" && (
          <p className={styles.sectionNote}>Sản phẩm và giá minh họa dành cho môi trường phát triển.</p>
        )}
        <ul className={styles.productGrid}>
          {products.map((product) => (
            <li key={product.id}><ProductCard product={product} preview={source === "fixture"} /></li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Unable to load featured products", error);
    return <p className={styles.status} role="status">Chưa thể hiển thị sản phẩm nổi bật. Vui lòng quay lại sau.</p>;
  }
}
