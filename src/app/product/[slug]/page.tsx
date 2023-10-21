import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductPrice } from "@/helpers/products";
import { ProductHorizontalList } from "@/components/product-horizontal-list";

interface ProductsDetailsPageProps {
  params: {
    slug: string;
  };
}

async function ProductDetailsPage({
  params: { slug },
}: ProductsDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductPrice(product)} />
      <div>
        <ProductHorizontalList
          title="PRODUTOS RECOMENDADOS"
          products={product.category.products}
        />
      </div>
    </div>
  );
}

export default ProductDetailsPage;
