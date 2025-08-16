import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ContactForm from "../Contact/contact";
import Coupon from "../Coupon/coupon";
import Footer from "../Footer/footer";
import Navbar from "../Navbar/navbar";
import TestimonialShowcase from "../Testimonial/testmonial";
import Why from "../WhyMoringa/why";
import defaultBackground from "../images/twitr.jpg"; // Fallback image
// import Product from '../Products/Product';

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Fetch background image from Django backend
    const fetchBackgroundImage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/get-all-images/');

        if (response.ok) {
          const data = await response.json();
          // console.log('API Response:', data); 

          if (Array.isArray(data) && data.length > 0) {
            // Find image with 'twitr' in the URL (case insensitive)
            const bgImage = data.find(item =>
              item.image.toLowerCase().includes('homepage')
            );

            if (bgImage) {
              console.log('Found background image:', bgImage.image);
              setBackgroundImage(bgImage.image);
            } else {
              console.log('No matching image found, using first image');
              setBackgroundImage(data[0].image);
            }
          } else {
            console.log('Empty response array, using default image');
          }
        } else {
          console.log('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch background image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackgroundImage();
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

      {/* Background image section with loading state */}
      <div className="absolute top-0 left-0 w-full z-0">
        {isLoading ? (
          <div className="w-full h-[500px] bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-auto block"
            style={{
              display: 'block',
              margin: 0,
              padding: 0,
              verticalAlign: 'top',
              lineHeight: 0,
              height: '600px',
              objectFit: 'contain'
            }}
            onError={handleImageError}
          />
        )}
      </div>

      <div className="relative z-10" style={{ paddingTop: '450px' }}>
        {/* Welcome text section with white background */}
        <div className="w-full bg-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              Welcome to Our Moringa World
            </div>
            <div
              className="text-xl text-gray-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Discover the power of nature's most nutritious superfood and transform your health naturally
            </div>
          </div>
        </div>

        <div data-aos="fade-up">
          <Why />
        </div>

        {/* <div data-aos="fade-up" data-aos-delay="200">
          <Product />
        </div> */}

        <div data-aos="fade-up" data-aos-delay="300">
          <Coupon />
        </div>

        <div data-aos="fade-up" data-aos-delay="400">
          <ContactForm />
        </div>

        <div data-aos="fade-up" data-aos-delay="500">
          <TestimonialShowcase />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;