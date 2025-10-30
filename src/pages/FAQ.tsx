import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is SyllabusToNotes?",
          a: "SyllabusToNotes is an AI-powered platform that automatically converts your course syllabus into well-structured, comprehensive study notes. Simply upload your syllabus PDF, Word document, or image, and our AI generates clean, organized notes ready for studying or printing.",
        },
        {
          q: "How do I generate my first notes?",
          a: "It's simple! Visit our homepage, click on the upload section, select your syllabus file (PDF, DOC, DOCX, or image), and click 'Generate Notes'. In seconds, your AI-generated study notes will be ready for download as a PDF.",
        },
        {
          q: "What file formats are supported?",
          a: "We support PDF, Microsoft Word (DOC, DOCX), plain text (TXT), and image files (JPG, PNG). Your syllabus can be in any of these formats, and our AI will extract and process the content effectively.",
        },
        {
          q: "How long does it take to generate notes?",
          a: "Free users typically receive notes in 30-60 seconds depending on syllabus length. Premium users get priority processing with generation times as fast as 10-15 seconds for most syllabi.",
        },
      ],
    },
    {
      category: "Features & Quality",
      questions: [
        {
          q: "How accurate are the AI-generated notes?",
          a: "Our AI uses advanced natural language processing trained on millions of educational documents. Notes are typically 95%+ accurate, covering all major topics, subtopics, and key concepts from your syllabus. Premium features add explanations and examples for even better comprehension.",
        },
        {
          q: "What's included in the free version?",
          a: "Free users can generate 1 syllabus per day and download notes in PDF format. Notes include topic summaries, key points, and basic formatting. It's perfect for trying out the platform and occasional use.",
        },
        {
          q: "What premium features are available?",
          a: "Premium unlocks: unlimited generations, AI deep notes with examples and explanations, visual notes with diagrams, previous year exam questions, custom templates, multi-format export (PDF, DOCX, PowerPoint), cloud storage, and an ad-free experience with priority support.",
        },
        {
          q: "Can I edit the generated notes?",
          a: "Yes! Premium users can export notes to DOCX format, allowing full editing in Microsoft Word or Google Docs. You can customize, add your own annotations, or merge multiple note sets.",
        },
      ],
    },
    {
      category: "Premium & Pricing",
      questions: [
        {
          q: "How much does premium cost?",
          a: "We offer flexible pricing: Pay-per-use at ₹49-₹99 per syllabus (based on complexity), Monthly Unlimited at ₹199/month for unlimited generations, or Lifetime Access at ₹499 one-time payment for permanent premium features.",
        },
        {
          q: "What's the difference between monthly and lifetime?",
          a: "Monthly subscription (₹199) gives unlimited access as long as you're subscribed. Lifetime (₹499) is a one-time payment for permanent access to all current and future premium features with no recurring fees - best value for long-term users.",
        },
        {
          q: "Can I cancel my subscription?",
          a: "Yes! Monthly subscriptions can be cancelled anytime. You'll retain premium access until the end of your current billing period. No questions asked, no cancellation fees.",
        },
        {
          q: "Do you offer student discounts?",
          a: "Currently, our pricing is already student-friendly compared to traditional tutoring or note-making services. We occasionally run promotional campaigns - follow us on social media or subscribe to our newsletter for discount alerts.",
        },
        {
          q: "Is there a money-back guarantee?",
          a: "Absolutely! If you're not satisfied with premium features within 7 days of purchase, contact our support team for a full refund. We stand behind the quality of our AI-generated notes.",
        },
      ],
    },
    {
      category: "Technical & Security",
      questions: [
        {
          q: "Is my syllabus data secure?",
          a: "Yes! We use industry-standard encryption for all uploads and data storage. Your syllabus files are processed securely and never shared with third parties. We comply with data protection regulations including GDPR.",
        },
        {
          q: "Can I access my notes later?",
          a: "Free users can download notes immediately after generation. Premium users get cloud storage, allowing access to all previously generated notes from any device, anytime through your account dashboard.",
        },
        {
          q: "Does it work on mobile devices?",
          a: "Yes! Our website is fully responsive and works perfectly on smartphones and tablets. You can upload syllabi, generate notes, and download PDFs directly from your mobile device.",
        },
        {
          q: "What subjects and courses are supported?",
          a: "SyllabusToNotes works across all academic subjects - Engineering, Medicine, Business, Humanities, Sciences, Law, and more. Our AI is trained on diverse educational content spanning 100+ universities and institutions.",
        },
      ],
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "My upload isn't working. What should I do?",
          a: "Ensure your file is under 10MB and in a supported format (PDF, DOC, DOCX, TXT, JPG, PNG). Clear your browser cache and try again. If the issue persists, contact our support team with details about the error message.",
        },
        {
          q: "The generated notes seem incomplete. Why?",
          a: "If your syllabus is poorly scanned, has low image quality, or uses uncommon fonts, AI extraction may be affected. Try uploading a clearer version. Premium users can contact support for manual review and regeneration.",
        },
        {
          q: "Can I regenerate notes if I'm not satisfied?",
          a: "Yes! Free users can regenerate after 24 hours. Premium users can regenerate immediately with different settings or templates. Each regeneration counts as one generation for pay-per-use users.",
        },
        {
          q: "I didn't receive my download link. Help?",
          a: "Check your spam/junk folder if you opted for email delivery. Otherwise, the download should start automatically after generation. Clear your browser cache and try again, or contact support for assistance.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about SyllabusToNotes, our features, pricing, and more
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">{category.category}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-card rounded-lg px-6 border border-border shadow-sm"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/contact">Contact Support</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:support@syllabustonotes.com">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
