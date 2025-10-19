import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

export function FAQ() {
  return (
    <div className="relative w-full max-w-7xl mx-auto my-20 px-5 lg:px-10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 backdrop-blur-sm border border-indigo-500/20">
          <FaQuestionCircle className="text-indigo-500" size={16} />
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">
            Got Questions?
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Find answers to common questions about our car rental services
        </p>
      </motion.div>

      <div className="sm:flex justify-between items-center gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem 
              value="Do I need a credit card?" 
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                Do I need a credit card?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                ✓ Yes, a valid credit card is required for booking to secure your reservation and cover any additional charges.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem 
              value="Is there a mileage limit?" 
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                Is there a mileage limit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                ✓ Unlimited mileage on all rentals. Drive as much as you need without worrying about extra charges.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem 
              value="Can I cancel my booking?" 
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                Can I cancel my booking?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4">
                ✓ Yes, free cancellation up to 24 hours before pick-up. Full refund guaranteed with our flexible policy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 my-10 sm:mt-0"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
            <img 
              src="https://miro.medium.com/v2/resize:fit:1400/0*fjAGp_YGPXNRI6Zo" 
              alt="FAQ illustration" 
              className="relative w-full rounded-2xl shadow-2xl border-4 border-white/20 dark:border-gray-700/20 transform group-hover:scale-105 transition-transform duration-500 " 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}


        {/* <AccordionItem value="pricing">
          <AccordionTrigger>Pricing Details</AccordionTrigger>
          <AccordionContent>
            <p>Our pricing is flexible and competitive. Here are the details:</p>
            <ul className="list-disc ml-5">
              <li>Base price: $50/day</li>
              <li>Weekend special: $45/day for 3+ days</li>
              <li>Additional driver: $10/day</li>
              <li>GPS: $5/day</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
  

        <AccordionItem value="insurance">
          <AccordionTrigger>Insurance Options</AccordionTrigger>
          <AccordionContent>
            <p>We offer several insurance packages to ensure your peace of mind:</p>
            <ul className="list-disc ml-5">
              <li>Basic Insurance: $10/day - Covers up to $10,000</li>
              <li>Full Coverage: $20/day - Covers up to $50,000</li>
              <li>Premium Coverage: $30/day - Covers up to $100,000</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
  
      
        <AccordionItem value="features">
          <AccordionTrigger>Car Features</AccordionTrigger>
          <AccordionContent>
            <p>Our cars come equipped with the latest features for your comfort:</p>
            <ul className="list-disc ml-5">
              <li>GPS Navigation</li>
              <li>Air Conditioning</li>
              <li>Child Seats Available</li>
              <li>Bluetooth and USB Connectivity</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
 */}
