import { getDemoFeaturedProducts } from "../../../../lib/demo/featured-products";
import type { FeaturedProductsResponse } from "../../../../lib/demo/types";

export function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const scenario = new URL(request.url).searchParams.get("scenario");

  if (scenario === "error") {
    return Response.json({ error: { code: "DEMO_UNAVAILABLE" } }, { status: 503 });
  }

  const payload: FeaturedProductsResponse = {
    data: scenario === "empty" ? [] : getDemoFeaturedProducts(),
    source: "demo",
  };

  return Response.json(payload);
}
