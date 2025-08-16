import React from 'react';

interface TestimonialProps {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
  variant?: 'default' | 'card' | 'minimal';
}

// Simple star component since lucide-react might not be available
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-green-500 fill-current' : 'text-gray-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Simple quote component
const QuoteIcon = () => (
  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

interface TestimonialProps {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
  variant?: 'default' | 'card' | 'minimal';
}

const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  company,
  content,
  rating = 5,
  avatar,
  variant = 'default'
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < rating} />
    ));
  };

  if (variant === 'minimal') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          {renderStars()}
        </div>
        <blockquote className="text-lg italic text-black mb-4">
          "{content}"
        </blockquote>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-black">{name}</span>
          {role && <span>, {role}</span>}
          {company && <span> at {company}</span>}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <QuoteIcon />
          <div className="flex ml-3">
            {renderStars()}
          </div>
        </div>
        
        <blockquote className="text-black mb-6 leading-relaxed">
          "{content}"
        </blockquote>
        
        <div className="flex items-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mr-4">
              <span className="text-white font-semibold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="font-semibold text-black">
              {name}
            </div>
            <div className="text-sm text-gray-600">
              {role}{company && ` • ${company}`}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
        <div className="absolute top-6 left-6 opacity-20">
          <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex justify-center mb-6">
            {renderStars()}
          </div>
          
          <blockquote className="text-xl md:text-2xl text-black text-center mb-8 leading-relaxed font-medium">
            "{content}"
          </blockquote>
          
          <div className="flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full mr-6 object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mr-6 border-4 border-white shadow-lg">
                <span className="text-white font-bold text-xl">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="text-center">
              <div className="text-lg font-semibold text-black">
                {name}
              </div>
              <div className="text-gray-600">
                {role}{company && ` • ${company}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage with sample testimonials
const TestimonialShowcase = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc.",
      content: "This product has completely transformed how we manage our business. The results exceeded our expectations in every way.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Innovation Labs",
      content: "Outstanding service and incredible attention to detail. I would recommend this to anyone looking for quality.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Designer",
      company: "Creative Studio",
      content: "The team's expertise and professionalism made all the difference. Truly exceptional work.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600">
            Real testimonials from satisfied customers
          </p>
        </div>
        
        <div className="space-y-16">
          {/* Default variant */}
          <Testimonial {...testimonials[0]} />
          
          {/* Card variants */}
          <div className="grid md:grid-cols-2 gap-8">
            <Testimonial {...testimonials[1]} variant="card" />
            <Testimonial {...testimonials[2]} variant="card" />
          </div>
          
          {/* Minimal variant */}
          <Testimonial
            name="Alex Thompson"
            role="Founder"
            company="StartupX"
            content="Simple, effective, and reliable. Everything we needed and more."
            rating={5}
            variant="minimal"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialShowcase;