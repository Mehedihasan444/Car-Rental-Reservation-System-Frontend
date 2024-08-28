
import { TMember } from "@/types/TMember";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa6";

const Team_Member_Card = ({ member }:{member:TMember}) => {
  const { name, role, image } = member;

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-shadow duration-300 ease-in-out">
      <div className="flex justify-center items-center overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="rounded-md transform transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-gray-900">
          {name}
        </h3>
        <span className="text-gray-500">{role}</span>
        <div className="flex items-center justify-center gap-5 mt-3">
          <FaFacebook className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
          <FaTwitter className="text-blue-400 hover:text-blue-600 transition-colors duration-200" />
          <FaInstagram className="text-pink-600 hover:text-pink-800 transition-colors duration-200" />
          <FaPinterest className="text-red-600 hover:text-red-800 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Team_Member_Card;
