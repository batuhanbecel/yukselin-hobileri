# Yüksel'in Hobileri

El emeği örgü çantalar vitrin sitesi. Satış yok; siparişler [Instagram @ykslbcl](https://www.instagram.com/ykslbcl/) üzerinden alınır.

## Teknolojiler

- **Next.js** (App Router)
- **Sanity CMS** — ürün fotoğrafları ve fiyat yönetimi
- **Tailwind CSS** + shadcn/ui

## Yerel Geliştirme

```bash
npm install
cp .env.example .env.local
# .env.local içine Sanity project ID yazın (yoksa örnek ürünler gösterilir)
npm run dev
```

Site: [http://localhost:3000](http://localhost:3000)  
İçerik paneli: [http://localhost:3000/studio](http://localhost:3000/studio)

## Sanity Kurulumu

1. [sanity.io](https://www.sanity.io) hesabı açın
2. Yeni proje oluşturun
3. Project ID’yi `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

4. `npm run dev` ile `/studio` adresine gidin
5. İlk açılışta **“Connect this studio to your project”** ekranı gelirse:
   - Yerel geliştirme için: **Add development host** → `http://localhost:3000` eklenir
   - Canlı site (Vercel) için: deploy sonrası **Register studio** veya production URL’yi host olarak ekleyin
6. [sanity.io/manage](https://www.sanity.io/manage) → projeniz → **API** → **CORS origins**:
   - `http://localhost:3000` (Allow credentials ✓)
   - Canlı domain (ör. `https://siteniz.vercel.app`)
7. Google/e-posta ile giriş yapın
8. **Site Ayarları** belgesi oluşturun (tek kayıt)
9. **Ürün** ekleyin: fotoğraf, fiyat (TL), “Ana sayfada göster” işaretleyin

## Deploy (Vercel)

1. Projeyi GitHub’a push edin
2. [vercel.com](https://vercel.com) → Import Project
3. Environment Variables ekleyin:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
4. Deploy

Sanity Studio production’da: `https://siteniz.com/studio`

## Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `/` | Ana sayfa, öne çıkan ürünler |
| `/urunler` | Tüm çantalar |
| `/urunler/[slug]` | Ürün detayı |
| `/hakkimizda` | Hikaye metni |
| `/studio` | İçerik yönetimi (Sanity) |

## Notlar

- Sanity yapılandırılmadan site **örnek 3 ürün** ile çalışır
- Fiyatlar `₺` formatında gösterilir
- Her üründe Instagram DM linki vardır
