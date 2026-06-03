"use client";

import Link from "next/link";
import {
  inputCls,
  STATUS_OPTIONS,
} from "@/components/admin/form-fields";
import { InlineEditActions } from "@/components/admin/inline-edit-actions";
import type { ProductStatus } from "@/lib/sanity/types";

export type CategoryOption = { _id: string; title: string };

export type ProductQuickDraft = {
  title: string;
  price: string;
  salePrice: string;
  categoryId: string;
  status: ProductStatus;
  order: string;
  featured: boolean;
};

type ProductQuickEditProps = {
  productId: string;
  slug?: string;
  draft: ProductQuickDraft;
  categories: CategoryOption[];
  saving: boolean;
  onChange: (patch: Partial<ProductQuickDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function ProductQuickEdit({
  productId,
  slug,
  draft,
  categories,
  saving,
  onChange,
  onSave,
  onCancel,
}: ProductQuickEditProps) {
  return (
    <div className="border-t border-bordeaux/10 bg-ivory-deep/25 p-4 sm:p-5">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-bordeaux">
        Hızlı düzenleme
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block sm:col-span-2 lg:col-span-1">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Ürün adı
          </span>
          <input
            value={draft.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Kategori
          </span>
          <select
            value={draft.categoryId}
            onChange={(e) => onChange({ categoryId: e.target.value })}
            className={inputCls}
          >
            <option value="">— Kategori yok —</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Durum
          </span>
          <select
            value={draft.status}
            onChange={(e) =>
              onChange({ status: e.target.value as ProductStatus })
            }
            className={inputCls}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Fiyat (₺)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={draft.price}
            onChange={(e) => onChange({ price: e.target.value })}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            İndirimli fiyat
          </span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={draft.salePrice}
            onChange={(e) => onChange({ salePrice: e.target.value })}
            placeholder="Boş = indirim yok"
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Sıra
          </span>
          <input
            type="number"
            inputMode="numeric"
            value={draft.order}
            onChange={(e) => onChange({ order: e.target.value })}
            className={inputCls}
          />
        </label>

        <label className="flex items-center gap-2 self-end pb-2">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => onChange({ featured: e.target.checked })}
            className="size-4 rounded border-bordeaux/30 text-bordeaux focus:ring-bordeaux/30"
          />
          <span className="text-sm text-ink">Vitrinde öne çıkar</span>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <InlineEditActions
          onSave={onSave}
          onCancel={onCancel}
          saving={saving}
          disabled={!draft.title.trim()}
        />
        <Link
          href={`/admin/urunler/${productId}/duzenle`}
          className="text-xs font-medium uppercase tracking-wider text-ink-soft hover:text-bordeaux"
        >
          Tüm alanlar (görsel, açıklama…) →
        </Link>
      </div>

      {slug && (
        <p className="mt-3 text-xs text-ink-soft/70">/urunler/{slug}</p>
      )}
    </div>
  );
}

export function productToDraft(item: {
  title: string;
  price: number;
  salePrice?: number;
  categoryId?: string;
  status?: ProductStatus;
  order?: number;
  featured?: boolean;
}): ProductQuickDraft {
  return {
    title: item.title,
    price: String(item.price ?? 0),
    salePrice: item.salePrice ? String(item.salePrice) : "",
    categoryId: item.categoryId || "",
    status: item.status || "available",
    order: String(item.order ?? 0),
    featured: Boolean(item.featured),
  };
}
