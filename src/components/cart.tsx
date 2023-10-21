import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductPrice } from "@/helpers/products";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const { products, cartBasePrice, cartTotalPrice, cartTotalDiscount } =
    useContext(CartContext);

  async function handleFinishPurchase() {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full flex-col overflow-hidden">
        <ScrollArea>
          <div className="flex flex-col gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Seu carrinho está vazio! Vamos às compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {cartBasePrice.toFixed(2).replace(".", ",")}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>- R$ {cartTotalDiscount.toFixed(2).replace(".", ",")}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {cartTotalPrice.toFixed(2).replace(".", ",")}</p>
        </div>

        <Button
          onClick={handleFinishPurchase}
          className="mt-7 font-bold uppercase"
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}

export default Cart;
