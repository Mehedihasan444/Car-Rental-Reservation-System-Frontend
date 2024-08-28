import FeaturedCars from "./featuredCar/FeaturedCars";
import { HeroSection } from "./heroSection/HeroSection";
import { Testimonial } from "./testimonial/Testimonial";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturedCars/>
            <WhyChooseUs/>
            <Testimonial/>
        </div>
    );
};

export default Home;