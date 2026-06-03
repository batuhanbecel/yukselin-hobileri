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
    return new NextResponse(
      "Admin paneli için ADMIN_PASSWORD env değişkeni tanımlı değil.",
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization");
  const encoded = Buffer.from(`admin:${expected}`).toString("base64");
  const expectedHeader = `Basic ${encoded}`;

  if (auth !== expectedHeader) {
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
