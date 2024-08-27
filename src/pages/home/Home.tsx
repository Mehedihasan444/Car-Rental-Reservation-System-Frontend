import FeaturedCars from "./featuredCar/FeaturedCars";
import { Footer } from "./footer/Footer";
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
            <Footer/>
        </div>
    );
};

export default Home;