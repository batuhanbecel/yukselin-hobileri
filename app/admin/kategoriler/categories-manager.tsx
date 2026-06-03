"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Loader2, Plus, RefreshCw, Trash2, Zap } from "lucide-react";
import {
  CategoryQuickEdit,
  categoryToDraft,
  type CategoryQuickDraft,
} from "@/components/admin/category-quick-edit";
import { Field, inputCls } from "@/components/admin/form-fields";
import { Button } from "@/components/ui/button";
import { parseApiResponse } from "@/lib/parse-api-response";
import { slugify } from "@/lib/slugify";

type CategoryRow = {
  _id: string;
  title: string;
  slug?: string;
  order?: number;
  productCount: number;
};

export function CategoriesManager() {
  const [items, setItems] = useState<CategoryRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newOrder, setNewOrder] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CategoryQuickDraft | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const parsed = await parseApiResponse<{
        categories?: CategoryRow[];
        error?: string;
      }>(res);
      if (!parsed.ok) throw new Error(parsed.error);
      setItems(parsed.data.categories ?? []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          order: newOrder ? Number(newOrder) : 0,
        }),
      });
      const parsed = await parseApiResponse<{ error?: string }>(res);
      if (!parsed.ok) throw new Error(parsed.error);
      setNewTitle("");
      setNewOrder("");
      await load();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Bilinmeyen hata.");
    } finally {
      setCreating(false);
    }
  };

  const startQuickEdit = (cat: CategoryRow) => {
    setEditingId(cat._id);
    setDraft(categoryToDraft(cat));
    setSaveError(null);
  };

  const cancelQuickEdit = () => {
    setEditingId(null);
    setDraft(null);
    setSaveError(null);
  };

  const handleQuickSave = async () => {
    if (!editingId || !draft || !draft.title.trim()) return;
    setBusyId(editingId);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/categories/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draft.title.trim(),
          order: draft.order ? Number(draft.order) : 0,
        }),
      });
      const parsed = await parseApiResponse<{ error?: string }>(res);
      if (!parsed.ok) throw new Error(parsed.error);

      const newSlug = slugify(draft.title.trim());
      setItems((prev) =>
        prev?.map((c) =>
          c._id === editingId
            ? {
                ...c,
                title: draft.title.trim(),
                slug: newSlug,
                order: Number(draft.order) || 0,
              }
            : c
        ) ?? null
      );
      cancelQuickEdit();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Kayıt başarısız.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (cat: CategoryRow) => {
    if (cat.productCount > 0) {
      alert(
        `"${cat.title}" kategorisi ${cat.productCount} üründe kullanılıyor. Önce o ürünlerin kategorisini değiştir.`
      );
      return;
    }
    if (!confirm(`"${cat.title}" kategorisini silmek istediğinden emin misin?`)) {
      return;
    }
    if (editingId === cat._id) cancelQuickEdit();
    setBusyId(cat._id);
    try {
      const res = await fetch(`/api/admin/categories/${cat._id}`, {
        method: "DELETE",
      });
      const parsed = await parseApiResponse<{ error?: string }>(res);
      if (!parsed.ok) throw new Error(parsed.error);
      setItems((prev) => prev?.filter((c) => c._id !== cat._id) ?? null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Silme başarısız.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10">
        <p className="font-hand text-2xl text-bordeaux">koleksiyon türleri</p>
        <h1 className="font-heading text-4xl text-ink sm:text-5xl">
          Kategoriler
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Satıra tıklayarak ad ve sırayı düzenle — sayfa değiştirmeden kaydet.
        </p>
      </div>

      <section className="mb-10 rounded-2xl border border-bordeaux/15 bg-paper p-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / Yeni
          </span>
          <span className="h-px flex-1 bg-bordeaux/20" />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_120px_auto]">
          <Field label="Kategori adı" required>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newTitle.trim()) handleCreate();
              }}
              placeholder="Hırka"
              className={inputCls}
            />
            {newTitle.trim() && (
              <span className="mt-1 block text-xs text-ink-soft">
                URL: {slugify(newTitle)}
              </span>
            )}
          </Field>
          <Field label="Sıra">
            <input
              type="number"
              inputMode="numeric"
              value={newOrder}
              onChange={(e) => setNewOrder(e.target.value)}
              placeholder="0"
              className={inputCls}
            />
          </Field>
          <div className="flex items-end">
            <Button
              onClick={handleCreate}
              disabled={!newTitle.trim() || creating}
              className="w-full rounded-full bg-ink text-paper hover:bg-bordeaux disabled:opacity-60"
            >
              {creating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
              Ekle
            </Button>
          </div>
        </div>

        {createError && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            {createError}
          </div>
        )}
      </section>

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / Mevcut
          </span>
          <span className="h-px w-24 bg-bordeaux/20" />
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-bordeaux"
        >
          <RefreshCw className="size-3" /> Yenile
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {items === null && !error ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-6 animate-spin text-bordeaux" />
        </div>
      ) : items && items.length === 0 ? (
        <p className="py-12 text-center text-ink-soft">Henüz kategori yok.</p>
      ) : items ? (
        <div className="overflow-hidden rounded-2xl border border-bordeaux/15 bg-paper">
          <table className="w-full text-sm">
            <thead className="border-b border-bordeaux/10 bg-ivory-deep/30 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
              <tr>
                <th className="p-3">Kategori</th>
                <th className="p-3 text-right">Sıra</th>
                <th className="p-3 text-right">Ürün</th>
                <th className="p-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bordeaux/5">
              {items.map((cat) => {
                const isEditing = editingId === cat._id;
                const isBusy = busyId === cat._id;

                return (
                  <Fragment key={cat._id}>
                    <tr
                      className={`cursor-pointer transition-colors ${
                        isEditing
                          ? "bg-bordeaux/5"
                          : "hover:bg-ivory-deep/20"
                      }`}
                      onClick={() => {
                        if (!isEditing) startQuickEdit(cat);
                      }}
                    >
                      <td className="p-3">
                        <p className="font-heading text-lg text-ink">
                          {cat.title}
                        </p>
                        {cat.slug && (
                          <p className="text-xs text-ink-soft/70">
                            /urunler/kategori/{cat.slug}
                          </p>
                        )}
                      </td>
                      <td className="p-3 text-right text-ink-soft">
                        {cat.order ?? 0}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={
                            cat.productCount > 0
                              ? "font-medium text-bordeaux"
                              : "text-ink-soft/70"
                          }
                        >
                          {cat.productCount}
                        </span>
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
                                : startQuickEdit(cat)
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
                          <button
                            type="button"
                            onClick={() => handleDelete(cat)}
                            disabled={
                              isBusy || cat.productCount > 0
                            }
                            className="rounded p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                            title={
                              cat.productCount > 0
                                ? "Önce kullanan ürünleri kaldır"
                                : "Sil"
                            }
                          >
                            {isBusy ? (
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
                        <td colSpan={4} className="p-0">
                          {saveError && (
                            <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
                              {saveError}
                            </div>
                          )}
                          <CategoryQuickEdit
                            slug={cat.slug}
                            productCount={cat.productCount}
                            draft={draft}
                            saving={isBusy}
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
