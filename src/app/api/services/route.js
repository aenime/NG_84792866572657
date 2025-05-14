import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Service } from '@/lib/models';

// GET all services or services that should appear in menu
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const menuOnly = searchParams.get('menu') === 'true';
    
    await connectToDatabase();
    
    let query = {};
    if (menuOnly) {
      query = { show_in_menu: true };
    }
    
    const services = await Service.find(query).sort({ title: 1 });
    
    return NextResponse.json(services);
    
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST a new service (admin only)
export async function POST(request) {
  try {
    const data = await request.json();
    
    await connectToDatabase();
    
    // Create slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    }
    
    const service = new Service(data);
    await service.save();
    
    return NextResponse.json(service, { status: 201 });
    
  } catch (error) {
    console.error('Failed to create service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
