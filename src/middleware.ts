import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Token padrão para o beta (Pode ser alterado via env na Vercel)
const DEFAULT_BETA_TOKEN = 'wasiflow-beta-2026';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Permitir acesso a arquivos estáticos e imagens
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Tentar capturar o token da URL (aceita ?beta=... ou ?beta%3D...)
  const betaParam = searchParams.get('beta');
  const fullSearch = request.nextUrl.search;
  const betaCookie = request.cookies.get('wasiflow_beta_access');

  // 3. Se o código estiver na URL (mesmo encodado), salvar no cookie e liberar
  const hasValidToken = betaParam === DEFAULT_BETA_TOKEN || 
                       fullSearch.includes(`beta=${DEFAULT_BETA_TOKEN}`) || 
                       fullSearch.includes(`beta%3D${DEFAULT_BETA_TOKEN}`);

  if (hasValidToken) {
    const response = NextResponse.next();
    response.cookies.set('wasiflow_beta_access', 'true', {
      maxAge: 60 * 60 * 24 * 30, // 30 dias de acesso
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // 4. Se já tiver o cookie de acesso, liberar
  if (betaCookie?.value === 'true') {
    return NextResponse.next();
  }

  // 5. Caso contrário, bloquear acesso
  // NOTA: Poderíamos redirecionar para uma página de "Em Breve"
  // Por enquanto, apenas bloqueamos para segurança total.
  return new NextResponse(
    `<html>
      <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #FAFAFA; text-align: center;">
        <div>
          <h1 style="color: #0E625E;">Wasiflow Beta</h1>
          <p style="color: #64748b;">Acesso restrito para convidados.</p>
        </div>
      </body>
    </html>`,
    {
      status: 403,
      headers: { 'content-type': 'text/html' },
    }
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
