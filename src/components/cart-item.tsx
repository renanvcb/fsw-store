import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

function CartItem({ product }: CartItemProps) {
  const { decreaseProductQuantity, increaseProductQuantity } =
    useContext(CartContext);

  function handleDecreaseProductQuantity() {
    decreaseProductQuantity(product.id);
  }

  function handleIncreaseProductQuantity() {
    increaseProductQuantity(product.id);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* FOTO E NOME (DIREITA)*/}
        <div className="flex h-[4.8125rem] w-[4.8125rem] items-center justify-center rounded-lg bg-accent">
          <Image
            alt={product.name}
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2).replace(".", ",")}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-50">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>

          <div className="mt-1 flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              onClick={handleDecreaseProductQuantity}
            >
              <ChevronLeftIcon size={22} />
            </Button>

            <span>{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              onClick={handleIncreaseProductQuantity}
            >
              <ChevronRightIcon size={22} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button size="icon" variant="outline">
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
