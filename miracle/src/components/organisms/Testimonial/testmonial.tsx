import React from 'react';
import TestimonialCard from '../../molecules/layout/TestimonialCard';

interface TestimonialProps {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
  variant?: 'default' | 'card' | 'minimal';
}

const Testimonial: React.FC<TestimonialProps> = (props) => {
  return <TestimonialCard {...props} />;
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