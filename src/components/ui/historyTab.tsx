import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HistoryTab() {
  return (
    <Tabs defaultValue="luxury" className=" my-5 ">
      <TabsList className="grid w-full grid-cols-3  mb-5">
        <TabsTrigger
          value="luxury"
          className=" data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
        >
          LUXURY
        </TabsTrigger>
        <TabsTrigger
          value="comfort"
          className=" data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
        >
          COMFORT
        </TabsTrigger>
        <TabsTrigger
          value="prestige"
          className=" data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
        >
          PRESTIGE
        </TabsTrigger>
      </TabsList>
      <TabsContent className="dark:text-white" value="luxury">
        <p>
          We offer a meticulously curated collection of the most sought-after
          luxury vehicles on the market. Whether you prefer the sporty allure of
          a high-performance sports car, the sophistication of a sleek and
          luxurious sedan, or the versatility of a premium SUV, we have the
          perfect car to match your discerning taste.
        </p>
      </TabsContent>
      <TabsContent value="comfort" className="dark:text-white">
        <p className="">
          We prioritize your comfort and convenience throughout your journey. We
          understand that a comfortable ride can make a world of difference,
          whether you're embarking on a business trip or enjoying a leisurely
          vacation. That's why we offer a wide range of well-maintained,
          comfortable cars that cater to your specific needs.
        </p>
      </TabsContent>
      <TabsContent value="prestige" className="dark:text-white">
        <p className="">
          We understand that prestige goes beyond luxury. It's about making a
          statement, embracing sophistication, and indulging in the finer things
          in life. That's why we offer an exclusive selection of prestigious
          cars that exude elegance, style, and status.
        </p>
      </TabsContent>
    </Tabs>
  );
}
