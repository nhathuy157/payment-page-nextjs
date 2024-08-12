// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    // debugger;
  // Lấy thông tin từ yêu cầu
  const url = new URL(request.url);
  // console.log('Current URL:', url.href);

  // Thay đổi phản hồi hoặc thực hiện các hành động khác
  const response = NextResponse.next();
//   response.headers.set('X-Custom-Header', 'Middleware Header');debugger;
  response.headers.set('URL', url.href);
  return response;
}

// Áp dụng middleware cho tất cả các tuyến đường
export const config = {
  matcher: '/:path*',
};
