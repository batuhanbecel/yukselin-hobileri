/**
 * Sanity Singleton Seed Script
 *
 * Mock data'daki default içerikleri Sanity'deki tek-belge (singleton) sayfalara yazar.
 * Studio'da boş duran "Ana Sayfa", "Hakkımda", "Ürünler Sayfası", "SSS Sayfası" ve
 * "Genel Site Ayarları" belgelerine içerik basar.
 *
 * Çalıştırma:
 *   npm run seed
 *
 * Bu komut Sanity CLI'yı kullandığı için 'npx sanity login' ile önceden
 * giriş yapmış olman gerekir. Belirteç (token) gerekmez.
 */

import { getCliClient } from "sanity/cli";
import {
  mockAboutPage,
  mockFaqPage,
  mockHomePage,
  mockProductsPage,
  mockSiteSettings,
} from "../lib/sanity/mock-data";

const client = getCliClient({ apiVersion: "2024-01-01" });

type SeedDoc = { _id: string; _type: string; label: string; data: object };

const docs: SeedDoc[] = [
  {
    _id: "homePage",
    _type: "homePage",
    label: "Ana Sayfa",
    data: mockHomePage,
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    label: "Hakkımda Sayfası",
    data: mockAboutPage,
  },
  {
    _id: "productsPage",
    _type: "productsPage",
    label: "Ürünler Sayfası",
    data: mockProductsPage,
  },
  {
    _id: "faqPage",
    _type: "faqPage",
    label: "SSS Sayfası",
    data: mockFaqPage,
  },
  {
    _id: "siteSettings",
    _type: "siteSettings",
    label: "Genel Site Ayarları",
    data: mockSiteSettings,
  },
];

async function run() {
  console.log(
    `\nSanity'ye ${docs.length} singleton belgesi yazılacak.\n` +
      `Proje: ${client.config().projectId}  |  Dataset: ${client.config().dataset}\n`
  );

  for (const doc of docs) {
    const full = { _id: doc._id, _type: doc._type, ...doc.data };
    try {
      await client.createOrReplace(full);
      console.log(`  ✓  ${doc.label}  (${doc._id})`);
    } catch (err) {
      console.error(`  ✗  ${doc.label}  —  hata:`, err);
    }
  }

  console.log(
    `\nTamam. Studio'yu açıp belgeleri kontrol edebilirsin.\n` +
      `Bir sonraki seferde değişikliklerini KAYBETMEMEK için bu komutu TEKRAR çalıştırma.\n`
  );
}

run().catch((err) => {
  console.error("Seed sırasında hata:", err);
  process.exit(1);
});
