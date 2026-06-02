import { createClient, type SanityClient } from "next-sanity";
import { isSanityConfigured, sanityConfig } from "./config";

let clientInstance: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!clientInstance) {
    clientInstance = createClient({
      ...sanityConfig,
      // useCdn: false — Sanity CDN ~1 dk stale olabiliyor; webhook ile
      // revalidatePath çağırdıktan sonra bile CDN eski veriyi veriyordu.
      // Doğrudan API'den çekince webhook + ISR akışı anlık çalışıyor.
      // Vitrin sitesi için API rate limit fazlasıyla yeterli.
      useCdn: false,
      stega: { enabled: false },
    });
  }
  return clientInstance;
}
