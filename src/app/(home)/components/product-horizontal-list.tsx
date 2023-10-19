import { computeProductPrice } from "@/helpers/products";
import { ProductItem } from "@/components/product-Item";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
  title?: string;
}

export function ProductHorizontalList({ title, products }: ProductListProps) {
  return (
    <>
      <p className="mb-3 pl-5 font-bold uppercase">{title}</p>
      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <div key={product.id} className="w-[10.625rem] max-w-[10.625rem]">
            <ProductItem product={computeProductPrice(product)} />
          </div>
        ))}
      </div>
    </>
  );
}
