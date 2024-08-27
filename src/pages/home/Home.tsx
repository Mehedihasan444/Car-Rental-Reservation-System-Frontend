import FeaturedCars from "./featuredCar/FeaturedCars";
import { Testimonial } from "./testimonial/Testimonial";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <FeaturedCars/>
            <WhyChooseUs/>
            <Testimonial/>
        </div>
    );
};

export default Home;