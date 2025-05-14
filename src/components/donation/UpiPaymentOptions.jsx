'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { FaDownload, FaShareAlt, FaPrint } from 'react-icons/fa';

export default function UpiPaymentOptions({ upiOptions, ngoSettings }) {
  const [amount, setAmount] = useState(0);
  const [activeUpiOption, setActiveUpiOption] = useState(null);
  const [qrCodeURL, setQrCodeURL] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const qrRef = useRef(null);
  
  // Generate a unique reference ID when the component mounts
  useEffect(() => {
    const newReferenceId = `DON${Date.now().toString().substr(-8)}`;
    setReferenceId(newReferenceId);
  }, []);
  
  // Get the amount from the form (via localStorage or a global state)
  useEffect(() => {
    const storedAmount = localStorage.getItem('donationAmount');
    if (storedAmount) {
      setAmount(parseFloat(storedAmount));
    }
    
    // Event listener for amount changes
    const handleAmountChange = (e) => {
      if (e.key === 'donation-amount-change') {
        setAmount(parseFloat(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleAmountChange);
    return () => window.removeEventListener('storage', handleAmountChange);
  }, []);
  
  // Generate QR code when UPI option or amount changes
  useEffect(() => {
    if (activeUpiOption && amount > 0) {
      generateQRCode(activeUpiOption);
    }
  }, [activeUpiOption, amount]);
  
  // Generate QR code based on the selected UPI option and amount
  const generateQRCode = async (upiOption) => {
    if (!upiOption || !amount) return;
    
    try {
      // Option 1: Generate QR code using the API endpoint
      const response = await fetch(
        `/api/qrcode?upiId=${encodeURIComponent(upiOption.upi_id)}&amount=${amount}&referenceId=${referenceId}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      
      const data = await response.json();
      setQrCodeURL(data.qrCode);
      
      // Option 2: Fall back to client-side generation if API fails
      // This is handled in the catch block
    } catch (err) {
      console.error('Error generating QR code from API, falling back to client-side generation:', err);
      
      // Client-side fallback
      try {
        const ngoName = ngoSettings?.name || 'Animal Welfare NGO';
        
        // Format the UPI payment URL with parameters
        const upiPaymentUrl = `upi://pay?pa=${upiOption.upi_id}&pn=${encodeURIComponent(ngoName)}&am=${amount}&cu=INR&tn=${referenceId}`;
        
        // Generate QR code as Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(upiPaymentUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        
        setQrCodeURL(qrCodeDataUrl);
      } catch (fallbackErr) {
        console.error('Error in fallback QR code generation:', fallbackErr);
      }
    }
  };
  
  // Handle UPI option selection
  const handleUpiOptionSelect = (option) => {
    setActiveUpiOption(option);
  };
  
  // Download QR code as PNG
  const downloadQRCode = () => {
    if (!qrCodeURL) return;
    
    const link = document.createElement('a');
    const appName = activeUpiOption ? activeUpiOption.app_name : 'UPI';
    link.download = `${appName}-Payment-${amount}-${referenceId}.png`;
    link.href = qrCodeURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Share QR code (for mobile devices)
  const shareQRCode = async () => {
    if (!qrCodeURL || !navigator.share) return;
    
    try {
      // Convert data URL to Blob
      const response = await fetch(qrCodeURL);
      const blob = await response.blob();
      
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      await navigator.share({
        title: `Donation to ${ngoSettings?.name || 'Animal Welfare NGO'}`,
        text: `Scan this QR code to donate ₹${amount} via ${activeUpiOption?.app_name || 'UPI'}`,
        files: [file],
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };
  
  // Print QR code
  const printQRCode = () => {
    if (!qrCodeURL) return;
    
    const printWindow = window.open('', '_blank');
    const ngoName = ngoSettings?.name || 'Animal Welfare NGO';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment QR Code - ${ngoName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              max-width: 600px;
              margin: 0 auto;
            }
            .qr-container {
              margin: 20px 0;
            }
            .logo {
              max-width: 120px;
              margin-bottom: 10px;
            }
            .instructions {
              font-size: 14px;
              color: #555;
              margin-top: 20px;
              text-align: left;
            }
            .details {
              margin: 15px 0;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          ${ngoSettings?.logo ? `<img src="${ngoSettings.logo}" alt="${ngoName} Logo" class="logo" />` : ''}
          <h2>${ngoName}</h2>
          <div class="details">
            Amount: ₹${amount.toFixed(2)}<br>
            Reference: ${referenceId}
          </div>
          <div class="qr-container">
            <img src="${qrCodeURL}" alt="Payment QR Code" style="max-width: 300px;" />
          </div>
          <div class="instructions">
            <h3>How to use this QR code:</h3>
            <ol>
              <li>Open any UPI payment app on your smartphone</li>
              <li>Select the 'Scan QR' option</li>
              <li>Scan this QR code with your phone camera</li>
              <li>Verify the payment details and complete the transaction</li>
              <li>Save the transaction receipt for your records</li>
            </ol>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      {/* UPI App Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {upiOptions.map((option) => (
          <button
            key={option._id}
            className={`flex items-center justify-center p-4 border rounded-lg transition-all ${
              activeUpiOption?._id === option._id
                ? 'border-primary-dark bg-primary-light bg-opacity-20'
                : 'border-gray-200 hover:border-primary hover:bg-gray-50'
            }`}
            onClick={() => handleUpiOptionSelect(option)}
            style={{
              borderColor: activeUpiOption?._id === option._id ? option.app_color : '',
              backgroundColor: activeUpiOption?._id === option._id ? `${option.app_color}15` : '',
            }}
          >
            <div className="text-center">
              {option.app_logo ? (
                <div className="flex justify-center mb-2">
                  <Image 
                    src={option.app_logo} 
                    alt={option.app_name} 
                    width={40} 
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ) : null}
              <div className="font-medium">{option.display_name || option.app_name}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* QR Code Display */}
      {activeUpiOption && qrCodeURL ? (
        <div className="border rounded-lg p-6 bg-white" ref={qrRef}>
          <div className="text-center mb-4">
            <h3 className="font-medium text-lg">
              Scan with {activeUpiOption.display_name || activeUpiOption.app_name}
            </h3>
            <p className="text-gray-600 text-sm">
              Amount: ₹{amount} • Ref: {referenceId}
            </p>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={qrCodeURL}
                alt={`${activeUpiOption.app_name} Payment QR Code`}
                className="max-w-full h-auto"
                style={{ maxWidth: '250px' }}
              />
              {ngoSettings?.logo && (
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-30"
                  style={{pointerEvents: 'none'}}
                >
                  <Image
                    src={ngoSettings.logo}
                    alt={ngoSettings.name || 'NGO Logo'}
                    width={60}
                    height={60}
                    className="opacity-60"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* QR Code Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={downloadQRCode}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              title="Download QR Code"
            >
              <FaDownload /> Download
            </button>
            
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={shareQRCode}
                className="flex items-center gap-2 px-3 py-2 bg-secondary text-white rounded-md hover:opacity-90 transition-colors"
                title="Share QR Code"
              >
                <FaShareAlt /> Share
              </button>
            )}
            
            <button
              onClick={printQRCode}
              className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              title="Print QR Code"
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-gray-50 text-center">
          <p>
            {amount > 0
              ? 'Select a payment option above to generate a QR code'
              : 'Please enter a donation amount first'}
          </p>
        </div>
      )}
      
      {/* Manual Payment Instructions (Fallback) */}
      {activeUpiOption && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-2">Manual Payment Instructions</h4>
          <p className="text-gray-600 text-sm mb-2">
            If scanning the QR code doesn't work, you can manually make the payment:
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Open your UPI app ({activeUpiOption.app_name})</li>
            <li>Select "Pay to UPI ID" or "Pay to VPA"</li>
            <li>
              <span className="font-medium">UPI ID:</span> {activeUpiOption.upi_id}
            </li>
            <li>
              <span className="font-medium">Amount:</span> ₹{amount}
            </li>
            <li>
              <span className="font-medium">Reference ID:</span> {referenceId} (important for tracking)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
