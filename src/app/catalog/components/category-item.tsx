import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[9.375rem] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[60%] w-auto max-w-[80%] object-contain"
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-2">
          <p className="text-center text-sm font-semibold">{category.name}</p>
        </div>
      </div>
    </Link>
  );
}
