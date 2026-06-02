import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="text-6xl" aria-hidden>
        🧶
      </span>
      <h1 className="mt-6 font-heading text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 text-muted-foreground">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Ana sayfaya dön</Link>
      </Button>
    </div>
  );
}
