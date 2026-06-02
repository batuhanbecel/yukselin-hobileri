import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "homePage", title: "Ana Sayfa" },
  { id: "aboutPage", title: "Hakkımda Sayfası" },
  { id: "productsPage", title: "Ürünler Sayfası" },
  { id: "faqPage", title: "SSS Sayfası" },
  { id: "siteSettings", title: "Genel Site Ayarları" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("📄 Sayfalar")
        .child(
          S.list()
            .title("Sayfalar")
            .items(
              SINGLETONS.filter((s) => s.id !== "siteSettings").map(
                (singleton) =>
                  S.listItem()
                    .title(singleton.title)
                    .id(singleton.id)
                    .child(
                      S.document()
                        .schemaType(singleton.id)
                        .documentId(singleton.id)
                    )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("🛍️ Ürünler")
        .schemaType("product")
        .child(S.documentTypeList("product").title("Ürünler")),
      S.listItem()
        .title("🏷️ Kategoriler")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Kategoriler")),
      S.divider(),
      S.listItem()
        .title("⚙️ Genel Site Ayarları")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
    ]);

export const isSingletonType = (type: string) =>
  SINGLETONS.some((s) => s.id === type);

export const singletonIds = SINGLETONS.map((s) => s.id);
