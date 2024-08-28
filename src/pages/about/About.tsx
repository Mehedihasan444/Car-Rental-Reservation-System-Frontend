// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom"; // Import Link if using React Router
import ContactUs from "./ContactUs";
import TeamMembers from "./TeamMembers";
import OurFleet from "./OurFleet";

const AboutUsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header
        className="bg-blue-600 text-white py-6 mb-12 text-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.madebydesignesia.com/themes/rentaly/images/background/subheader.jpg')`, // Replace with your background image URL
        }}
      >
        <h1 className="text-4xl font-bold my-10">About Us</h1>
      </header>
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex space-x-2 text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>&gt;</li>
          <li className="text-gray-400">About Us</li>
        </ol>
      </nav>

      {/* Company History */}
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-bold mb-4">Company History</h2>
        <p className="text-lg">
          Founded in 2010, our company has been dedicated to providing
          top-quality car rental services. Our mission is to offer reliable and
          affordable transportation solutions while ensuring exceptional
          customer service. We envision becoming the leading car rental provider
          known for our commitment to excellence and innovation.
        </p>
      </section>

      {/* Our Team */}
      {/* <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { name: "John Doe", role: "CEO", imgSrc: "/images/team/john.jpg" },
            {
              name: "Jane Smith",
              role: "COO",
              imgSrc: "/images/team/jane.jpg",
            },
            {
              name: "Alice Johnson",
              role: "CTO",
              imgSrc: "/images/team/alice.jpg",
            },
            // Add more team members as needed
          ].map((member, index) => (
            <Card key={index} className="w-64 flex-shrink-0">
              <CardHeader className="h-48">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-lg font-semibold">
                  {member.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}
      <TeamMembers />
      {/* Our Fleet */}
      {/* <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Fleet</h2>
        <p className="text-lg">
          We offer a diverse range of vehicles to meet your needs, including
          economy cars, luxury vehicles, SUVs, and more. Our fleet is
          meticulously maintained to ensure a comfortable and safe driving
          experience.
        </p>
      </section> */}
      <OurFleet/>

      {/* Values & Commitment */}
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-bold mb-4">Values & Commitment</h2>
        <p className="text-lg">
          At our company, we are committed to providing outstanding customer
          service and promoting sustainability. We strive to exceed customer
          expectations by delivering quality vehicles and personalized service,
          while also making efforts to reduce our environmental impact.
        </p>
      </section>

      {/* Contact Information */}
      {/* <section className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex items-center gap-4">
            <FaPhoneAlt size={24} className="text-blue-600" />
            <p className="text-lg">+1 (234) 567-890</p>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope size={24} className="text-blue-600" />
            <p className="text-lg">contact@yourcompany.com</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt size={24} className="text-blue-600" />
            <p className="text-lg">1234 Car Rental St, City, Country</p>
          </div>
        </div>
      </section> */}
      <ContactUs />
    </div>
  );
};

export default AboutUsPage;
