import type { Metadata } from "next";
import { Suspense } from "react";
import { CategorySection } from "../components/home/CategorySection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { HeroSection } from "../components/home/HeroSection";
import styles from "../components/home/home.module.css";

export const metadata: Metadata = {
  title: "J7 Retail | Thiết bị và phụ kiện công nghệ",
  description: "Khám phá tai nghe, bàn phím, chuột và phụ kiện cho công việc, học tập và giải trí tại J7 Retail.",
};

export default function Page() {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <HeroSection />
        <CategorySection />
        <section id="featured" className={styles.section} aria-labelledby="featured-title">
          <h2 id="featured-title">Sản phẩm nổi bật</h2>
          <Suspense fallback={<p className={styles.status} role="status">Đang tải sản phẩm…</p>}>
            <FeaturedProducts />
          </Suspense>
        </section>
        <section className={styles.benefits} aria-labelledby="service-title">
          <h2 id="service-title">Mua sắm tại J7</h2>
          <dl>
            <div><dt>Thiết bị theo nhu cầu</dt><dd>Từ góc học tập gọn nhẹ đến bàn làm việc mỗi ngày.</dd></div>
            <div><dt>Giá niêm yết bằng VND</dt><dd>Xem giá ngay trên thẻ sản phẩm.</dd></div>
            <div><dt>Thanh toán khi nhận hàng</dt><dd>COD là hình thức thanh toán dự kiến của J7.</dd></div>
          </dl>
        </section>
      </div>
    </div>
  );
}
