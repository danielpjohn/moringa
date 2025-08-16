import React from "react";

const Coupon = () => {
  const [couponCode, setCouponCode] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);

  const generateCoupon = () => {
    const code = "MORINGA" + Math.floor(1000 + Math.random() * 9000);
    setCouponCode(code);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
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
              Unlock special savings with your personalized coupon code
            </p>

            <div className="flex flex-col items-center">
              <button
                onClick={generateCoupon}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-medium transition-transform transform hover:scale-105"
              >
                {couponCode ? "Generate New Code" : "Get My Coupon"}
              </button>

              {couponCode && (
                <div className="mt-10 w-full max-w-md">
                  <div className="relative bg-green-50 border-2 border-dashed border-green-400 rounded-xl p-6">
                    <span className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
                      {couponCode}
                    </span>
                    <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-green-500"></div>
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-green-500"></div>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                      isCopied
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {isCopied ? "✓ Copied!" : "Copy Code"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupon;