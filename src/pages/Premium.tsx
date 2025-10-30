import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Premium = () => {
  const { toast } = useToast();

  const handleUpgrade = (plan: string) => {
    toast({
      title: "Coming Soon!",
      description: `${plan} payment integration will be available soon.`,
    });
  };

  const features = {
    free: [
      "1 syllabus generation per day",
      "Basic PDF export",
      "Standard note quality",
      "Ads supported",
      "Community support",
    ],
    premium: [
      "Unlimited syllabus generation",
      "AI-powered deep notes with examples",
      "Visual notes mode with diagrams",
      "Previous year Q&A integration",
      "Custom templates & themes",
      "Multi-format export (PDF, DOCX, PPT)",
      "Cloud save access",
      "Ad-free experience",
      "Fast generation priority",
      "Premium email support",
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/20 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 rounded-full px-4 py-2 mb-6">
            <Crown className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium text-secondary">Unlock Premium Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upgrade to premium for unlimited access to AI-powered study tools and advanced features
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] border-2 border-border">
              <div className="text-center mb-6">
                <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-2">₹0</div>
                <p className="text-muted-foreground">Perfect for trying out</p>
              </div>
              <ul className="space-y-3 mb-8">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="/#upload">Get Started Free</a>
              </Button>
            </div>

            {/* Pay Per Use */}
            <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-premium)] border-2 border-secondary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-2xl font-bold mb-2">Pay Per Use</h3>
                <div className="text-4xl font-bold mb-2">
                  ₹49-₹99<span className="text-lg font-normal text-muted-foreground">/syllabus</span>
                </div>
                <p className="text-muted-foreground">Flexible pricing based on complexity</p>
              </div>
              <ul className="space-y-3 mb-8">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="premium" className="w-full" onClick={() => handleUpgrade("Pay Per Use")}>
                Get Started
              </Button>
            </div>

            {/* Monthly Plan */}
            <div className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] border-2 border-accent">
              <div className="text-center mb-6">
                <Crown className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-2">Monthly Unlimited</h3>
                <div className="text-4xl font-bold mb-2">
                  ₹199<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Best value for regular users</p>
              </div>
              <ul className="space-y-3 mb-8">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Unlimited generations</span>
                </li>
              </ul>
              <Button
                variant="hero"
                className="w-full bg-gradient-to-r from-accent to-secondary"
                onClick={() => handleUpgrade("Monthly Unlimited")}
              >
                Subscribe Now
              </Button>
            </div>
          </div>

          {/* Lifetime Option */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 border-2 border-primary/20">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                  <p className="text-muted-foreground mb-4">
                    One-time payment for lifetime access to all premium features. Best deal for serious students!
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      All premium features forever
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      Future updates included
                    </li>
                    <li className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                    ₹499
                  </div>
                  <Button variant="hero" className="w-full" onClick={() => handleUpgrade("Lifetime")}>
                    Get Lifetime Access
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Premium Unlocks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "AI Deep Notes",
                description:
                  "Enhanced notes with detailed explanations, examples, key concepts highlighted, and memory aids for better retention.",
              },
              {
                title: "Visual Notes Mode",
                description:
                  "Beautifully formatted notes with diagrams, flowcharts, mind maps, and visual hierarchies for visual learners.",
              },
              {
                title: "Previous Year Q&A",
                description:
                  "Automatically adds relevant previous examination questions based on your syllabus topics for targeted preparation.",
              },
              {
                title: "Custom Templates",
                description:
                  "Choose from modern, minimal, or classic note styles. Customize colors, fonts, and layouts to match your preference.",
              },
              {
                title: "Cloud Save",
                description:
                  "Access your generated notes from any device. All your study materials synced and available 24/7 online.",
              },
              {
                title: "Multi-Format Export",
                description:
                  "Download notes in PDF for reading, DOCX for editing, or PowerPoint for presentations. Maximum flexibility.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-6 hover:shadow-[var(--shadow-premium)] transition-all">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <Sparkles className="h-5 w-5 text-secondary mr-2" />
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I upgrade or downgrade my plan?",
                answer:
                  "Yes! You can upgrade to a premium plan anytime. If you're on monthly subscription, you can cancel before renewal.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway.",
              },
              {
                question: "Is there a money-back guarantee?",
                answer:
                  "Yes! If you're not satisfied with premium features within 7 days of purchase, we'll provide a full refund.",
              },
              {
                question: "Do lifetime members get future features?",
                answer:
                  "Absolutely! Lifetime access includes all current and future premium features at no additional cost.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Premium;
