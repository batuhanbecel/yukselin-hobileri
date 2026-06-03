"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  Zap,
} from "lucide-react";
import {
  ProductQuickEdit,
  productToDraft,
  type CategoryOption,
  type ProductQuickDraft,
} from "@/components/admin/product-quick-edit";
import { formatPrice } from "@/lib/format";
import { parseApiResponse } from "@/lib/parse-api-response";
import type { ProductStatus } from "@/lib/sanity/types";

type ListItem = {
  _id: string;
  title: string;
  slug?: string;
  price: number;
  salePrice?: number;
  status?: ProductStatus;
  featured?: boolean;
  order?: number;
  categoryTitle?: string;
  categoryId?: string;
  thumb?: string;
  _updatedAt?: string;
};

const STATUS_META: Record<
  NonNullable<ListItem["status"]>,
  { label: string; cls: string }
> = {
  available: {
    label: "Stokta",
    cls: "border-olive/40 bg-olive/10 text-[#3f5a3a]",
  },
  "made-to-order": {
    label: "Sipariş",
    cls: "border-gold/40 bg-gold/10 text-[#8a6d2f]",
  },
  sold: {
    label: "Satıldı",
    cls: "border-ink/30 bg-ink/10 text-ink",
  },
};

export function ProductsList() {
  const [items, setItems] = useState<ListItem[] | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductQuickDraft | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);
      const productsParsed = await parseApiResponse<{
        products?: ListItem[];
        error?: string;
      }>(productsRes);
      if (!productsParsed.ok) throw new Error(productsParsed.error);

      const categoriesParsed = await parseApiResponse<{
        categories?: CategoryOption[];
      }>(categoriesRes);
      if (categoriesParsed.ok && categoriesParsed.data.categories) {
        setCategories(categoriesParsed.data.categories);
      }

      setItems(productsParsed.data.products ?? []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startQuickEdit = (item: ListItem) => {
    setEditingId(item._id);
    setDraft(productToDraft(item));
    setSaveError(null);
  };

  const cancelQuickEdit = () => {
    setEditingId(null);
    setDraft(null);
    setSaveError(null);
  };

  const handleQuickSave = async () => {
    if (!editingId || !draft) return;
    const price = Number(draft.price);
    if (!draft.title.trim() || Number.isNaN(price) || price < 0) {
      setSaveError("Başlık ve geçerli bir fiyat gerekli.");
      return;
    }

    setSavingId(editingId);
    setSaveError(null);

    const saleRaw = draft.salePrice.trim();
    const salePrice = saleRaw ? Number(saleRaw) : null;

    try {
      const res = await fetch(`/api/admin/products/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title.trim(),
          price,
          salePrice: salePrice && salePrice > 0 ? salePrice : null,
          categoryId: draft.categoryId || null,
          status: draft.status,
          order: Number(draft.order) || 0,
          featured: draft.featured,
        }),
      });
      const parsed = await parseApiResponse<{ error?: string }>(res);
      if (!parsed.ok) throw new Error(parsed.error);

      const categoryTitle =
        categories.find((c) => c._id === draft.categoryId)?.title || undefined;

      setItems((prev) =>
        prev?.map((p) =>
          p._id === editingId
            ? {
                ...p,
                title: draft.title.trim(),
                price,
                salePrice:
                  salePrice && salePrice > 0 ? salePrice : undefined,
                categoryId: draft.categoryId || undefined,
                categoryTitle,
                status: draft.status,
                order: Number(draft.order) || 0,
                featured: draft.featured,
              }
            : p
        ) ?? null
      );
      cancelQuickEdit();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Kayıt başarısız.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (item: ListItem) => {
    if (
      !confirm(
        `"${item.title}" ürününü silmek istediğinden emin misin? Bu işlem geri alınamaz.`
      )
    ) {
      return;
    }
    if (editingId === item._id) cancelQuickEdit();
    setDeletingId(item._id);
    try {
      const res = await fetch(`/api/admin/products/${item._id}`, {
        method: "DELETE",
      });
      const parsed = await parseApiResponse<{ error?: string }>(res);
      if (!parsed.ok) throw new Error(parsed.error);
      setItems((prev) => prev?.filter((p) => p._id !== item._id) ?? null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Silme başarısız.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-bordeaux">koleksiyon</p>
          <h1 className="font-heading text-4xl text-ink sm:text-5xl">
            Ürünler
          </h1>
          <p className="mt-2 text-ink-soft">
            {items === null
              ? "Yükleniyor..."
              : `Toplam ${items.length} ürün · satıra tıkla veya ⚡ ile hızlı düzenle`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-bordeaux/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink hover:bg-bordeaux/10"
          >
            <RefreshCw className="size-4" /> Yenile
          </button>
          <Link
            href="/admin/yeni-urun"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-medium uppercase tracking-wider text-paper hover:bg-bordeaux"
          >
            <Plus className="size-4" /> Yeni Ürün
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {items === null && !error ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-8 animate-spin text-bordeaux" />
        </div>
      ) : items && items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-bordeaux/30 bg-paper/60 px-6 py-20 text-center">
          <p className="font-hand text-2xl text-bordeaux">henüz ürün yok</p>
          <p className="mt-2 text-ink-soft">
            <Link
              href="/admin/yeni-urun"
              className="link-underline text-bordeaux"
            >
              İlk ürününü ekle
            </Link>
          </p>
        </div>
      ) : items ? (
        <div className="overflow-hidden rounded-2xl border border-bordeaux/15 bg-paper">
          <table className="w-full text-sm">
            <thead className="border-b border-bordeaux/10 bg-ivory-deep/30 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
              <tr>
                <th className="p-3 w-16" />
                <th className="p-3">Ürün</th>
                <th className="p-3 hidden md:table-cell">Kategori</th>
                <th className="p-3 text-right">Fiyat</th>
                <th className="p-3 hidden sm:table-cell">Durum</th>
                <th className="p-3 text-right hidden lg:table-cell">Sıra</th>
                <th className="p-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bordeaux/5">
              {items.map((item) => {
                const statusMeta = item.status
                  ? STATUS_META[item.status]
                  : null;
                const isEditing = editingId === item._id;

                return (
                  <Fragment key={item._id}>
                    <tr
                      className={`cursor-pointer transition-colors ${
                        isEditing
                          ? "bg-bordeaux/5"
                          : "hover:bg-ivory-deep/20"
                      }`}
                      onClick={() => {
                        if (!isEditing) startQuickEdit(item);
                      }}
                    >
                      <td className="p-3">
                        <div className="relative size-14 overflow-hidden rounded-lg bg-ivory-deep">
                          {item.thumb && (
                            <Image
                              src={item.thumb}
                              alt={item.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-base text-ink">
                            {item.title}
                          </span>
                          {item.featured && (
                            <Star className="size-3.5 fill-gold text-gold" />
                          )}
                        </div>
                        {item.slug && (
                          <p className="text-xs text-ink-soft/70">
                            /urunler/{item.slug}
                          </p>
                        )}
                      </td>
                      <td className="p-3 text-ink-soft hidden md:table-cell">
                        {item.categoryTitle || "—"}
                      </td>
                      <td className="p-3 text-right">
                        {item.salePrice ? (
                          <div className="flex flex-col items-end leading-tight">
                            <span className="text-xs text-ink-soft line-through">
                              {formatPrice(item.price)}
                            </span>
                            <span className="font-medium text-bordeaux">
                              {formatPrice(item.salePrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium text-ink">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        {statusMeta && (
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusMeta.cls}`}
                          >
                            {statusMeta.label}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right text-ink-soft hidden lg:table-cell">
                        {item.order ?? 0}
                      </td>
                      <td className="p-3">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              isEditing
                                ? cancelQuickEdit()
                                : startQuickEdit(item)
                            }
                            className={`rounded p-1.5 ${
                              isEditing
                                ? "bg-bordeaux/15 text-bordeaux"
                                : "text-ink-soft hover:bg-bordeaux/10 hover:text-bordeaux"
                            }`}
                            title="Hızlı düzenle"
                          >
                            <Zap className="size-4" />
                          </button>
                          {item.slug && (
                            <Link
                              href={`/urunler/${item.slug}`}
                              target="_blank"
                              className="rounded p-1.5 text-ink-soft hover:bg-bordeaux/10 hover:text-bordeaux"
                              title="Sitede gör"
                            >
                              ↗
                            </Link>
                          )}
                          <Link
                            href={`/admin/urunler/${item._id}/duzenle`}
                            className="rounded p-1.5 text-ink-soft hover:bg-bordeaux/10 hover:text-bordeaux"
                            title="Tam düzenleme"
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={deletingId === item._id}
                            className="rounded p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                            title="Sil"
                          >
                            {deletingId === item._id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isEditing && draft && (
                      <tr>
                        <td colSpan={7} className="p-0">
                          {saveError && (
                            <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                              {saveError}
                            </div>
                          )}
                          <ProductQuickEdit
                            productId={item._id}
                            slug={item.slug}
                            draft={draft}
                            categories={categories}
                            saving={savingId === item._id}
                            onChange={(patch) =>
                              setDraft((d) => (d ? { ...d, ...patch } : d))
                            }
                            onSave={handleQuickSave}
                            onCancel={cancelQuickEdit}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
