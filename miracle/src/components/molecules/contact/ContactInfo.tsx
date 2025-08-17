import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

interface ContactInfoProps {
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone?: string;
  email?: string;
}

const ContactInfo = ({ 
  address = {
    street: "123 Main Street",
    city: "Cityville",
    state: "ST",
    zip: "12345",
    country: "United States"
  },
  phone = "+1 (123) 456-7890",
  email = "info@shopname.com"
}: ContactInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <FaMapMarkerAlt className="mt-1 mr-3 text-gray-400" />
        <p className="text-gray-400">
          {address.street}
          <br />
          {address.city}, {address.state} {address.zip}
          <br />
          {address.country}
        </p>
      </div>
      <div className="flex items-center">
        <FaPhone className="mr-3 text-gray-400" />
        <a
          href={`tel:${phone.replace(/\D/g, '')}`}
          className="text-gray-400 hover:text-white transition"
        >
          {phone}
        </a>
      </div>
      <div className="flex items-center">
        <FaEnvelope className="mr-3 text-gray-400" />
        <a
          href={`mailto:${email}`}
          className="text-gray-400 hover:text-white transition"
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
