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

export function instagramDmUrl(productTitle?: string): string {
  const base = "https://www.instagram.com/ykslbcl/";
  if (!productTitle) return base;
  const text = encodeURIComponent(
    `Merhaba, "${productTitle}" hakkında bilgi almak istiyorum.`
  );
  return `${base}?text=${text}`;
}
