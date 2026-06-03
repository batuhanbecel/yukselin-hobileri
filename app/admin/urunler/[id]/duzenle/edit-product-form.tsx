"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Loader2, Save } from "lucide-react";
import {
  ColorEditor,
  Field,
  inputCls,
  STATUS_OPTIONS,
} from "@/components/admin/form-fields";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";
import type {
  Category,
  ProductColor,
  ProductStatus,
} from "@/lib/sanity/types";

type Props = {
  id: string;
  categories: Category[];
};

type LoadedProduct = {
  _id: string;
  title?: string;
  slug?: string;
  price?: number;
  salePrice?: number;
  saleBadge?: string;
  description?: string;
  dimensions?: string;
  material?: string;
  care?: string;
  colors?: ProductColor[];
  status?: ProductStatus;
  giftReady?: boolean;
  shopierUrl?: string;
  featured?: boolean;
  order?: number;
  categoryId?: string;
  images?: { _key: string; url?: string; alt?: string }[];
};

export function EditProductForm({ id, categories }: Props) {
  const [loaded, setLoaded] = useState<LoadedProduct | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Form alanları
  const [title, setTitle] = useState("");
  const [slugManual, setSlugManual] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleBadge, setSaleBadge] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<ProductStatus>("available");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [care, setCare] = useState("");
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [shopierUrl, setShopierUrl] = useState("");
  const [order, setOrder] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [giftReady, setGiftReady] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<
    | { status: "idle" }
    | { status: "ok" }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const slug = useMemo(() => {
    if (slugManual.trim()) return slugify(slugManual);
    return slugify(title);
  }, [slugManual, title]);

  // Ürünü yükle
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Yüklenemedi.");
        if (cancelled) return;
        const p = data.product as LoadedProduct;
        setLoaded(p);
        setTitle(p.title || "");
        setSlugManual(p.slug || "");
        setPrice(p.price?.toString() || "");
        setSalePrice(p.salePrice?.toString() || "");
        setSaleBadge(p.saleBadge || "");
        setDescription(p.description || "");
        setCategoryId(p.categoryId || "");
        setStatus(p.status || "available");
        setDimensions(p.dimensions || "");
        setMaterial(p.material || "");
        setCare(p.care || "");
        setColors(p.colors || []);
        setShopierUrl(p.shopierUrl || "");
        setOrder(p.order?.toString() || "0");
        setFeatured(Boolean(p.featured));
        setGiftReady(Boolean(p.giftReady));
      } catch (err) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Bilinmeyen hata.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !slug || !price) {
      setSaveResult({
        status: "error",
        message: "Başlık, slug ve fiyat zorunlu.",
      });
      return;
    }
    setSaving(true);
    setSaveResult({ status: "idle" });

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug,
          price: Number(price),
          salePrice: salePrice ? Number(salePrice) : null,
          saleBadge: saleBadge.trim() || null,
          description: description.trim() || null,
          categoryId: categoryId || null,
          status,
          dimensions: dimensions.trim() || null,
          material: material.trim() || null,
          care: care.trim() || null,
          colors:
            colors.length > 0
              ? colors.map((c) => ({
                  _key: c._key,
                  name: c.name,
                  hex: c.hex,
                }))
              : null,
          shopierUrl: shopierUrl.trim() || null,
          featured,
          giftReady,
          order: order ? Number(order) : 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kaydedilemedi.");
      setSaveResult({ status: "ok" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
      setSaveResult({ status: "error", message });
    } finally {
      setSaving(false);
    }
  };

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-red-700">{loadError}</p>
        <Link
          href="/admin/urunler"
          className="mt-4 inline-block text-bordeaux hover:underline"
        >
          Listeye dön
        </Link>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-bordeaux" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/admin/urunler"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-ink-soft hover:text-bordeaux"
          >
            <ArrowLeft className="size-3" /> Ürünler
          </Link>
          <h1 className="font-heading mt-2 text-4xl text-ink sm:text-5xl">
            {title || "Ürün düzenle"}
          </h1>
          {loaded.slug && (
            <Link
              href={`/urunler/${loaded.slug}`}
              target="_blank"
              className="mt-2 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-bordeaux"
            >
              /urunler/{loaded.slug} <ExternalLink className="size-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Görseller (read-only) */}
      <section className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / Görseller
          </span>
          <span className="h-px flex-1 bg-bordeaux/20" />
        </div>
        {loaded.images && loaded.images.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {loaded.images.map((img, i) => (
              <div
                key={img._key || i}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-bordeaux/15 bg-paper"
              >
                {img.url && (
                  <Image
                    src={img.url}
                    alt={img.alt || `Görsel ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                )}
                <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-paper backdrop-blur">
                  {i === 0 ? "Ana" : `#${i + 1}`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">Görsel yok.</p>
        )}
        <p className="text-xs text-ink-soft">
          Görsel eklemek / değiştirmek için{" "}
          <Link
            href="/studio"
            target="_blank"
            className="text-bordeaux hover:underline"
          >
            Sanity Studio
          </Link>
          'yu kullan.
        </p>
      </section>

      {/* Bilgiler */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / Bilgiler
          </span>
          <span className="h-px flex-1 bg-bordeaux/20" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Ürün adı" required>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="URL (slug)" hint={`/urunler/${slug || "—"}`}>
              <input
                value={slugManual}
                onChange={(e) => setSlugManual(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Fiyat (TL)" required>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="İndirimli (TL)" hint="Boşaltırsan kaldırılır">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            {salePrice && (
              <Field
                label="İndirim rozeti"
                hint="Boş bırakırsan otomatik &quot;%X indirim&quot;."
              >
                <input
                  value={saleBadge}
                  onChange={(e) => setSaleBadge(e.target.value)}
                  className={inputCls}
                />
              </Field>
            )}

            <Field label="Açıklama">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={inputCls}
              />
            </Field>

            <Field label="Renk seçenekleri">
              <ColorEditor colors={colors} onChange={setColors} />
            </Field>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Kategori"
                hint={
                  <Link
                    href="/admin/kategoriler"
                    target="_blank"
                    className="text-bordeaux hover:underline"
                  >
                    Kategorileri yönet ↗
                  </Link>
                }
              >
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={inputCls}
                >
                  <option value="">— Seç —</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Durum">
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ProductStatus)
                  }
                  className={inputCls}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Boyut">
                <input
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Malzeme">
                <input
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Bakım">
              <input
                value={care}
                onChange={(e) => setCare(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Shopier linki" hint="Boşaltırsan kaldırılır.">
              <input
                value={shopierUrl}
                onChange={(e) => setShopierUrl(e.target.value)}
                placeholder="https://www.shopier.com/..."
                className={inputCls}
              />
            </Field>

            <Field label="Sıralama" hint="Küçük sayı önce">
              <input
                type="number"
                inputMode="numeric"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="flex flex-wrap gap-5 pt-2">
              <label className="inline-flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="size-4 accent-bordeaux"
                />
                Ana sayfada öne çıkar
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={giftReady}
                  onChange={(e) => setGiftReady(e.target.checked)}
                  className="size-4 accent-bordeaux"
                />
                Hediye paketi mevcut
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-bordeaux/10 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft">
              Değişiklikler kaydedildikten hemen sonra canlıda görünür.
            </p>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-ink px-8 py-6 text-paper hover:bg-bordeaux disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="size-4" /> Kaydet
                </>
              )}
            </Button>
          </div>

          {saveResult.status === "error" && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {saveResult.message}
            </div>
          )}

          {saveResult.status === "ok" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-olive/40 bg-olive/10 p-4 text-sm text-olive"
            >
              Kaydedildi.
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
