# Yüksel'in Hobileri

El emeği örgü çantalar vitrin sitesi. Tüm metinler ve ürünler [Sanity](https://www.sanity.io) üzerinden yönetilir. Siparişler [Instagram @ykslbcl](https://www.instagram.com/ykslbcl/), WhatsApp veya isteğe bağlı Shopier linki üzerinden alınır.

## Teknolojiler

- **Next.js 16** (App Router, Turbopack)
- **Sanity CMS** v3
- **Tailwind CSS 4** + shadcn/ui
- **Plausible** (opsiyonel analytics)

## Yerel Geliştirme

```bash
npm install
cp .env.example .env.local
# .env.local içine Sanity project ID ve site URL'i yazın
npm run dev
```

Site: <http://localhost:3000>  
İçerik paneli: <http://localhost:3000/studio>

## Ortam Değişkenleri (.env.local)

```env
# Sanity (zorunlu değil — yoksa örnek içerik gösterilir)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production

# Sitenin canlı URL'i (sitemap, OG, JSON-LD için kullanılır)
NEXT_PUBLIC_SITE_URL=https://yukselinhobileri.com

# Plausible analytics (opsiyonel — boşsa hiç yüklenmez)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yukselinhobileri.com
# Özel host kullanıyorsan, default plausible.io
# NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.js

# Sanity → siteyi anında güncellemek için webhook secret
SANITY_WEBHOOK_SECRET=long-random-string
```

## Sanity Kurulumu

1. [sanity.io](https://www.sanity.io) hesabı açın
2. Yeni proje oluşturun, project ID'yi `.env.local`'a yazın
3. `npm run dev` → <http://localhost:3000/studio>
4. [sanity.io/manage](https://www.sanity.io/manage) → projeniz → **API** → **CORS origins**:
   - `http://localhost:3000` (Allow credentials ✓)
   - Canlı domain (örn. `https://yukselinhobileri.com`)
5. **Singleton belgeleri seed'leyin** — mock-data'daki default içerikler Sanity'deki boş "Ana Sayfa", "Hakkımda", "Ürünler", "SSS" ve "Genel Ayarlar" belgelerine basılır:

   ```bash
   npx sanity login    # tarayıcı açılır, Google/GitHub ile gir
   npm run seed
   ```

   ⚠️ Bu komut singleton belgelerin **üzerine yazar**. Studio'da değişiklik yaptıysan kaybedersin — sadece sıfırdan kurulum / sıfırlama için çalıştır.

6. Studio'yu açıp belgelerin dolu olduğunu doğrulayın, istediğiniz gibi düzenleyin.

> Singleton belgeler (Ayarlar, Sayfa belgeleri) sabittir; silinemez ve çoğaltılamaz.

### Anında güncelleme (webhook)

Üretimde Sanity CDN (~1 dk) + Next ISR (30 sn) cache'leri vardır. Publish'lediğinde site **anında** güncellensin istiyorsan:

1. Uzun bir secret üret:
   ```bash
   openssl rand -hex 32
   # veya: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Vercel → Project → Settings → Environment Variables:
   - `SANITY_WEBHOOK_SECRET` = yukarıdaki secret
   - Redeploy et
3. [sanity.io/manage](https://www.sanity.io/manage) → projen → **API** → **Webhooks** → Create webhook:
   - **Name:** Revalidate site
   - **URL:** `https://yukselinhobileri.com/api/revalidate?secret=AYNI_SECRET`
   - **Dataset:** `production`
   - **Trigger on:** `Create`, `Update`, `Delete`
   - **Filter:** `_type in ["homePage","aboutPage","productsPage","faqPage","siteSettings","product","category"]`
   - **Projection (Body):**
     ```json
     {
       "_type": _type,
       "_id": _id,
       "slug": slug.current,
       "categorySlug": category->slug.current
     }
     ```
   - **HTTP method:** `POST`
   - Save
4. Test: Studio'da bir belge publish et — Sanity webhook log'unda `200 OK` görmelisin, site saniyeler içinde güncellenir.

> Endpoint `https://yukselinhobileri.com/api/revalidate` browser'dan açılırsa "POST kabul eder" mesajı döner. 401 dönüyorsa secret yanlış.

## Sayfa & Yönlendirme Haritası

| Route | Açıklama |
|-------|----------|
| `/` | Hero, öne çıkanlar, vurgular, sipariş adımları, alıntı |
| `/urunler` | Tüm çantalar + kategori filtre çipleri (statik) |
| `/urunler/kategori/[slug]` | Kategoriye göre filtrelenmiş liste (statik) |
| `/urunler/[slug]` | Ürün detayı, galeri lightbox, benzer ürünler, JSON-LD |
| `/hakkimizda` | Hikaye + değer kartları + CTA |
| `/sss` | Sıkça sorulanlar (FAQ JSON-LD) |
| `/studio` | Sanity içerik paneli |
| `/sitemap.xml`, `/robots.txt` | Otomatik üretilir |

## Sanity Belge Tipleri

- **Sayfalar (singleton):** `homePage`, `aboutPage`, `productsPage`, `faqPage`, `siteSettings`
- **Koleksiyonlar:** `product`, `category`

### Üründe bulunan alanlar

- Temel: ad, slug, fotoğraflar, kategori, açıklama
- Detay: boyut, malzeme, bakım, renk seçenekleri (isim + hex)
- Satış: fiyat, **indirimli fiyat**, indirim rozeti, **durum** (Stokta / Sipariş üzerine / Satıldı), Shopier linki, hediye paketi
- Görünürlük: ana sayfada göster, sıralama

### Site genelinde özelleştirilebilen

- Header etiketi, footer (slogan, açıklama, imza)
- Instagram URL & kullanıcı adı, WhatsApp numarası, Shopier mağaza linki
- Ürün detay notu (başlık + metin)

## SEO & Performance

- **JSON-LD:** Organization (root layout), Product (ürün detay), FAQPage (SSS)
- **Sitemap:** otomatik üretilir; ürün ve kategori sayfalarını içerir
- **Open Graph:** kök sayfa için default kapak; ürün sayfaları kendi fotoğrafını kullanır
- **Favicon:** dinamik üretilen iplik yumağı SVG'si (`app/icon.tsx`)
- **Statik üretim:** `/urunler`, `/urunler/[slug]`, `/urunler/kategori/[slug]` SSG ile üretilir, ISR (revalidate 60s)

## Deploy (Vercel)

1. Projeyi GitHub'a push edin
2. [vercel.com](https://vercel.com) → Import Project
3. Environment Variables ekleyin (`.env.local`'daki tüm değerler)
4. Deploy

Sanity Studio production'da: `https://siteniz.com/studio`

## Notlar

- Sanity bağlanmamışsa veya bir belge eksikse, ilgili sayfa **mock data**'daki default metinleri gösterir — site asla boş kalmaz.
- Sanity'de bir alan boş bırakılırsa, mock data'daki varsayılan o alanı doldurur.
- Highlights / steps / values dizileri Sanity'de boşaltılırsa ilgili bölüm tamamen gizlenir.
- "Satıldı" durumundaki ürünler kartta gri, üzerinde **SATILDI** rozeti, Instagram butonu yok.
