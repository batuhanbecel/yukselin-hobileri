/**
 * Admin fetch'lerinde JSON olmayan yanıtları (Vercel timeout, proxy hata metni)
 * güvenle okur.
 */
export async function parseApiResponse<T extends Record<string, unknown>>(
  res: Response
): Promise<{ ok: true; data: T } | { ok: false; error: string; status: number }> {
  const text = await res.text();
  if (!text.trim()) {
    return {
      ok: false,
      error: res.ok ? "Boş yanıt." : `HTTP ${res.status}`,
      status: res.status,
    };
  }

  try {
    const data = JSON.parse(text) as T;
    if (!res.ok) {
      const err =
        typeof data.error === "string"
          ? data.error
          : `HTTP ${res.status}`;
      return { ok: false, error: err, status: res.status };
    }
    return { ok: true, data };
  } catch {
    const snippet = text.replace(/\s+/g, " ").slice(0, 280);
    const hint =
      res.status === 504 || snippet.toLowerCase().includes("timeout")
        ? " İşlem çok uzun sürdü (sunucu zaman aşımı). Tek görsel üretmeyi dene."
        : res.status === 413
          ? " Dosya çok büyük."
          : "";
    return {
      ok: false,
      error: `${snippet}${hint}`,
      status: res.status,
    };
  }
}
