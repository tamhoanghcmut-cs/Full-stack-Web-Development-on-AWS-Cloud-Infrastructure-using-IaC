import styles from "./home.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Thiết bị & phụ kiện</p>
        <h1 id="hero-title">Nâng cấp góc làm việc của bạn.</h1>
        <p className={styles.heroDescription}>Chọn bàn phím, tai nghe và phụ kiện phù hợp với cách bạn làm việc, học tập và giải trí.</p>
        <a href="#featured" className={styles.cta}>Khám phá sản phẩm</a>
      </div>
      <div className={styles.heroArt} aria-hidden="true">
        <div className={styles.heroOrbit} />
        <div className={styles.heroDevice}>
          <div className={styles.heroKeys} />
          <div className={styles.heroSpace} />
        </div>
      </div>
    </section>
  );
}
