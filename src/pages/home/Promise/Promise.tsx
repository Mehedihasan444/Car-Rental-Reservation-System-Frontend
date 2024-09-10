const Promise = () => {
    return (
      <div className="bg-gray-100 py-10 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto space-y-8 px-6 lg:px-8 lg:flex  justify-between items-center gap-5">
          {/* Image Section */}
          <div className="relative flex-1 flex items-center justify-center ">
            <img
              src="https://cdn.bangladeshscenictours.com/wp-content/uploads/2023/08/Edit2.jpg"
              alt="Beautiful Bangladesh landscape"
              className="w-full h-full object-contain rounded-lg "
            />
          </div>
  
          {/* Content Section */}
          <div className="bg-white dark:bg-slate-700  p-8 rounded-lg flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 dark:text-white">
              Our Commitment to the Bangladesh Promise
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
              At <span className="font-semibold text-blue-600">RentoCar</span>, we are on a mission to make travel more
              sustainable in Bangladesh, both for locals and international visitors. Along with our eco-friendly fleet,
              including low-emission and hybrid vehicles, we are committed to promoting responsible travel across our business
              operations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-white">
              In Bangladesh, caring for the land and people is deeply rooted in our culture. We invite you to join us on our
              mission to protect and preserve the natural beauty and heritage of Bangladesh, ensuring it remains safe and
              beautiful for future generations of travelers.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Promise;
  