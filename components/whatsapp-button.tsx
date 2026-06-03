"use client";

import Link from "next/link";
import { ctaButtonBase, ctaButtonSizes } from "@/components/cta-button-styles";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/lib/site-context";
import { cn } from "@/lib/utils";

type WhatsappButtonProps = {
  phone: string;
  productTitle?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
};

function buildUrl(phone: string, productTitle?: string, template?: string) {
  const cleaned = phone.replace(/[^\d]/g, "");
  const message = productTitle
    ? (template || 'Merhaba, "{title}" hakkında bilgi almak istiyorum.').replace(
        "{title}",
        productTitle
      )
    : "Merhaba, çantalarınız hakkında bilgi almak istiyorum.";
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function WhatsappButton({
  phone,
  productTitle,
  className,
  size = "default",
  variant = "default",
}: WhatsappButtonProps) {
  const settings = useSiteSettings();
  const label = settings.whatsappButtonLabel || "WhatsApp'tan yaz";

  return (
    <Button
      asChild
      size={size}
      variant={variant === "outline" ? "outline" : "default"}
      className={cn(
        ctaButtonBase,
        ctaButtonSizes[size],
        variant === "default" &&
          "bg-gradient-to-r from-[#25d366] to-[#1ebe5d] text-white ring-1 ring-[#25d366]/25 hover:from-[#1ebe5d] hover:to-[#1aa952] hover:ring-[#25d366]/40",
        variant === "outline" &&
          "bg-paper/80 text-[#1a7f3e] shadow-none ring-1 ring-[#25d366]/30 hover:-translate-y-0 hover:bg-[#25d366]/10 hover:shadow-[0_4px_14px_rgba(37,211,102,0.12)]",
        className
      )}
    >
      <Link
        href={buildUrl(phone, productTitle, settings.instagramDmTemplate)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 shrink-0"
          aria-hidden
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.55.12-.16.25-.64.81-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22a7.42 7.42 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.41.06-.62.31-.21.25-.81.79-.81 1.93s.83 2.24.94 2.4c.12.16 1.63 2.49 3.95 3.5.55.24.98.38 1.32.49.55.18 1.06.15 1.46.09.45-.07 1.37-.56 1.56-1.1.19-.54.19-1 .14-1.1-.06-.1-.22-.16-.47-.28z" />
        </svg>
        <span>{label}</span>
      </Link>
    </Button>
  );
}
