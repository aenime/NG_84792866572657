import DonationForm from '@/components/donation/DonationForm';
import UpiPaymentOptions from '@/components/donation/UpiPaymentOptions';
import connectToDatabase from '@/lib/db';
import { UPIDetail, NGOSettings } from '@/lib/models';

export const metadata = {
  title: 'Donate',
  description: 'Support our animal welfare initiatives by making a donation.',
};

async function getDonationData() {
  try {
    await connectToDatabase();
    
    // Get UPI payment options
    const upiOptions = await UPIDetail.find({ active: true })
      .sort({ display_order: 1 });
    
    // Get NGO settings
    const ngoSettings = await NGOSettings.findOne();
    
    return { upiOptions, ngoSettings };
  } catch (error) {
    console.error('Failed to fetch donation data:', error);
    return { upiOptions: [], ngoSettings: null };
  }
}

export default async function DonatePage() {
  const { upiOptions, ngoSettings } = await getDonationData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your contribution helps us provide care, shelter, and medical treatment for animals in need.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Donation Information</h2>
          <DonationForm />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Payment Options</h2>
          <UpiPaymentOptions upiOptions={upiOptions} ngoSettings={ngoSettings} />
          
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Other Ways to Donate</h3>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900">Bank Transfer</h4>
              <p className="text-gray-600 mt-1">
                <strong>Account Name:</strong> Animal Welfare NGO<br />
                <strong>Account Number:</strong> 12345678910<br />
                <strong>IFSC Code:</strong> ABCD0123456<br />
                <strong>Bank:</strong> Example Bank
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">By Check</h4>
              <p className="text-gray-600 mt-1">
                Make checks payable to "Animal Welfare NGO" and mail to:<br />
                123 Main Street, City, Country
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-primary bg-opacity-10 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">How Your Donation Helps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4">
            <h4 className="font-medium mb-2">Food and Shelter</h4>
            <p className="text-gray-600">
              Provides nutritious meals and comfortable shelter for our rescued animals.
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-medium mb-2">Medical Care</h4>
            <p className="text-gray-600">
              Covers veterinary expenses, medications, and emergency medical procedures.
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-medium mb-2">Rescue Operations</h4>
            <p className="text-gray-600">
              Funds our rescue teams who respond to reports of animals in distress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
