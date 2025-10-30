const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to SyllabusToNotes ("we," "our," or "us"). We are committed to protecting your personal
                information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website and use our AI-powered study note generation
                services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy
                policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide to Us</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you voluntarily provide to us when registering on the website, expressing
                an interest in obtaining information about us or our products and services, or otherwise contacting us.
                This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username and password)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Syllabus files and documents you upload for note generation</li>
                <li>Feedback, correspondence, and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device and usage
                patterns, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on pages, and navigation paths</li>
                <li>Referring website and search terms used to find our site</li>
                <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect or receive for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>To provide our services:</strong> Process uploaded syllabi and generate study notes using
                  AI technology
                </li>
                <li>
                  <strong>To manage accounts:</strong> Create and manage user accounts, authenticate users, and provide
                  customer support
                </li>
                <li>
                  <strong>To process payments:</strong> Handle subscription and payment transactions securely
                </li>
                <li>
                  <strong>To improve our services:</strong> Analyze usage patterns to enhance user experience and
                  develop new features
                </li>
                <li>
                  <strong>To communicate:</strong> Send service-related notifications, updates, and promotional
                  materials (you can opt out)
                </li>
                <li>
                  <strong>To ensure security:</strong> Detect and prevent fraud, abuse, and security incidents
                </li>
                <li>
                  <strong>To comply with legal obligations:</strong> Meet regulatory requirements and respond to legal
                  requests
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following situations:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (payment
                  processing, hosting, analytics) under strict confidentiality agreements
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or government regulation
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                  (users will be notified)
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly authorize us to share specific information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including
                encryption (SSL/TLS for data transmission), secure servers, access controls, and regular security
                audits. However, no method of transmission over the internet or electronic storage is 100% secure.
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in
                this privacy policy, unless a longer retention period is required by law. Uploaded syllabus files are
                typically retained for 30 days for free users and indefinitely for premium users with cloud storage.
                You can request deletion of your data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of the personal information we hold about you
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                  obligations)
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to another service provider
                </li>
                <li>
                  <strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing in certain circumstances
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@syllabustonotes.com. We will respond to your
                request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies (web beacons, pixels) to enhance your experience,
                analyze site traffic, and personalize content. Cookies are small text files stored on your device. You
                can control cookie preferences through your browser settings. However, disabling cookies may affect
                site functionality. We use both session cookies (deleted when you close your browser) and persistent
                cookies (remain until deleted or expired).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the
                privacy practices or content of these external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you believe we have collected information from a child under 13,
                please contact us immediately, and we will delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                These countries may have different data protection laws. By using our services, you consent to such
                transfers. We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Updates to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time to reflect changes in our practices, technology, or
                legal requirements. We will notify you of any material changes by posting the new privacy policy on
                this page and updating the "Last Updated" date. Your continued use of our services after such updates
                constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this privacy policy or our data practices,
                please contact us:
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground">
                  <strong>SyllabusToNotes Privacy Team</strong>
                </p>
                <p className="text-muted-foreground mt-2">Email: privacy@syllabustonotes.com</p>
                <p className="text-muted-foreground">Support: support@syllabustonotes.com</p>
                <p className="text-muted-foreground">Response time: Within 48 hours</p>
              </div>
            </section>

            <section className="bg-primary/5 border-l-4 border-primary p-6 rounded">
              <p className="text-sm text-muted-foreground">
                <strong>Important Note:</strong> This privacy policy is designed to comply with GDPR (General Data
                Protection Regulation), CCPA (California Consumer Privacy Act), and other applicable data protection
                laws. Your privacy is important to us, and we are committed to transparency and protecting your rights.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
