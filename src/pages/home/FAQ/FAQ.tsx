import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export function FAQ() {
    return (
        <div className="w-full max-w-7xl mx-auto my-20">
<h1 className="text-4xl font-bold  my-10">Frequently Asked Questions </h1>
      <Accordion type="single" collapsible className="">

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

        <AccordionItem value="Do I need a credit card?">
          <AccordionTrigger>Do I need a credit card?</AccordionTrigger>
          <AccordionContent>
          - Yes, a valid credit card is required for booking.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Is there a mileage limit?">
          <AccordionTrigger>Is there a mileage limit?</AccordionTrigger>
          <AccordionContent>
          - Unlimited mileage on all rentals.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Can I cancel my booking?">
          <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
          <AccordionContent>
          - Yes, free cancellation up to 24 hours before pick-up.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>
    );
  }
  