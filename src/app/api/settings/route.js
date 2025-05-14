import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { NGOSettings } from '@/lib/models';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get settings or use default
    let settings = await NGOSettings.findOne();
    
    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        name: 'Animal Welfare NGO',
        logo: '/images/logo.png',
        address: '123 Main Street, City, Country',
        phone: '+1234567890',
        email: 'contact@example.org',
        colors: {
          main: '#4CAF50',
          base: '#FFFFFF',
          secondary: '#2196F3'
        },
        social_media: {
          facebook: 'https://facebook.com/example',
          twitter: 'https://twitter.com/example'
        }
      });
    }
    
    return NextResponse.json(settings);
    
  } catch (error) {
    console.error('Failed to fetch NGO settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NGO settings' },
      { status: 500 }
    );
  }
}

// PATCH method for updating settings (admin only)
export async function PATCH(request) {
  try {
    const data = await request.json();
    
    await connectToDatabase();
    
    let settings = await NGOSettings.findOne();
    
    if (!settings) {
      settings = new NGOSettings(data);
    } else {
      // Update existing settings with allowed fields
      const allowedFields = [
        'name', 'logo', 'address', 'phone', 'email', 'colors', 'social_media'
      ];
      
      allowedFields.forEach(field => {
        if (data[field] !== undefined) {
          settings[field] = data[field];
        }
      });
    }
    
    await settings.save();
    
    return NextResponse.json(settings);
    
  } catch (error) {
    console.error('Failed to update NGO settings:', error);
    return NextResponse.json(
      { error: 'Failed to update NGO settings' },
      { status: 500 }
    );
  }
}
