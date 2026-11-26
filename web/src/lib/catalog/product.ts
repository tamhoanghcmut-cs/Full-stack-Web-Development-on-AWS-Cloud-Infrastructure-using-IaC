// Product DTO theo docs/02-architecture/api-contract.md (bản dự kiến).
export type Product = {
  id: string;
  name: string;
  description: string;
  priceVnd: number;
  stockQuantity: number;
  imageUrl: string | null;
};
