import React from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  gradient?: string;
  index?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  gradient = "from-blue-500 to-purple-600",
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Card Content */}
      <div className="relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-xl p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-white mt-2 transition-colors duration-300">
              {value}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 group-hover:text-gray-100 mt-1 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {/* Icon Container */}
          <div className="flex-shrink-0">
            <div className={`bg-gradient-to-br ${gradient} p-3 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-2xl">{icon}</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar Animation */}
        <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className={`h-full bg-gradient-to-r ${gradient}`}
          />
        </div>
      </div>
    </motion.div>
  );
};
