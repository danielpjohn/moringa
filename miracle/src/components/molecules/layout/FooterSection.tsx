import { type ReactNode } from 'react';

interface FooterSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const FooterSection = ({ title, children, className = "mb-8" }: FooterSectionProps) => {
  return (
    <div className={className}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default FooterSection;
