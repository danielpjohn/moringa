import { useState } from 'react';

// Define interfaces for type safety
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  inquiryType?: string;
}

interface FormField {
  name: keyof FormData;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  grid: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'demo', label: 'Request Demo' }
  ];

  const formFields: FormField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'John', grid: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Doe', grid: true },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@company.com', grid: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: false, placeholder: '+1 (555) 123-4567', grid: true },
    { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Your Company Name', grid: false },
    { name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'How can we help you?', grid: false }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => (
    <div key={field.name}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label} {field.required && <span className="text-green-600">*</span>}
      </label>
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleInputChange}
        placeholder={field.placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
          errors[field.name] ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or want to discuss a potential collaboration? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Send us a message</h3>

          {/* Inquiry Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What can we help you with?
            </label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Form Fields */}
          {/* Name Fields - Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {formFields.filter(field => field.grid && ['firstName', 'lastName'].includes(field.name)).map(renderField)}
          </div>

          {/* Contact Fields - Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {formFields.filter(field => field.grid && ['email', 'phone'].includes(field.name)).map(renderField)}
          </div>

          {/* Full Width Fields */}
          <div className="space-y-6 mb-6">
            {formFields.filter(field => !field.grid).map(renderField)}
          </div>

          {/* Message Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-green-600">*</span>
            </label>
            <textarea
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your inquiry..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-vertical transition-colors ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;