"use client";

import DiscountBadge from "@/components/discount-badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/products";
import { CartContext } from "@/providers/cart";
import { ChevronLeftIcon, ChevronRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  }

  function handleAddProductToCart() {
    addProductToCart({ ...product, quantity });
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2).replace(".", ",")}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-50">
          R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={handleDecreaseQuantity} size="icon" variant="outline">
          <ChevronLeftIcon size={22} />
        </Button>

        <span>{quantity}</span>

        <Button onClick={handleIncreaseQuantity} size="icon" variant="outline">
          <ChevronRightIcon size={22} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold ">Descrição</h3>
        <p className="text-justify text-sm opacity-50">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddProductToCart}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
}

export default ProductInfo;
