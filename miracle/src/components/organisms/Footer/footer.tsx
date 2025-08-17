import FooterSection from '../../molecules/layout/FooterSection';
import SocialLinks from '../../molecules/layout/SocialLinks';
import ContactInfo from '../../molecules/contact/ContactInfo';
import BusinessHours from '../../molecules/about/BusinessHours';
import LinkList from '../../molecules/layout/LinkList';

const Footer = () => {
  const customerServiceLinks = [
    { href: "#", label: "Contact Us" },
    { href: "#", label: "FAQs" },
    { href: "#", label: "Shipping & Returns" },
    { href: "#", label: "Order Tracking" },
    { href: "#", label: "Size Guide" },
    { href: "#", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {/* <img src="/logo.png" alt="Company Logo" className="h-10 mr-2" /> */}
              <span className="text-2xl font-bold">Moringa</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for quality products and exceptional service since 2010.
            </p>
            <SocialLinks />
          </div>

          <FooterSection title="Customer Service">
            <LinkList links={customerServiceLinks} />
          </FooterSection>

          <FooterSection title="Our Store">
            <ContactInfo />
          </FooterSection>

          <FooterSection title="Business Hours">
            <BusinessHours />
          </FooterSection>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopName. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
