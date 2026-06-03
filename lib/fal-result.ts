/**
 * Fal subscribe/queue yanıtından görsel URL'sini çıkarır.
 * Model / sürüm farklı wrapper'lar kullanabiliyor.
 */
export function extractGeneratedImageUrl(result: unknown): string | null {
  if (!result || typeof result !== "object") return null;

  const root = result as Record<string, unknown>;
  const candidates: unknown[] = [root.data, root];

  if (root.data && typeof root.data === "object") {
    const nested = root.data as Record<string, unknown>;
    if (nested.data) candidates.push(nested.data);
  }

  for (const payload of candidates) {
    const url = findImageUrlInPayload(payload);
    if (url) return url;
  }

  return null;
}

function findImageUrlInPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;

  if (Array.isArray(p.images)) {
    for (const item of p.images) {
      const url = imageItemToUrl(item);
      if (url) return url;
    }
  }

  if (p.image) {
    const url = imageItemToUrl(p.image);
    if (url) return url;
  }

  if (typeof p.url === "string" && isUsableImageUrl(p.url)) {
    return p.url;
  }

  return null;
}

function imageItemToUrl(item: unknown): string | null {
  if (typeof item === "string" && isUsableImageUrl(item)) return item;
  if (!item || typeof item !== "object") return null;

  const o = item as Record<string, unknown>;
  if (typeof o.url === "string" && isUsableImageUrl(o.url)) return o.url;
  if (typeof o.file_url === "string" && isUsableImageUrl(o.file_url)) {
    return o.file_url;
  }

  return null;
}

function isUsableImageUrl(url: string): boolean {
  return (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("data:image/")
  );
}
