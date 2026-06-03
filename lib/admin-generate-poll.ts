import { parseApiResponse } from "@/lib/parse-api-response";

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_MS = 5 * 60 * 1000;

type SubmitResponse = {
  requestId?: string;
  inputUrl?: string;
  model?: string;
  error?: string;
};

type PollResponse = {
  status?: string;
  generatedUrl?: string;
  error?: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * POST ile kuyruğa alır, GET ile sonuç gelene kadar poll eder.
 */
export async function submitAndPollGenerate(
  formData: FormData
): Promise<{ generatedUrl: string; inputUrl?: string }> {
  const submitRes = await fetch("/api/admin/generate", {
    method: "POST",
    body: formData,
  });

  const submitParsed = await parseApiResponse<SubmitResponse>(submitRes);
  if (!submitParsed.ok) throw new Error(submitParsed.error);

  const { requestId, inputUrl, model } = submitParsed.data;
  if (!requestId) {
    throw new Error("Sunucu requestId döndürmedi.");
  }

  const started = Date.now();

  while (Date.now() - started < MAX_POLL_MS) {
    const params = new URLSearchParams({ requestId });
    if (model) params.set("model", model);

    const pollRes = await fetch(`/api/admin/generate?${params}`);
    const pollParsed = await parseApiResponse<PollResponse>(pollRes);

    if (!pollParsed.ok) throw new Error(pollParsed.error);

    const { status, generatedUrl, error } = pollParsed.data;

    if (status === "COMPLETED") {
      if (!generatedUrl) {
        throw new Error("Görsel URL'si boş döndü.");
      }
      return { generatedUrl, inputUrl };
    }

    if (status === "FAILED" || error) {
      throw new Error(error || "Üretim başarısız.");
    }

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(
    "Üretim zaman aşımına uğradı (5 dk). Fal panelinden işlem durumunu kontrol et."
  );
}
