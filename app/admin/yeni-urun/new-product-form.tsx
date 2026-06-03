"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Loader2, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";
import type { Category, ProductStatus } from "@/lib/sanity/types";

type Props = {
  categories: Category[];
};

type GenerationState =
  | { status: "idle" }
  | { status: "generating" }
  | { status: "ready"; originalUrl: string; generatedUrl: string }
  | { status: "error"; message: string };

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "available", label: "Stokta" },
  { value: "made-to-order", label: "Sipariş üzerine" },
  { value: "sold", label: "Satıldı" },
];

export function NewProductForm({ categories }: Props) {
  // UPLOAD STATE
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [gen, setGen] = useState<GenerationState>({ status: "idle" });
  const [customPrompt, setCustomPrompt] = useState("");

  // FORM STATE
  const [title, setTitle] = useState("");
  const [slugManual, setSlugManual] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<ProductStatus>("available");
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [care, setCare] = useState("");
  const [featured, setFeatured] = useState(false);
  const [giftReady, setGiftReady] = useState(false);

  // PUBLISH STATE
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<
    | { status: "idle" }
    | { status: "ok"; slug: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const slug = useMemo(() => {
    if (slugManual.trim()) return slugify(slugManual);
    return slugify(title);
  }, [slugManual, title]);

  const onFile = useCallback((f: File | null) => {
    setFile(f);
    setGen({ status: "idle" });
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(f ? URL.createObjectURL(f) : null);
  }, [filePreview]);

  const handleGenerate = async () => {
    if (!file) return;
    setGen({ status: "generating" });

    const fd = new FormData();
    fd.append("image", file);
    if (customPrompt.trim()) fd.append("prompt", customPrompt.trim());

    try {
      const res = await fetch("/api/admin/generate", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Üretim başarısız.");
      setGen({
        status: "ready",
        originalUrl: data.originalUrl,
        generatedUrl: data.generatedUrl,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
      setGen({ status: "error", message });
    }
  };

  const handlePublish = async () => {
    if (gen.status !== "ready") return;
    if (!title.trim() || !slug || !price) {
      setPublishResult({
        status: "error",
        message: "Başlık, slug ve fiyat zorunlu.",
      });
      return;
    }
    setPublishing(true);
    setPublishResult({ status: "idle" });

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: gen.generatedUrl,
          title: title.trim(),
          slug,
          price: Number(price),
          salePrice: salePrice ? Number(salePrice) : undefined,
          description: description.trim() || undefined,
          categoryId: categoryId || undefined,
          status,
          dimensions: dimensions.trim() || undefined,
          material: material.trim() || undefined,
          care: care.trim() || undefined,
          featured,
          giftReady,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Yayınlama başarısız.");
      setPublishResult({ status: "ok", slug: data.slug });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
      setPublishResult({ status: "error", message });
    } finally {
      setPublishing(false);
    }
  };

  const reset = () => {
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFile(null);
    setFilePreview(null);
    setGen({ status: "idle" });
    setTitle("");
    setSlugManual("");
    setPrice("");
    setSalePrice("");
    setDescription("");
    setCategoryId("");
    setStatus("available");
    setDimensions("");
    setMaterial("");
    setCare("");
    setFeatured(false);
    setGiftReady(false);
    setPublishResult({ status: "idle" });
    setCustomPrompt("");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <p className="font-hand text-2xl text-bordeaux">yeni atölye işi</p>
        <h1 className="font-heading text-4xl text-ink sm:text-5xl">
          Yeni Ürün
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Annenin fotoğrafını yükle → AI temiz ürün vitrini üretsin → formu
          doldur → siteye anında yayınla.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* SOL: FOTOĞRAF */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
              / 01 — Fotoğraf
            </span>
            <span className="h-px flex-1 bg-bordeaux/20" />
          </div>

          {/* File picker */}
          <label className="block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
            <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-bordeaux/30 bg-paper transition-colors hover:border-bordeaux/60">
              {filePreview ? (
                <Image
                  src={filePreview}
                  alt="Yüklenen foto"
                  width={600}
                  height={750}
                  className="size-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto size-10 text-bordeaux/60" />
                  <p className="font-hand mt-3 text-xl text-bordeaux">
                    fotoğraf seç
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    JPG / PNG / WebP — max 12 MB
                  </p>
                </div>
              )}
            </div>
          </label>

          {/* Generate */}
          {file && (
            <>
              <details className="rounded-xl border border-bordeaux/15 bg-paper p-3 text-sm">
                <summary className="cursor-pointer select-none font-medium text-ink-soft">
                  Özel prompt (gelişmiş, isteğe bağlı)
                </summary>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Boş bırakırsan varsayılan kullanılır."
                  className="mt-3 w-full rounded-lg border border-bordeaux/20 bg-ivory p-3 text-sm focus:border-bordeaux focus:outline-none"
                  rows={4}
                />
              </details>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={gen.status === "generating"}
                  className="rounded-full bg-ink text-paper hover:bg-bordeaux disabled:opacity-60"
                >
                  {gen.status === "generating" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Üretiliyor...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      {gen.status === "ready" ? "Yeniden üret" : "Üret"}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onFile(null)}
                  className="rounded-full border-bordeaux/30 text-ink hover:bg-bordeaux/10"
                >
                  <X className="size-4" /> Vazgeç
                </Button>
              </div>
            </>
          )}

          {gen.status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {gen.message}
            </div>
          )}

          {/* Generated preview */}
          {gen.status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-olive">
                  / AI Vitrin
                </span>
                <span className="h-px flex-1 bg-olive/20" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-olive/30 bg-paper">
                <Image
                  src={gen.generatedUrl}
                  alt="AI ürün vitrini"
                  width={800}
                  height={1000}
                  className="size-full object-cover"
                  unoptimized
                />
              </div>
              <p className="text-xs text-ink-soft">
                Beğenmediysen &quot;Yeniden üret&quot; ile tekrar dene.
              </p>
            </motion.div>
          )}
        </section>

        {/* SAĞ: FORM */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
              / 02 — Bilgiler
            </span>
            <span className="h-px flex-1 bg-bordeaux/20" />
          </div>

          <Field label="Ürün adı" required>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Pembe Örgü Omuz Çantası"
              className={inputCls}
            />
          </Field>

          <Field
            label="URL (slug)"
            hint={slug ? `/urunler/${slug}` : "Başlıktan otomatik üretilir."}
          >
            <input
              value={slugManual || slug}
              onChange={(e) => setSlugManual(e.target.value)}
              placeholder="pembe-omuz-cantasi"
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
                placeholder="850"
                className={inputCls}
              />
            </Field>
            <Field label="İndirimli (TL)" hint="Opsiyonel">
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

          <Field label="Açıklama">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Yumuşak pamuk iplikle örülmüş, günlük kullanıma uygun..."
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori">
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
                placeholder="28 × 32 cm"
                className={inputCls}
              />
            </Field>
            <Field label="Malzeme">
              <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="%100 pamuk ipi"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Bakım">
            <input
              value={care}
              onChange={(e) => setCare(e.target.value)}
              placeholder="30°C'de elde yıkanır"
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

          <div className="pt-4">
            <Button
              onClick={handlePublish}
              disabled={
                gen.status !== "ready" ||
                publishing ||
                !title.trim() ||
                !slug ||
                !price
              }
              className="w-full rounded-full bg-ink py-6 text-paper hover:bg-bordeaux disabled:opacity-60"
            >
              {publishing ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Yayınlanıyor...
                </>
              ) : (
                "Sanity'e yayınla"
              )}
            </Button>

            {gen.status !== "ready" && (
              <p className="mt-2 text-xs text-ink-soft">
                Önce fotoğrafı üretmen lazım.
              </p>
            )}
          </div>

          {publishResult.status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {publishResult.message}
            </div>
          )}

          {publishResult.status === "ok" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-olive/40 bg-olive/10 p-5"
            >
              <p className="font-hand text-2xl text-olive">tamamdır!</p>
              <p className="mt-1 text-sm text-ink">
                Ürün yayınlandı.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/urunler/${publishResult.slug}`}
                  target="_blank"
                  className="rounded-full bg-ink px-5 py-2 text-xs font-medium uppercase tracking-wider text-paper hover:bg-bordeaux"
                >
                  Sitede gör ↗
                </Link>
                <button
                  onClick={reset}
                  className="rounded-full border border-bordeaux/30 px-5 py-2 text-xs font-medium uppercase tracking-wider text-ink hover:bg-bordeaux/10"
                >
                  Yeni ürün ekle
                </button>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-bordeaux/20 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-bordeaux focus:outline-none focus:ring-1 focus:ring-bordeaux/20";

function Field({
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
