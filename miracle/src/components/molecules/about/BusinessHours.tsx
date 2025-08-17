import { FaClock } from 'react-icons/fa';

interface BusinessHour {
  day: string;
  hours: string;
}

interface BusinessHoursProps {
  hours?: BusinessHour[];
  className?: string;
}

const defaultHours: BusinessHour[] = [
  { day: "Mon - Fri", hours: "9:00 AM - 6:00 PM" },
  { day: "Sat", hours: "10:00 AM - 4:00 PM" },
  { day: "Sun", hours: "Closed" },
];

const BusinessHours = ({ hours = defaultHours, className = "" }: BusinessHoursProps) => {
  return (
    <div className={`flex items-start ${className}`}>
      <FaClock className="mt-1 mr-3 text-gray-400" />
      <div className="text-gray-400">
        {hours.map((hour, index) => (
          <p key={index}>{hour.day}: {hour.hours}</p>
        ))}
      </div>
    </div>
  );
};

export default BusinessHours;
