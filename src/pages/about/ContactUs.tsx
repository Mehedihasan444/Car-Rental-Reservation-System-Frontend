import { ContactForm } from "@/components/ui/ContactForm";
import { FaHome, FaPhone, FaEnvelopeSquare, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const ContactUs = () => {
  return (
    <div className=" lg:h-screen flex justify-center items-center bg-white">
        <div className="">
        <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">Fill out the form below to send us a message</p>
      </div>
      <section className="flex justify-between items-center gap-5 max-w-7xl mx-auto py-12">
  <div className="flex-1">
    <ContactForm />
  </div>
  <div className="space-y-5 flex-1">
    <p>
      Have questions or need assistance? We're here to help. Reach out to us
      through any of the following channels, and our team will get back to you
      promptly.
    </p>
    <h3 className="flex items-center gap-2">
      <span>
        <FaHome />
      </span>
      <span className="font-semibold">Address:</span>
       1600 Pennsylvania Ave NW, Washington, D.C. DC 20500, USA
    </h3>
    <h3 className="flex items-center gap-2">
      <span>
        <FaPhone />
      </span>{" "}
      <span className="font-semibold">Support Phone:</span>
       +1 (202) 456-1111
    </h3>
    <h3 className="flex items-center gap-2">
      <span>
        <FaEnvelopeSquare />
      </span>
      <span className="font-semibold">Email:</span>
      support@carrental.com
    </h3>
    <h3 className="flex items-center gap-2">
      <span>
        <FaClock />
      </span>
      <span className="font-semibold">Working Hours:</span>
       09:00 AM - 09:00 PM, Monday to Saturday
    </h3>
    <h3 className="flex items-center gap-2">
      <span>
        <FaLocationDot />
      </span>{" "}
      <a href="#" className="text-blue-600 underline">
        View on the Map
      </a>
    </h3>
  </div>
</section>
   
        </div>
      
    </div>
  );
};

export default ContactUs;
