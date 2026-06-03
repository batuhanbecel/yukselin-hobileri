import { fal } from "@fal-ai/client";

const credentials = process.env.FAL_KEY;

if (credentials) {
  fal.config({ credentials });
}

export { fal };
export const isFalConfigured = Boolean(credentials);
