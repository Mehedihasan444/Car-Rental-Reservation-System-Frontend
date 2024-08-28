import { HistoryTab } from "@/components/ui/historyTab";


const CompanyHistory = () => {
    return (
        <section className="max-w-7xl mx-auto lg:h-screen  flex justify-between items-center">
        <div className="sm:flex justify-between items-center gap-10">

        <div className="flex-1">
          <img
            src="https://cinemavehicles.com/files/new/images/service-vehicle-rental.jpg"
            alt=""
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center border-b-4 border-blue-500 inline-block pb-2">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Since our inception in 2010, we have been committed to providing
            exceptional car rental services. Our mission is to deliver reliable,
            affordable transportation solutions with a focus on customer
            satisfaction. We aim to be the leading car rental provider,
            recognized for our dedication to excellence and innovation in the
            industry.
          </p>
          <div className="">
            <HistoryTab/>
          </div>
        </div>
        </div>
      </section>
    );
};

export default CompanyHistory;