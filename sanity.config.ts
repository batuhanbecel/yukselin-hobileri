import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { isSingletonType, singletonIds, structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Yüksel'in Hobileri",
  projectId: projectId || "placeholder",
  dataset,
  /** Must match the Next.js route: /studio */
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singleton tipleri "Yeni belge oluştur" listesinden gizle
    templates: (templates) =>
      templates.filter(({ schemaType }) => !isSingletonType(schemaType)),
  },
  document: {
    // Singleton belgelerde sil/kopyala/yeni oluştur seçeneklerini gizle
    actions: (input, context) => {
      if (singletonIds.includes(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && !["delete", "duplicate", "unpublish"].includes(action)
        );
      }
      return input;
    },
  },
});
