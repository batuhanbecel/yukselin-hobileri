import { createClient, type SanityClient } from "@sanity/client";
import { sanityConfig } from "./config";

let writeClient: SanityClient | null = null;

/**
 * Sanity'e YAZMA izniyle bağlanan client.
 * SANITY_WRITE_TOKEN env değişkeni gerektirir.
 * Token: sanity.io/manage → projen → API → Tokens → "Editor" veya "Write" yetkisi.
 */
export function getSanityWriteClient(): SanityClient {
  if (!process.env.SANITY_WRITE_TOKEN) {
    throw new Error(
      "SANITY_WRITE_TOKEN env değişkeni tanımlı değil. " +
        "sanity.io/manage → API → Tokens'tan write token alıp ekleyin."
    );
  }
  if (!writeClient) {
    writeClient = createClient({
      ...sanityConfig,
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });
  }
  return writeClient;
}
