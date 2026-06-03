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
    <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-bordeaux/10 pb-6">
      {items.map((cat) => {
        const slug = cat.slug.current;
        const href = slug ? `/urunler/kategori/${slug}` : "/urunler";
        const isActive = slug ? activeSlug === slug : !activeSlug;
        return (
          <Link
            key={cat._id}
            href={href}
            className={cn(
              "relative py-1 text-xs font-medium uppercase tracking-[0.22em] transition-colors",
              isActive
                ? "text-bordeaux"
                : "text-ink-soft hover:text-ink"
            )}
          >
            {cat.title}
            {isActive && (
              <span className="absolute -bottom-[7px] left-0 right-0 h-px bg-bordeaux" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
