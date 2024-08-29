

const BookingSteps = () => {
  const steps = [
    {
      id: 1,
      icon: "🚗", // Use a car icon or replace with an image if needed
      title: "Choose a vehicle",
      description:
        "Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination.",
    },
    {
      id: 2,
      icon: "📅", // Use a calendar icon or replace with an image if needed
      title: "Pick location & date",
      description:
        "Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences.",
    },
    {
      id: 3,
      icon: "✏️", // Use a booking icon or replace with an image if needed
      title: "Make a booking",
      description:
        "Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence.",
    },
    {
      id: 4,
      icon: "😊", // Use a relax icon or replace with an image if needed
      title: "Sit back & relax",
      description:
        "Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled with comfort.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-16">
      {steps.map((step) => (
        <div key={step.id} className="bg-white p-6 relative rounded-lg shadow text-center">
          <div className="bg-blue-500 bg-opacity-80 text-white rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">{step.icon}</span> {/* You can replace this with an <img> tag for an actual icon */}
          </div>
          <h3 className="text-2xl font-bold mb-2 ">
            <span className="text-blue-500 mr-2 text-9xl opacity-40 absolute z-10 text-center w-full left-0 right-0">{step.id}</span>
            {step.title}
          </h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingSteps;
