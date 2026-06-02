import { createClient, type SanityClient } from "next-sanity";
import { isSanityConfigured, sanityConfig } from "./config";

let clientInstance: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!clientInstance) {
    clientInstance = createClient({
      ...sanityConfig,
      useCdn: true,
      stega: { enabled: false },
    });
  }
  return clientInstance;
}
