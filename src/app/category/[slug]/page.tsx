import { computeProductPrice } from "@/helpers/products";
import { ProductItem } from "@/components/product-Item";
import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { CATEGORY_ICON } from "@/constants/category-icon";

async function CategoryProducts({ params }: any) {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }
  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8">
        {category.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductPrice(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
