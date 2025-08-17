import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import SuccessMessage from '../../molecules/common/SuccessMessage';
import ContactPageHeader from '../../molecules/contact/ContactPageHeader';
import ContactFormContainer from '../../molecules/contact/ContactFormContainer';
import ContactFormFields from '../../molecules/contact/ContactFormFields';

// Define interfaces for type safety (aligned with ContactFormFields)
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}


type ContactFormProps = {
  showNavbar?: boolean;
  bannerMessage?: string;
};

const ContactForm = ({ showNavbar = true, bannerMessage }: ContactFormProps) => {
  const location = useLocation() as { state?: { message?: string } };
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <SuccessMessage
        title="Thank You!"
        message="Your message has been sent successfully. We'll get back to you within 24 hours."
        buttonText="Send Another Message"
        onButtonClick={() => setIsSubmitted(false)}
      />
    );
  }

  const messageToShow = bannerMessage ?? location.state?.message;

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      {messageToShow && (
        <div className="mx-auto max-w-3xl mt-6 px-4">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
            {messageToShow}
          </div>
        </div>
      )}
      <div className="py-8 sm:py-12 md:py-16">
        <ContactPageHeader 
          title="Contact Us"
          description="Have questions or want to discuss a potential collaboration? We'd love to hear from you."
        />
        
        <ContactFormContainer title="Send us a message">
          <ContactFormFields 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </ContactFormContainer>
      </div>
    </div>
  );
};

export default ContactForm;