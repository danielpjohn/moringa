interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

const WelcomeSection = ({ title, subtitle, className = "" }: WelcomeSectionProps) => {
  return (
    <div className={`w-full bg-white py-12 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="text-4xl font-bold text-gray-800 mb-4"
          data-aos="fade-up"
        >
          {title}
        </div>
        <div
          className="text-xl text-gray-600"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
