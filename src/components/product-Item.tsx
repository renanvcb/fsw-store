import { ProductWithTotalPrice } from "@/app/helpers/products";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex max-w-[9.75rem] flex-col gap-4">
      <div className="relative flex h-[10.625rem] w-[9.75rem] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[60%] w-auto max-w-[80%] object-contain"
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[0.125rem]">
            <ArrowDownIcon size={14} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>

        <div className="flex items-end gap-1">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-bold">
                R$ {product.totalPrice.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            </>
          ) : (
            <p className="font-bold">
              R$ {product.basePrice.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}