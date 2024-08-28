import Team_Member_Card from "@/components/ui/teamMemberCard";
import { useEffect, useState } from "react";

const TeamMembers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/team_members.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  return (
    <div
      className="px-5 lg:px-0 lg:h-screen flex justify-center items-center bg-fixed"
      style={{
        backgroundImage: `url('https://www.madebydesignesia.com/themes/rentaly/images/background/8.jpg')`, // Replace with your background image URL
      }}
    >
      <div className="my-20 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center md:text-left text-white">
          Our Team
        </h1>
        <div className="flex justify-center md:justify-start items-center my-2 ">
          <hr className="w-[50px] border-2 border-blue-700" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-5 my-10">
          {data?.map((item, idx) => {
            return <Team_Member_Card key={idx} member={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
