import React, { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';

type PaymentMethod = 'credit' | 'paypal' | 'apple-pay';

interface PaymentMethodProps {
  onSelect: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod | null;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onSelect, selectedMethod }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: name === 'number' ? value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') : value
    }));
  };

  const paymentMethods = [
    {
      id: 'credit',
      title: 'Credit / Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with Visa, Mastercard, or other credit/debit cards'
    },
    {
      id: 'paypal',
      title: 'PayPal',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple-pay',
      title: 'Apple Pay',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Pay with Apple Pay'
    }
  ] as const;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === method.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelect(method.id as PaymentMethod)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                    selectedMethod === method.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{method.title}</h3>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
            
            {selectedMethod === method.id && method.id === 'credit' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
