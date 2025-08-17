import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactInfoItem {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string | string[];
}

const ContactInfoCard: React.FC = () => {
  const contactInfo: ContactInfoItem[] = [
    {
      id: 1,
      icon: MapPin,
      title: 'Our Location',
      description: '123 Moringa Street, Green Valley, CA 90210, USA'
    },
    {
      id: 2,
      icon: Phone,
      title: 'Phone Number',
      description: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      id: 3,
      icon: Mail,
      title: 'Email Address',
      description: 'info@moringahealth.com'
    },
    {
      id: 4,
      icon: Clock,
      title: 'Working Hours',
      description: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-8 h-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
      
      <div className="space-y-6">
        {contactInfo.map((item) => (
          <div key={item.id} className="flex">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mr-4">
              <item.icon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              {Array.isArray(item.description) ? (
                <ul className="mt-1 space-y-1">
                  {item.description.map((desc, index) => (
                    <li key={index} className="text-gray-600">{desc}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-gray-600">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoCard;
