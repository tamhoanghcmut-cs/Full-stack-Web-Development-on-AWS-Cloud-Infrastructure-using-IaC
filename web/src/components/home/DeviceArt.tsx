import type { ProductCategory } from "../../lib/catalog/product-summary";
import styles from "./home.module.css";

const shapes: Record<ProductCategory, string> = {
  "Tai nghe": styles.headphones,
  "Bàn phím": styles.keyboard,
  "Chuột": styles.mouse,
  "Phụ kiện": styles.hub,
};

export function DeviceArt({ category, label }: { category: ProductCategory; label?: string }) {
  return (
    <span
      className={`${styles.device} ${shapes[category]}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
