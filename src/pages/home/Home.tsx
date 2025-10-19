import ExploreBangladesh from "./Explore Bangladesh/ExploreBangladesh";
import { FAQ } from "./FAQ/FAQ";
import FeaturedCars from "./featuredCar/FeaturedCars";
import { HeroSection } from "./heroSection/HeroSection";
import Promise from "./Promise/Promise";
import { Testimonial } from "./testimonial/Testimonial";
import WhyChooseUs from "./whyChooseUs/WhyChooseUs";
import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="overflow-hidden">
            {/* Hero Section with smooth entry */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <HeroSection/>
            </motion.div>

            {/* Featured Cars with slide-up animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <FeaturedCars/>
            </motion.div>

            {/* Why Choose Us with fade-in */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <WhyChooseUs/>
            </motion.div>

            {/* Promise section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <Promise/>
            </motion.div>

            {/* Explore Bangladesh */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <ExploreBangladesh/>
            </motion.div>

            {/* Testimonials */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <Testimonial/>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FAQ/>
            </motion.div>
        </div>
    );
};

export default Home;