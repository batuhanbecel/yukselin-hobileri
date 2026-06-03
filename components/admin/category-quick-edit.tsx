"use client";

import { inputCls } from "@/components/admin/form-fields";
import { InlineEditActions } from "@/components/admin/inline-edit-actions";
import { slugify } from "@/lib/slugify";

export type CategoryQuickDraft = {
  title: string;
  order: string;
};

type CategoryQuickEditProps = {
  slug?: string;
  productCount: number;
  draft: CategoryQuickDraft;
  saving: boolean;
  onChange: (patch: Partial<CategoryQuickDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function CategoryQuickEdit({
  slug,
  productCount,
  draft,
  saving,
  onChange,
  onSave,
  onCancel,
}: CategoryQuickEditProps) {
  const previewSlug = draft.title.trim()
    ? slugify(draft.title)
    : slug;

  return (
    <div className="border-t border-bordeaux/10 bg-ivory-deep/25 p-4 sm:p-5">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-bordeaux">
        Hızlı düzenleme
      </p>
      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
            Kategori adı
          </span>
          <input
            value={draft.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className={inputCls}
            autoFocus
          />
          {previewSlug && (
            <span className="mt-1 block text-xs text-ink-soft">
              URL: /urunler/kategori/{previewSlug}
            </span>
          )}
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
      </div>
      <p className="mt-3 text-xs text-ink-soft">
        {productCount} ürün bu kategoriye bağlı
      </p>
      <div className="mt-4">
        <InlineEditActions
          onSave={onSave}
          onCancel={onCancel}
          saving={saving}
          disabled={!draft.title.trim()}
        />
      </div>
    </div>
  );
}

export function categoryToDraft(cat: {
  title: string;
  order?: number;
}): CategoryQuickDraft {
  return {
    title: cat.title,
    order: String(cat.order ?? 0),
  };
}
