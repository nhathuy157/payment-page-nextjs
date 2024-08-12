import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // debugger
  const url = new URL(request.url);
  const host = url.hostname;

  return NextResponse.json({ host, url: request.url });
}
