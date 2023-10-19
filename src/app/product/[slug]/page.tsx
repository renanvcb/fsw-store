import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductPrice } from "@/helpers/products";

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
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductPrice(product)} />
    </div>
  );
}

export default ProductDetailsPage;
