import { HelpCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is my report really confidential?",
    answer: "Absolutely. Your identity and all information you share are encrypted and stored securely. Only our trained support team has access to your reports, and we never share your details without your explicit consent. We prioritize your safety and privacy above all else.",
  },
  {
    question: "What happens after I submit a report?",
    answer: "Once you submit a report, our trained team reviews it within 24-48 hours. We'll assess the situation and reach out through our secure messaging system to discuss next steps. Depending on the severity, we may connect you with local support services, counselors, or authorities (only with your consent).",
  },
  {
    question: "Can I report anonymously?",
    answer: "Yes! You can create an anonymous account that doesn't require personal details. However, we recommend providing some contact information so we can follow up and provide you with support. All communication remains confidential regardless.",
  },
  {
    question: "What types of incidents can I report?",
    answer: "You can report any form of harassment, bullying, abuse, or violence you've experienced or witnessed. This includes physical harassment, verbal abuse, cyberbullying, sexual harassment, discrimination, and any situation where you feel unsafe.",
  },
  {
    question: "Is Virtual Safe Space available in my country?",
    answer: "We currently operate across multiple African countries including Kenya, Nigeria, Uganda, Ghana, South Africa, and Tanzania. We're continuously expanding our reach. If your country isn't listed, you can still use our platform - we'll connect you with appropriate resources.",
  },
  {
    question: "How can parents/guardians get involved?",
    answer: "Parents and guardians play a crucial role in child protection. You can create an account to learn about warning signs, access resources on supporting children, and even partner with us to bring our programs to your child's school.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <HelpCircle size={16} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Got <span className="text-gradient">Questions?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We understand you might have concerns. Here are answers to the most common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 bg-card rounded-xl shadow-soft px-6 data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <span className="font-display font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="mailto:support@virtualsafespace.org" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
