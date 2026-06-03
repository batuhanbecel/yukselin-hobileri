"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ProductColor, ProductStatus } from "@/lib/sanity/types";

export const inputCls =
  "w-full rounded-lg border border-bordeaux/20 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux/20";

export const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "available", label: "Stokta" },
  { value: "made-to-order", label: "Sipariş üzerine" },
  { value: "sold", label: "Satıldı" },
];

export function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
        {label}
        {required && <span className="text-bordeaux">•</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-soft">{hint}</span>}
    </label>
  );
}

type ColorEditorProps = {
  colors: ProductColor[];
  onChange: (next: ProductColor[]) => void;
};

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

export function ColorEditor({ colors, onChange }: ColorEditorProps) {
  const update = (i: number, patch: Partial<ProductColor>) => {
    const next = colors.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
    onChange(next);
  };
  const remove = (i: number) => {
    onChange(colors.filter((_, idx) => idx !== i));
  };
  const add = () => {
    onChange([...colors, { _key: randomKey(), name: "", hex: "" }]);
  };

  return (
    <div className="space-y-2">
      {colors.length === 0 && (
        <p className="text-xs text-ink-soft/70">Henüz renk yok.</p>
      )}
      {colors.map((c, i) => (
        <div
          key={c._key ?? i}
          className="flex items-center gap-2 rounded-lg border border-bordeaux/15 bg-paper p-2"
        >
          <input
            type="color"
            value={c.hex?.startsWith("#") ? c.hex : `#${c.hex || "c4756c"}`}
            onChange={(e) => update(i, { hex: e.target.value })}
            className="size-9 cursor-pointer rounded border border-bordeaux/20"
            aria-label="Renk seç"
          />
          <input
            value={c.name}
            onChange={(e) => update(i, { name: e.target.value })}
            placeholder="Renk adı (örn. Pembe)"
            className="flex-1 rounded border border-bordeaux/15 bg-ivory px-2 py-1.5 text-sm focus:border-bordeaux focus:outline-none"
          />
          <input
            value={c.hex || ""}
            onChange={(e) => update(i, { hex: e.target.value })}
            placeholder="#c4756c"
            className="w-24 rounded border border-bordeaux/15 bg-ivory px-2 py-1.5 font-mono text-xs focus:border-bordeaux focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="rounded p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
            aria-label="Sil"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 rounded-full border border-dashed border-bordeaux/30 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-bordeaux hover:bg-bordeaux/10"
      >
        <Plus className="size-3" /> Renk ekle
      </button>
    </div>
  );
}
