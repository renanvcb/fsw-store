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

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
    include: {
      category: true,
    },
  });

  return (
    <div className="flex flex-col gap-8 py-7">
      <PromoBanner
        src="/banner-home-01.png"
        alt="banner contendo o texto até 55% de desconto só esse mês"
      />

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <ProductHorizontalList title="Ofertas" products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="banner contendo o texto até 55% de desconto em mouses"
      />

      <div>
        <ProductHorizontalList
          title={
            categoryNames[
              keyboards[0].category.slug as keyof typeof categoryNames
            ]
          }
          products={keyboards}
        />
      </div>

      <PromoBanner
        src="/banner-fones.png"
        alt="banner contendo o texto até 20% de desconto em fones"
      />

      <div>
        <ProductHorizontalList
          title={
            categoryNames[mouses[0].category.slug as keyof typeof categoryNames]
          }
          products={mouses}
        />
      </div>
    </div>
  );
}
