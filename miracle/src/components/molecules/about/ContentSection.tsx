import { type ReactNode } from 'react';

interface ContentSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const ContentSection = ({ children, delay = 0, className = "" }: ContentSectionProps) => {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-delay={delay}
      className={className}
    >
      {children}
    </div>
  );
};

export default ContentSection;
