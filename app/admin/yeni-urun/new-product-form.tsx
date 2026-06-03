"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Download,
  Loader2,
  RefreshCw,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
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
  categories: Category[];
};

type GenMode = "product" | "lifestyle";

type SlotState =
  | { status: "idle" }
  | { status: "generating" }
  | { status: "ready"; generatedUrl: string; upscaled?: boolean }
  | { status: "error"; message: string };

const SLOT_META: Record<
  GenMode,
  { label: string; section: string; description: string }
> = {
  product: {
    label: "Ürün Vitrini",
    section: "/ AI — Vitrin",
    description: "Still life atmosferik ana fotoğraf.",
  },
  lifestyle: {
    label: "Lifestyle Pozu",
    section: "/ AI — Modelli",
    description: "Mankenli atmosfer fotoğrafı, ikinci görsel.",
  },
};

export function NewProductForm({ categories }: Props) {
  // UPLOAD
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState<string | null>(null);

  // GENERATION SLOTS
  const [product, setProduct] = useState<SlotState>({ status: "idle" });
  const [lifestyle, setLifestyle] = useState<SlotState>({ status: "idle" });
  const [customPrompt, setCustomPrompt] = useState("");

  // FORM
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

  // PUBLISH
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

  const onFile = useCallback(
    (f: File | null) => {
      setFile(f);
      setInputUrl(null);
      setProduct({ status: "idle" });
      setLifestyle({ status: "idle" });
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview(f ? URL.createObjectURL(f) : null);
    },
    [filePreview]
  );

  const generateSlot = useCallback(
    async (mode: GenMode) => {
      if (!file && !inputUrl) return;
      const setter = mode === "product" ? setProduct : setLifestyle;
      setter({ status: "generating" });

      const fd = new FormData();
      fd.append("mode", mode);
      if (inputUrl) {
        fd.append("inputUrl", inputUrl);
      } else if (file) {
        fd.append("image", file);
      }
      if (customPrompt.trim()) fd.append("prompt", customPrompt.trim());

      try {
        const res = await fetch("/api/admin/generate", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Üretim başarısız.");
        if (data.inputUrl && !inputUrl) setInputUrl(data.inputUrl);
        setter({
          status: "ready",
          generatedUrl: data.generatedUrl,
          upscaled: Boolean(data.upscaled),
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
        setter({ status: "error", message });
      }
    },
    [file, inputUrl, customPrompt]
  );

  const generateBoth = useCallback(async () => {
    await Promise.all([generateSlot("product"), generateSlot("lifestyle")]);
  }, [generateSlot]);

  const downloadImage = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("download error:", err);
      window.open(url, "_blank");
    }
  };

  const publishImageUrls = useMemo(() => {
    const urls: string[] = [];
    if (product.status === "ready") urls.push(product.generatedUrl);
    if (lifestyle.status === "ready") urls.push(lifestyle.generatedUrl);
    return urls;
  }, [product, lifestyle]);

  const canPublish =
    publishImageUrls.length > 0 && title.trim() && slug && price;

  const handlePublish = async () => {
    if (!canPublish) return;
    setPublishing(true);
    setPublishResult({ status: "idle" });

    const cleanedColors = colors
      .filter((c) => c.name.trim())
      .map((c) => ({
        _key: c._key,
        name: c.name.trim(),
        hex: c.hex?.trim() || undefined,
      }));

    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrls: publishImageUrls,
          title: title.trim(),
          slug,
          price: Number(price),
          salePrice: salePrice ? Number(salePrice) : undefined,
          saleBadge: saleBadge.trim() || undefined,
          description: description.trim() || undefined,
          categoryId: categoryId || undefined,
          status,
          dimensions: dimensions.trim() || undefined,
          material: material.trim() || undefined,
          care: care.trim() || undefined,
          colors: cleanedColors.length > 0 ? cleanedColors : undefined,
          shopierUrl: shopierUrl.trim() || undefined,
          order: order ? Number(order) : 0,
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
    setInputUrl(null);
    setProduct({ status: "idle" });
    setLifestyle({ status: "idle" });
    setTitle("");
    setSlugManual("");
    setPrice("");
    setSalePrice("");
    setSaleBadge("");
    setDescription("");
    setCategoryId("");
    setStatus("available");
    setDimensions("");
    setMaterial("");
    setCare("");
    setColors([]);
    setShopierUrl("");
    setOrder("0");
    setFeatured(false);
    setGiftReady(false);
    setPublishResult({ status: "idle" });
    setCustomPrompt("");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="font-hand text-2xl text-bordeaux">yeni atölye işi</p>
        <h1 className="font-heading text-4xl text-ink sm:text-5xl">
          Yeni Ürün
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Fotoğrafını yükle → AI hem temiz ürün vitrini hem mankenli
          lifestyle pozu üretsin → formu doldur → siteye yayınla.
        </p>
      </div>

      {/* === GÖRSELLER === */}
      <section className="mb-12 space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / 01 — Görseller
          </span>
          <span className="h-px flex-1 bg-bordeaux/20" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
              Orijinal
            </p>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-bordeaux/30 bg-paper transition-colors hover:border-bordeaux/60">
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
                  <div className="text-center px-4">
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

            {file && (
              <Button
                variant="outline"
                onClick={() => onFile(null)}
                className="w-full rounded-full border-bordeaux/30 text-ink hover:bg-bordeaux/10"
              >
                <X className="size-4" /> Değiştir
              </Button>
            )}
          </div>

          <GenerationSlot
            mode="product"
            state={product}
            enabled={Boolean(file || inputUrl)}
            onGenerate={() => generateSlot("product")}
            onDownload={(url) =>
              downloadImage(url, `${slug || "urun"}-vitrin.jpg`)
            }
          />

          <GenerationSlot
            mode="lifestyle"
            state={lifestyle}
            enabled={Boolean(file || inputUrl)}
            onGenerate={() => generateSlot("lifestyle")}
            onDownload={(url) =>
              downloadImage(url, `${slug || "urun"}-lifestyle.jpg`)
            }
          />
        </div>

        {(file || inputUrl) && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={generateBoth}
              disabled={
                product.status === "generating" ||
                lifestyle.status === "generating"
              }
              className="rounded-full bg-ink text-paper hover:bg-bordeaux disabled:opacity-60"
            >
              <Sparkles className="size-4" />
              İkisini birden üret
            </Button>
            <details className="flex-1 rounded-xl border border-bordeaux/15 bg-paper p-3 text-sm">
              <summary className="cursor-pointer select-none font-medium text-ink-soft">
                Özel prompt (gelişmiş, isteğe bağlı)
              </summary>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Boş bırakırsan varsayılan kullanılır. Bu prompt iki üretim için de geçerli."
                className="mt-3 w-full rounded-lg border border-bordeaux/20 bg-ivory p-3 text-sm focus:border-bordeaux focus:outline-none"
                rows={4}
              />
            </details>
          </div>
        )}
      </section>

      {/* === BİLGİLER === */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
            / 02 — Bilgiler
          </span>
          <span className="h-px flex-1 bg-bordeaux/20" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* SOL */}
          <div className="space-y-5">
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

            {salePrice && (
              <Field
                label="İndirim rozeti"
                hint="Boş bırakırsan otomatik &quot;%X indirim&quot; yazılır."
              >
                <input
                  value={saleBadge}
                  onChange={(e) => setSaleBadge(e.target.value)}
                  placeholder="Yaza özel"
                  className={inputCls}
                />
              </Field>
            )}

            <Field label="Açıklama">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Yumuşak pamuk iplikle örülmüş, günlük kullanıma uygun..."
                className={inputCls}
              />
            </Field>

            <Field label="Renk seçenekleri">
              <ColorEditor colors={colors} onChange={setColors} />
            </Field>
          </div>

          {/* SAĞ */}
          <div className="space-y-5">
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

            <Field label="Shopier linki" hint="Opsiyonel">
              <input
                value={shopierUrl}
                onChange={(e) => setShopierUrl(e.target.value)}
                placeholder="https://www.shopier.com/..."
                className={inputCls}
              />
            </Field>

            <Field
              label="Sıralama"
              hint="Küçük sayı önce gösterilir. Default: 0"
            >
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
              {publishImageUrls.length === 0
                ? "En az 1 görsel üretmen gerek."
                : `${publishImageUrls.length} görsel hazır. Yayınladığında galeriye eklenir.`}
            </p>
            <Button
              onClick={handlePublish}
              disabled={!canPublish || publishing}
              className="rounded-full bg-ink px-8 py-6 text-paper hover:bg-bordeaux disabled:opacity-60"
            >
              {publishing ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Yayınlanıyor...
                </>
              ) : (
                "Sanity'e yayınla"
              )}
            </Button>
          </div>

          {publishResult.status === "error" && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {publishResult.message}
            </div>
          )}

          {publishResult.status === "ok" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-2xl border border-olive/40 bg-olive/10 p-5"
            >
              <p className="font-hand text-2xl text-olive">tamamdır!</p>
              <p className="mt-1 text-sm text-ink">Ürün yayınlandı.</p>
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
                <Link
                  href="/admin/urunler"
                  className="rounded-full border border-bordeaux/30 px-5 py-2 text-xs font-medium uppercase tracking-wider text-ink hover:bg-bordeaux/10"
                >
                  Tüm ürünler
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

/* --- Slot --- */

function GenerationSlot({
  mode,
  state,
  enabled,
  onGenerate,
  onDownload,
}: {
  mode: GenMode;
  state: SlotState;
  enabled: boolean;
  onGenerate: () => void;
  onDownload: (url: string) => void;
}) {
  const meta = SLOT_META[mode];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
          {meta.label}
        </p>
        {state.status === "ready" && (
          <button
            onClick={onGenerate}
            className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-bordeaux hover:underline"
            type="button"
          >
            <RefreshCw className="size-3" /> Yenile
          </button>
        )}
      </div>

      <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-bordeaux/15 bg-paper">
        {state.status === "ready" ? (
          <>
            <Image
              src={state.generatedUrl}
              alt={meta.label}
              width={1600}
              height={2000}
              className="size-full object-cover"
              unoptimized
            />
            {state.upscaled && (
              <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-paper backdrop-blur">
                2x HD
              </span>
            )}
          </>
        ) : state.status === "generating" ? (
          <div className="text-center">
            <Loader2 className="mx-auto size-8 animate-spin text-bordeaux" />
            <p className="font-hand mt-3 text-xl text-bordeaux">üretiliyor...</p>
            <p className="mt-1 text-xs text-ink-soft">
              ~30 sn (üretim + HD büyütme)
            </p>
          </div>
        ) : state.status === "error" ? (
          <div className="px-4 text-center">
            <p className="text-sm text-red-700">{state.message}</p>
            <button
              onClick={onGenerate}
              className="mt-3 text-xs font-medium uppercase tracking-wider text-bordeaux hover:underline"
              type="button"
            >
              Tekrar dene
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Sparkles className="mx-auto size-8 text-bordeaux/40" />
            <p className="font-hand mt-3 text-xl text-bordeaux/70">
              {meta.section}
            </p>
            <p className="mx-auto mt-1 max-w-[12rem] text-xs text-ink-soft">
              {meta.description}
            </p>
          </div>
        )}
      </div>

      {state.status === "ready" ? (
        <Button
          onClick={() => onDownload(state.generatedUrl)}
          variant="outline"
          className="w-full rounded-full border-bordeaux/30 text-ink hover:bg-bordeaux/10"
          size="sm"
        >
          <Download className="size-4" /> İndir
        </Button>
      ) : (
        <Button
          onClick={onGenerate}
          disabled={!enabled || state.status === "generating"}
          className="w-full rounded-full bg-ink text-paper hover:bg-bordeaux disabled:opacity-60"
          size="sm"
        >
          {state.status === "generating" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Üretiliyor...
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> Üret
            </>
          )}
        </Button>
      )}
    </div>
  );
}
