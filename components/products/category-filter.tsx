import Link from "next/link";
import type { Category } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: Category[];
  activeSlug?: string;
};

export function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  const items = [
    { _id: "all", title: "Hepsi", slug: { current: "" } },
    ...categories,
  ];

  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
      {items.map((cat) => {
        const slug = cat.slug.current;
        const href = slug ? `/urunler/kategori/${slug}` : "/urunler";
        const isActive = slug ? activeSlug === slug : !activeSlug;
        return (
          <Link
            key={cat._id}
            href={href}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-terracotta bg-terracotta text-white shadow-sm"
                : "border-terracotta/30 bg-white/70 text-cocoa hover:border-terracotta/50 hover:bg-terracotta-soft/30"
            )}
          >
            {cat.title}
          </Link>
        );
      })}
    </div>
  );
}
