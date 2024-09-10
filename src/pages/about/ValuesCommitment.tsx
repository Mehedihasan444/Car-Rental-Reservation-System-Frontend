const valuesCommitments = [
    {
      title: "Outstanding Customer Service",
      description:
        "We are committed to exceeding customer expectations by delivering quality vehicles and personalized service tailored to your needs.",
      icon: "customer-service-icon", // Placeholder for an actual icon if you have one.
    },
    {
      title: "Sustainability",
      description:
        "We are dedicated to reducing our environmental impact by integrating sustainable practices into our operations.",
      icon: "sustainability-icon", // Placeholder for an actual icon if you have one.
    },
    {
      title: "Quality Vehicles",
      description:
        "Our fleet consists of well-maintained, high-quality vehicles to ensure your safety and comfort during your journey.",
      icon: "quality-vehicles-icon", // Placeholder for an actual icon if you have one.
    },
  ];
  
  export function ValuesCommitment() {
    return (
      <section className="max-w-7xl mx-auto p-6 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Values & Commitment</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuesCommitments.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              {/* Placeholder for Icon */}
              <div className="mb-4">
                <span className="text-4xl text-blue-500">{/* Add your icon component here */}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  