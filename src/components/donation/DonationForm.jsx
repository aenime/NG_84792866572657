'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHeart } from 'react-icons/fa';

export default function DonationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  
  const predefinedAmounts = [500, 1000, 2000, 5000];
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleAmountSelection = (amount) => {
    setDonationAmount(amount);
    setCustomAmount(amount);
    
    // Store amount in localStorage for the UpiPaymentOptions component
    localStorage.setItem('donationAmount', amount);
    
    // Dispatch event for components listening to storage
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'donation-amount-change',
      newValue: amount
    }));
  };
  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      handleAmountSelection(parseFloat(value));
    }
  };
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the donation data to your API
      // For now, we'll just move to the payment step
      setStep(2);
      
      // Make sure amount is stored in localStorage
      localStorage.setItem('donationAmount', donationAmount);
      localStorage.setItem('donorName', data.name);
      localStorage.setItem('donorPhone', data.phone);
      localStorage.setItem('donorEmail', data.email);
      
      // Dispatch event to update other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'donation-amount-change',
        newValue: donationAmount
      }));
    } catch (error) {
      console.error('Error submitting donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {step === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Donor Information */}
          <div className="mb-6 space-y-4">
            <div>
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="form-input"
                placeholder="Enter your phone number"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">
                Email Address (Optional)
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter your email address"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          {/* Donation Amount */}
          <div className="mb-6">
            <label className="form-label">Donation Amount (₹)</label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`py-3 px-4 rounded-md border transition-colors ${
                    donationAmount === amount
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:border-primary hover:bg-primary-light hover:bg-opacity-10'
                  }`}
                  onClick={() => handleAmountSelection(amount)}
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="number"
                placeholder="Or enter a custom amount"
                className="form-input pl-8"
                value={customAmount}
                onChange={handleCustomAmountChange}
                min="100"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
            </div>
            
            {!donationAmount && (
              <p className="text-red-500 text-sm mt-1">
                Please select or enter a donation amount
              </p>
            )}
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`btn-primary w-full flex items-center justify-center gap-2 ${
              !donationAmount || isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={!donationAmount || isSubmitting}
          >
            <FaHeart /> Continue to Payment
          </button>
        </form>
      ) : (
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Donation Information</h3>
          <p className="text-gray-600">
            Amount: <span className="font-medium">₹{parseFloat(donationAmount).toLocaleString()}</span>
          </p>
          <button
            onClick={() => setStep(1)}
            className="text-primary text-sm font-medium mt-2 hover:underline"
          >
            Edit Details
          </button>
          <div className="mt-6 mb-2 border-t pt-4">
            <p className="text-gray-600 text-sm">
              Please select a payment option on the right to complete your donation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
