export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function instagramDmUrl(productTitle?: string): string {
  const base = "https://www.instagram.com/ykslbcl/";
  if (!productTitle) return base;
  const text = encodeURIComponent(
    `Merhaba, "${productTitle}" hakkında bilgi almak istiyorum.`
  );
  return `${base}?text=${text}`;
}
