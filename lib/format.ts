export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export type SaleInfo = {
  onSale: boolean;
  effectivePrice: number;
  originalPrice?: number;
  percentOff?: number;
};

export function computeSale(
  price: number,
  salePrice?: number
): SaleInfo {
  if (
    typeof salePrice === "number" &&
    salePrice > 0 &&
    salePrice < price
  ) {
    return {
      onSale: true,
      effectivePrice: salePrice,
      originalPrice: price,
      percentOff: Math.round(((price - salePrice) / price) * 100),
    };
  }
  return { onSale: false, effectivePrice: price };
}

export function formatSaleBadge(template: string, percent: number): string {
  return template.replace("{percent}", String(percent));
}

export function instagramDmUrl(
  productTitle?: string,
  instagramUrl?: string,
  template?: string
): string {
  const base = instagramUrl || "https://www.instagram.com/ykslbcl/";
  if (!productTitle) return base;
  const message = (
    template || 'Merhaba, "{title}" hakkında bilgi almak istiyorum.'
  ).replace("{title}", productTitle);
  return `${base}?text=${encodeURIComponent(message)}`;
}
