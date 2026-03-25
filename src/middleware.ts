import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Token padrão para o beta (Pode ser alterado via env na Vercel)
const DEFAULT_BETA_TOKEN = 'wasiflow-beta-2026';

export function middleware(request: NextRequest) {
  // DESATIVADO TEMPORARIAMENTE PARA DESENVOLVIMENTO
  return NextResponse.next();
  const pathname = request.nextUrl.pathname;
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
