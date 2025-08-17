import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactForm from "../Contact/contact";
import Coupon from "../CouponGenerator/coupon";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";
import TestimonialShowcase from "../Testimonial/testmonial";
import Why from "../LearnMore/why";
import HeroSection from "../../molecules/about/HeroSection";
import WelcomeSection from "../../molecules/about/WelcomeSection";
import ContentSection from "../../molecules/about/ContentSection";
// Use a public asset as default background fallback
const defaultBackground = "/vite.svg";
// import Product from '../Products/Product';

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Prevent infinite loop
    console.error('Background image failed to load:', target.src);
    target.src = defaultBackground;
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-100 top-4 sticky">
        <Navbar />
      </div>

      <HeroSection 
        defaultBackground={defaultBackground}
        onImageError={handleImageError}
      />

      <div className="relative z-10" style={{ paddingTop: '450px' }}>
        <WelcomeSection 
          title="Welcome to Our Moringa World"
          subtitle="Discover the power of nature's most nutritious superfood and transform your health naturally"
        />

        <ContentSection>
          <Why />
        </ContentSection>
        
        <ContentSection delay={300}>
          <Coupon />
        </ContentSection>

        <ContentSection delay={400}>
          <ContactForm showNavbar={false} />
        </ContentSection>

        <ContentSection delay={500}>
          <TestimonialShowcase />
        </ContentSection>

        <Footer />
      </div>
    </div>
  );
}

export default Home;