import { FaCar, FaCalendarAlt, FaEdit, FaCheckCircle } from "react-icons/fa";

const BookingSteps = () => {
  const steps = [
    {
      id: 1,
      icon: <FaCar size={24} />,
      title: "Choose a vehicle",
      description:
        "Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      icon: <FaCalendarAlt size={24} />,
      title: "Pick location & date",
      description:
        "Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      id: 3,
      icon: <FaEdit size={24} />,
      title: "Make a booking",
      description:
        "Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: 4,
      icon: <FaCheckCircle size={24} />,
      title: "Sit back & relax",
      description:
        "Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled with comfort.",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="my-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Follow these simple steps to book your perfect ride
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 h-full hover:shadow-md transition-shadow">
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {step.id}
              </div>

              {/* Icon */}
              <div className={`${step.bgColor} ${step.color} rounded-lg w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                {step.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
