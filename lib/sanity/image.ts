import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityConfig } from "./config";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId || "placeholder",
  dataset: sanityConfig.dataset,
});

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
