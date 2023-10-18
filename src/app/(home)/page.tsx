import Image from "next/image";
import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductHorizontalList } from "./components/product-horizontal-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="py-7">
      <Image
        src="/banner-home-01.png"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="banner contendo o texto até 55% de desconto só esse mês"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductHorizontalList title="Ofertas" products={deals} />
      </div>

      <Image
        src="/banner-mouses.png"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="banner contendo o texto até 55% de desconto em mouses"
      />
    </div>
  );
}
