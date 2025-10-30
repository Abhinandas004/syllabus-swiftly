import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, CheckCircle, Star, Sparkles, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast({
        title: "File uploaded!",
        description: `${uploadedFile.name} is ready for processing.`,
      });
    }
  };

  const handleGenerate = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload your syllabus first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Notes generated!",
        description: "Your study notes are ready for download.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBanner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Study Assistant</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              From Syllabus to <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Smart Notes
              </span>{" "}
              — in Seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate clean, summarized, and visual study notes from your syllabus instantly. Perfect for exam
              preparation and effective learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#upload">Generate Notes Now</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/library">See Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload Your Syllabus</h2>
              <p className="text-lg text-muted-foreground">
                Support for PDF, DOC, DOCX, TXT, and image files
              </p>
            </div>

            <div className="bg-background border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors animate-scale-in">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold mb-2">
                  {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, TXT, or images up to 10MB</p>
              </label>
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="hero"
                size="lg"
                onClick={handleGenerate}
                disabled={!file || isGenerating}
                className="min-w-[200px]"
              >
                {isGenerating ? "Generating..." : "Generate Notes"}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Free users: 1 generation per day | <Link to="/premium" className="text-primary hover:underline">Upgrade for unlimited</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to perfect study notes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Upload,
                title: "1. Upload Syllabus",
                description: "Upload your course syllabus in any format - PDF, Word, or even an image",
              },
              {
                icon: Sparkles,
                title: "2. AI Generates Notes",
                description: "Our AI analyzes and creates comprehensive, easy-to-understand study notes",
              },
              {
                icon: Download,
                title: "3. Download PDF",
                description: "Get your formatted notes as PDF, ready to study or print",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-8 shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg w-fit mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Teaser */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Premium Features</h2>
            <p className="text-lg text-muted-foreground">Take your study notes to the next level</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Sparkles, title: "AI Deep Notes", description: "Enhanced notes with examples and explanations" },
              { icon: FileText, title: "Visual Notes Mode", description: "Diagrams and better presentation" },
              { icon: CheckCircle, title: "Previous Year Q&A", description: "Exam questions automatically added" },
              { icon: Lock, title: "Ad-Free Experience", description: "No ads, faster generation" },
            ].map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 relative group hover:shadow-[var(--shadow-premium)] transition-all">
                <div className="absolute top-4 right-4">
                  <div className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                    PREMIUM
                  </div>
                </div>
                <feature.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Lock className="h-5 w-5 text-muted-foreground/50 group-hover:text-secondary transition-colors" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="premium" size="lg" asChild>
              <Link to="/premium">View Premium Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by 10,000+ Students</h2>
            <p className="text-lg text-muted-foreground">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                role: "Engineering Student",
                content: "This tool saved me hours of note-making! The AI-generated notes are accurate and well-organized.",
                rating: 5,
              },
              {
                name: "Rahul Verma",
                role: "Medical Student",
                content: "Premium features are worth every rupee. Previous year questions feature helped me ace my exams!",
                rating: 5,
              },
              {
                name: "Anjali Patel",
                role: "MBA Student",
                content: "Clean interface, fast generation, and professional-looking notes. Highly recommend!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-[var(--shadow-card)]">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Study Routine?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are studying smarter with AI-powered notes
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
            <a href="#upload">Get Started Free</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
