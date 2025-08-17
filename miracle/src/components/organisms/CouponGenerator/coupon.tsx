import { useNavigate } from "react-router-dom";

const Coupon = () => {
  const navigate = useNavigate();

  const goToContactForCoupon = () => {
    navigate('/contact', {
      state: {
        message: 'Fill your email and submit the form - your coupon will be sent to your inbox.'
      }
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white px-10 py-16 sm:px-16">
          {/* Decorative elements */}
          <div className="absolute left-8 bottom-8 flex space-x-3 z-0">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-md">
              <span className="text-3xl">🥬</span>
            </div>
            <div className="w-16 h-20 bg-red-100 rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl">🍅</span>
            </div>
          </div>

          <div className="absolute right-8 top-8 flex space-x-3 z-0">
            <div className="w-10 h-24 bg-orange-100 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🥕</span>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl">🌽</span>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Get Your Exclusive Discount!</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Unlock special savings — we will email you a coupon after you submit your email on the Contact page.
            </p>

            <div className="flex flex-col items-center">
              <button
                onClick={goToContactForCoupon}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-medium transition-transform transform hover:scale-105"
              >
                Get My Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupon;