import { featuredProducts } from "./featured-products.fixture";
import type { DemoProduct } from "./types";

export function getDemoFeaturedProducts(): readonly DemoProduct[] {
  return featuredProducts;
}
