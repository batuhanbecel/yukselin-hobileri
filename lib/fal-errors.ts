export function getFalErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message) {
    return err.message;
  }

  if (typeof err === "object" && err !== null) {
    const record = err as Record<string, unknown>;

    if (typeof record.message === "string" && record.message) {
      return record.message;
    }

    const body = record.body;
    if (typeof body === "object" && body !== null) {
      const bodyRecord = body as Record<string, unknown>;
      const detail = bodyRecord.detail;
      if (typeof detail === "string") return detail;
      if (Array.isArray(detail)) {
        return detail
          .map((item) => {
            if (typeof item === "string") return item;
            if (typeof item === "object" && item !== null && "msg" in item) {
              return String((item as { msg: unknown }).msg);
            }
            return JSON.stringify(item);
          })
          .join("; ");
      }
    }
  }

  return "Bilinmeyen Fal.ai hatası.";
}
