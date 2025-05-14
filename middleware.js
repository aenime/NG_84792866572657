import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Define protected paths
  const isAdminPath = path.startsWith('/admin') && !path.startsWith('/admin/login');
  
  if (isAdminPath) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // Redirect to login if not authenticated or not an admin
    if (!token || token.role !== 'admin') {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Configure paths for middleware
export const config = {
  matcher: ['/admin/:path*']
};
