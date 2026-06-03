import { NextResponse, type NextRequest } from "next/server";

/**
 * /admin/* ve /api/admin/* rotalarını HTTP Basic Auth ile korur.
 * Kullanıcı adı: admin
 * Şifre: ADMIN_PASSWORD env değişkeni
 *
 * Tarayıcı şifreyi sorduktan sonra cache'ler, oturum boyunca tekrar sormaz.
 */
export function middleware(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    const message = "Admin paneli için ADMIN_PASSWORD env değişkeni tanımlı değil.";
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: message }, { status: 500 });
    }
    return new NextResponse(message, { status: 500 });
  }

  const auth = req.headers.get("authorization");
  const encoded = Buffer.from(`admin:${expected}`).toString("base64");
  const expectedHeader = `Basic ${encoded}`;

  if (auth !== expectedHeader) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli." },
        { status: 401 }
      );
    }
    return new NextResponse("Yetkilendirme gerekli.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Yüksel Atölye", charset="UTF-8"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
