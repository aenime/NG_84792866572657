import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import connectToDatabase from '@/lib/db';
import { UPIDetail, NGOSettings } from '@/lib/models';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const upiId = searchParams.get('upiId');
    const amount = searchParams.get('amount');
    const referenceId = searchParams.get('referenceId');
    
    // Validate required parameters
    if (!upiId || !amount || !referenceId) {
      return NextResponse.json(
        { error: 'Missing required parameters: upiId, amount, or referenceId' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectToDatabase();
    
    // Get NGO settings for the name
    const ngoSettings = await NGOSettings.findOne();
    const ngoName = ngoSettings?.name || 'Animal Welfare NGO';
    
    // Check if this UPI ID exists in our database
    const upiDetail = await UPIDetail.findOne({ upi_id: upiId });
    if (!upiDetail) {
      return NextResponse.json(
        { error: 'Invalid UPI ID' },
        { status: 400 }
      );
    }
    
    // Format the UPI payment URL with parameters
    const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(ngoName)}&am=${amount}&cu=INR&tn=${referenceId}`;
    
    // Generate QR code as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(upiPaymentUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    
    return NextResponse.json({ qrCode: qrCodeDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
