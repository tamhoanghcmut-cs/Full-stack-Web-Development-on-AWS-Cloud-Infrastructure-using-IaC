import type { ProductCategory } from "../../lib/catalog/product-summary";
import { DeviceArt } from "./DeviceArt";
import styles from "./home.module.css";

const categories: readonly ProductCategory[] = ["Tai nghe", "Bàn phím", "Chuột", "Phụ kiện"];

export function CategorySection() {
  return (
    <section className={styles.section} aria-labelledby="categories-title">
      <h2 id="categories-title">Danh mục thiết bị</h2>
      <ul className={styles.categoryGrid}>
        {categories.map((category) => (
          <li className={styles.categoryCard} key={category}>
            <span className={styles.categoryArt}><DeviceArt category={category} /></span>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
