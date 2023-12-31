import { ProductWithTotalPrice } from "@/helpers/products";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[10.625rem] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[60%] w-auto max-w-[80%] object-contain"
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-end gap-1">
            {product.discountPercentage > 0 ? (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                  R$ {product.totalPrice.toFixed(2).replace(".", ",")}
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-50">
                  R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                R$ {product.basePrice.toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
