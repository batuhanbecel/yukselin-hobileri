/**
 * Fal.ai görsel düzenleme modeli.
 *
 * Seçenekler:
 *   openai/gpt-image-2/edit  — OpenAI GPT Image 2 (önerilen, edit)
 *   fal-ai/nano-banana/edit  — Gemini 2.5 Flash Image (eski varsayılan)
 *
 * .env.local:
 *   FAL_EDIT_MODEL=openai/gpt-image-2/edit
 */
export const FAL_EDIT_MODEL =
  process.env.FAL_EDIT_MODEL?.trim() || "openai/gpt-image-2/edit";

export const FAL_UPSCALE_MODEL = "fal-ai/clarity-upscaler";

export function isGptImageEditModel(model: string) {
  return model.includes("gpt-image");
}

export function buildEditInput(
  model: string,
  prompt: string,
  imageUrl: string
): Record<string, unknown> {
  const base = {
    prompt,
    image_urls: [imageUrl],
    num_images: 1,
    output_format: "jpeg",
  };

  if (isGptImageEditModel(model)) {
    return {
      ...base,
      quality: "high",
      // Ürün fotoğrafları için 3:4 (768×1024)
      image_size: "portrait_4_3",
    };
  }

  // nano-banana / diğer edit modelleri
  return base;
}
