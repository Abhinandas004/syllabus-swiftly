import { Target, Users, Zap, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About SyllabusToNotes</h1>
            <p className="text-xl text-muted-foreground">
              Empowering students worldwide with AI-powered study tools for smarter, faster learning
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At SyllabusToNotes, we believe that every student deserves access to quality study materials without
              spending countless hours creating notes manually. Our mission is to democratize education by leveraging
              cutting-edge AI technology to transform complex syllabi into clear, concise, and comprehensive study
              notes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand the challenges students face - tight deadlines, vast syllabi, and the need for effective
              exam preparation. That's why we've built an intelligent platform that does the heavy lifting, allowing
              students to focus on what truly matters: learning and understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Quality First",
                description: "We deliver accurate, well-structured notes that students can rely on for their studies.",
              },
              {
                icon: Zap,
                title: "Speed & Efficiency",
                description: "Generate comprehensive notes in seconds, not hours. Time is precious for students.",
              },
              {
                icon: Users,
                title: "Student-Centric",
                description: "Every feature we build is designed with student needs and feedback at the forefront.",
              },
              {
                icon: Heart,
                title: "Accessibility",
                description: "Education should be accessible to all. We offer free plans and affordable premium options.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-full w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                SyllabusToNotes was born out of a personal frustration experienced by college students who spent
                countless nights manually creating study notes from lengthy syllabi. The founders realized that with
                advancements in AI and natural language processing, this time-consuming process could be automated
                while maintaining high quality.
              </p>
              <p>
                Launched in 2024, our platform has quickly grown to serve over 10,000 students across India and
                beyond. We've processed thousands of syllabi across diverse subjects - from engineering and medicine to
                humanities and business studies.
              </p>
              <p>
                What started as a simple PDF generator has evolved into a comprehensive study companion, offering
                features like visual notes, previous year questions, and customizable templates. Our commitment to
                continuous improvement means we're constantly adding new features based on student feedback and
                emerging AI capabilities.
              </p>
              <p>
                Today, SyllabusToNotes is more than just a tool - it's a study revolution. We're proud to help
                students study smarter, save time, and achieve better academic results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: "10,000+", label: "Active Students" },
              { value: "50,000+", label: "Notes Generated" },
              { value: "100+", label: "Universities Covered" },
              { value: "4.8/5", label: "User Rating" },
            ].map((stat, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We'd love to hear from you. Reach out to our team anytime.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold rounded-md hover:shadow-lg transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
