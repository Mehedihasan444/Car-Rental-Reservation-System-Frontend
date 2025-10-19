import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaMountain, FaUmbrellaBeach } from "react-icons/fa";

const ExploreBangladesh = () => {
  const images = [
    "https://media.istockphoto.com/id/606217830/photo/boat-riding-in-a-river.jpg?s=612x612&w=0&k=20&c=sftvdXliMLSjTiAeBEEr9LonNQpXlHTEx5_aUlbsDOI=",
    "https://media.istockphoto.com/id/1056699672/photo/tetulia-jame-masjid-at-tala-satkhira-bangladesh.jpg?s=612x612&w=0&k=20&c=_C_VDY59cFpFyREt8_aa_4bPO-VHN842juxZinLB2Mg=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ372dt3aar_lfLor_gC1g5G9u2rLHjW0h5rg&s",
    "https://64.media.tumblr.com/b862e5ad8928e566f011a04e1b62b8c0/d20a443dfdcbc9b2-31/s1280x1920/d7aa1dcd12ac8747e3cb92f00a6e4dff80293e25.jpg",
    "https://w0.peakpx.com/wallpaper/164/520/HD-wallpaper-lake-view-bangladesh-bd-lake-mountain-natural-nature.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/b9/0c/e1/caption.jpg?w=500&h=400&s=1",
    "https://blog.flyticket.com.bd/wp-content/uploads/2019/06/sajek-valley-1-1.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/3d/56/54/boga-lake.jpg?w=500&h=500&s=1",
    "https://w0.peakpx.com/wallpaper/137/377/HD-wallpaper-nature-bangladesh-green-lake-peace-sky-water.jpg",

  ];

  return (
    <div className="relative dark:text-white py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20">
            <FaMapMarkedAlt className="text-green-500" size={16} />
            <span className="text-green-600 dark:text-green-400 text-sm font-bold">
              Discover Destinations
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explore Bangladesh
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Journey through breathtaking landscapes, from serene rivers to majestic mountains
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg">
            <FaMountain className="text-green-500 mx-auto mb-2" size={24} />
            <p className="font-bold text-2xl text-gray-800 dark:text-white">150+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Destinations</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg">
            <FaUmbrellaBeach className="text-blue-500 mx-auto mb-2" size={24} />
            <p className="font-bold text-2xl text-gray-800 dark:text-white">50+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Beaches</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center shadow-lg">
            <FaMapMarkedAlt className="text-purple-500 mx-auto mb-2" size={24} />
            <p className="font-bold text-2xl text-gray-800 dark:text-white">24/7</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Support</p>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-6 grid-rows-3 gap-1 sm:gap-4"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[0]}
              alt="Boat riding in river"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-2 row-span-1 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[1]}
              alt="Historical mosque"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-2 row-span-1 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[2]}
              alt="Natural landscape"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-2 row-span-2 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[3]}
              alt="Scenic beauty"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1 row-span-2 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[4]}
              alt="Mountain lake"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[5]}
              alt="Tourist spot"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-2 row-span-1 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[6]}
              alt="Sajek Valley"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="col-span-1 row-span-1 relative group overflow-hidden rounded-lg shadow-xl"
          >
            <img
              src={images[7]}
              alt="Boga Lake"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreBangladesh;
