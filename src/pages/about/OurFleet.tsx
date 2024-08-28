import CountUpComponent from "@/utils/CountUpComponent";

const OurFleet = () => {
  const data = [
    {
      id: 1,
      number: 3423,
      title: "Completed Orders",
    },
    {
      id: 2,
      number: 343223,
      title: "Happy Customers",
    },
    {
      id: 3,
      number: 6543423,
      title: "Vehicles Fleet",
    },
    {
      id: 4,
      number: 983423,
      title: "Years Experience",
    },
  ];

  return (
    <section className="lg:h-screen max-w-7xl lg:mx-auto mx-5 my-10 lg:my-0 flex items-center justify-center">
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-gray-900">Our Fleet</h2>
          <p className="text-gray-600">
            Experience unparalleled comfort, performance, and exclusivity with
            our exquisite fleet of vehicles.
          </p>
        </div>
        <div className="lg:flex justify-between items-center gap-10 ">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900">
              We offer customers a wide range of{" "}
              <span className="text-blue-700">commercial cars</span> and{" "}
              <span className="text-blue-700">luxury cars</span>
              for any occasion.
            </h2>
          </div>
          <div className="flex-1">
            <p className="text-gray-600">
              At Rentaly, we are dedicated to providing exceptional car rental
              services to our valued customers. With a commitment to quality,
              convenience, and customer satisfaction, we strive to make every
              rental experience a seamless and enjoyable one. We understand that
              every customer has unique needs and preferences when it comes to
              renting a car. That's why we maintain a diverse fleet of
              well-maintained vehicles to cater to various requirements. From
              compact cars for solo travelers to spacious SUVs for families, we
              have a wide range of options to choose from.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 p-10 rounded-md shadow-lg"
            >
              <div className="text-center space-y-5">
                <div className="">
                  <CountUpComponent value={item.number} />
                  {/* <p className="text-gray-600 text-4xl font-bold"></p> */}
                </div>
                <div className="">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFleet;
