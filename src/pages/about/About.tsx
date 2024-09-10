import ContactUs from "./ContactUs";
import TeamMembers from "./TeamMembers";
import OurFleet from "./OurFleet";
import { ValuesCommitment } from "./ValuesCommitment";
import CompanyHistory from "./CompanyHistory";
import { BreadcrumbComponent } from "./BreadcrumbComponent";

const AboutUsPage = () => {
  return (
    <div className="  min-h-screen">
      {/* Header */}
      <header
        className=" text-white py-6 text-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://www.madebydesignesia.com/themes/rentaly/images/background/subheader.jpg')`, // Replace with your background image URL
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl  font-bold my-10 ">About Us</h1>
          {/* Breadcrumb */}
          <BreadcrumbComponent />
        </div>
      </header>

      {/* Company History */}
      <CompanyHistory />

      {/* Our Team */}
      <TeamMembers />

      {/* Our Fleet */}
      <OurFleet />

      {/* Values & Commitment */}
      <ValuesCommitment />

      {/* Contact Information */}
      <ContactUs />
    </div>
  );
};

export default AboutUsPage;
