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
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">
          Explore Bangladesh
        </h1>
        <div className="grid grid-cols-6 grid-rows-3 gap-4">
          <div className="col-span-2 row-span-2">
            <img
              src={images[0]}
              alt="Pattern 1"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-2 row-span-1">
            <img
              src={images[1]}
              alt="Pattern 2"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-2 row-span-1">
            <img
              src={images[2]}
              alt="Pattern 3"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-2 row-span-2">
            <img
              src={images[3]}
              alt="Pattern 4"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <img
              src={images[4]}
              alt="Pattern 5"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-1 row-span-">
            <img
              src={images[5]}
              alt="Pattern 6"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-2 row-span-1">
            <img
              src={images[6]}
              alt="Pattern 6"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col-span-1 row-span-1">
            <img
              src={images[7]}
              alt="Pattern 6"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ExploreBangladesh;
