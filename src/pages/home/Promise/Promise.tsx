import { motion } from "framer-motion";
import { FaLeaf, FaHeart, FaGlobeAsia } from "react-icons/fa";

const Promise = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 px-6 lg:px-8 lg:flex justify-between items-center gap-12">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex-1 flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-gray-700/20">
            <img
              src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200"
              alt="Beautiful Bangladesh landscape with green nature"
              className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <FaLeaf className="text-green-500" size={20} />
                <span className="font-bold text-gray-800 dark:text-white">Eco-Friendly Fleet</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20">
            <FaHeart className="text-green-500" size={16} />
            <span className="text-green-600 dark:text-green-400 text-sm font-bold">
              Sustainable Travel
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
            Our Commitment to the{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Bangladesh Promise
            </span>
          </h1>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RentoCar</span>, we are on a mission to make travel more
              sustainable in Bangladesh, both for locals and international visitors. Along with our eco-friendly fleet,
              including low-emission and hybrid vehicles, we are committed to promoting responsible travel across our business
              operations.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              In Bangladesh, caring for the land and people is deeply rooted in our culture. We invite you to join us on our
              mission to protect and preserve the natural beauty and heritage of Bangladesh, ensuring it remains safe and
              beautiful for future generations of travelers.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg"
            >
              <FaLeaf className="text-green-500 mx-auto mb-2" size={28} />
              <p className="font-bold text-gray-800 dark:text-white text-sm">Eco-Friendly</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg"
            >
              <FaHeart className="text-red-500 mx-auto mb-2" size={28} />
              <p className="font-bold text-gray-800 dark:text-white text-sm">Responsible</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg"
            >
              <FaGlobeAsia className="text-blue-500 mx-auto mb-2" size={28} />
              <p className="font-bold text-gray-800 dark:text-white text-sm">Sustainable</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Promise;
