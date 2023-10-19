import { prismaClient } from "@/lib/prisma";

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

  return <h1>{product.name}</h1>;
}

export default ProductDetailsPage;
