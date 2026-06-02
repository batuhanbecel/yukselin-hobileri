import Link from "next/link";
import { Fragment } from "react";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Sayfa konumu"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-cocoa-soft"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-terracotta"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "text-cocoa" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-terracotta/40">›</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
