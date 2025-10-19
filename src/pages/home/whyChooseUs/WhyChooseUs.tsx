import { FaMapPin, FaRoad, FaTag, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaTrophy size={30} color="white" />,
      title: "First Class Services",
      description: "Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: <FaRoad size={30} color="white" />,
      title: "24/7 Road Assistance",
      description: "Reliable support when you need it most, keeping you on the move with confidence and peace of mind.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <FaTag size={30} color="white" />,
      title: "Quality at Minimum Expense",
      description: "Unlocking affordable brilliance with elevating quality while minimizing costs for maximum value.",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: <FaMapPin size={30} color="white" />,
      title: "Free Pick-Up & Drop-Off",
      description: "Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.",
      gradient: "from-green-600 to-teal-600"
    }
  ];

  return (
    <div className="relative mx-5 my-10 lg:my-0 lg:min-h-screen max-w-7xl lg:mx-auto flex flex-col justify-center items-center space-y-16 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10 space-y-4 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h4 className="text-blue-600 dark:text-blue-400 text-sm font-bold">
            Why Choose Us
          </h4>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-center dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Exceptional Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg leading-relaxed">
          Discover a world of convenience, safety, and customization, paving the way for unforgettable adventures and seamless mobility solutions.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 justify-center items-center gap-8 w-full">
        {/* Left Features */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {features.slice(0, 2).map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, translateX: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-between items-start gap-4 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl shadow-lg flex-shrink-0`}>
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center Car Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="lg:col-span-2 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
          <motion.img
            animate={{ 
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            src="https://www.madebydesignesia.com/themes/rentaly/images/misc/car-2.png"
            alt="car"
            className="relative w-full drop-shadow-2xl"
          />
        </motion.div>

        {/* Right Features */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {features.slice(2, 4).map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05, translateX: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-between items-start gap-4 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-right flex-1">
                <h3 className="font-bold text-lg dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl shadow-lg flex-shrink-0`}>
                {feature.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
