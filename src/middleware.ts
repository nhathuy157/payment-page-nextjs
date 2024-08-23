// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  //request.nextUrl.searchParams.append('customParam', 'customValue');
  // Add a custom query parameter
  const url = request.nextUrl.clone();
  // url.searchParams.set('myCustomParam', 'myValue');
  // request.headers.set('URL', url.href);

  // return NextResponse.rewrite(url);
  const response = NextResponse.next();
//   response.headers.set('X-Custom-Header', 'Middleware Header');debugger;
  response.headers.set('URL', url.href);  
  return response;
}

// Áp dụng middleware cho tất cả các tuyến đường
export const config = {
  matcher: '/:path*',
};
