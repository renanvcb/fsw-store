import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductHorizontalList } from "./components/product-horizontal-list";
import { PromoBanner } from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const categoryNames = {
    keyboards: "Teclados",
    mouses: "Mouses",
    mousepads: "Mousepads",
    headphones: "Fones",
    monitors: "Monitores",
    speakers: "Speakers",
  };

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="py-7">
      <PromoBanner
        src="/banner-home-01.png"
        alt="banner contendo o texto até 55% de desconto só esse mês"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <ProductHorizontalList title="Ofertas" products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="banner contendo o texto até 55% de desconto em mouses"
      />

      <div className="mt-8">
        <ProductHorizontalList
          title={
            categoryNames[
              keyboards[0].category.slug as keyof typeof categoryNames
            ]
          }
          products={keyboards}
        />
      </div>
    </div>
  );
}
