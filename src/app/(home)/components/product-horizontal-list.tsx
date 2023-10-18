import { computeProductPrice } from "@/app/helpers/products";
import { ProductItem } from "@/components/product-Item";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

export function ProductHorizontalList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={computeProductPrice(product)} />
      ))}
    </div>
  );
}
