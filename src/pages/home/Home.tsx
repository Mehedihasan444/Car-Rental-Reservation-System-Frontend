import ExploreBangladesh from "./Explore Bangladesh/ExploreBangladesh";
import { FAQ } from "./FAQ/FAQ";
import FeaturedCars from "./featuredCar/FeaturedCars";
import { HeroSection } from "./heroSection/HeroSection";
import Promise from "./Promise/Promise";
import { Testimonial } from "./testimonial/Testimonial";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturedCars/>
            <WhyChooseUs/>
            <Promise/>
            <ExploreBangladesh/>
            <Testimonial/>
            <FAQ/>
        </div>
    );
};

export default Home;