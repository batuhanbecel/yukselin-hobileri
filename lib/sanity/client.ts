import { createClient, type SanityClient } from "next-sanity";
import { isSanityConfigured, sanityConfig } from "./config";

let clientInstance: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!clientInstance) {
    clientInstance = createClient({
      ...sanityConfig,
      // Dev ortamında CDN'i kapat — Studio'daki değişiklikler anında yansısın.
      // Prod'da CDN açık (~1 dk önbellek), Next ISR ile birlikte hızlı.
      useCdn: process.env.NODE_ENV === "production",
      stega: { enabled: false },
    });
  }
  return clientInstance;
}
