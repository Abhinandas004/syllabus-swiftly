const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using SyllabusToNotes ("the Service," "we," "our," or "us"), you agree to be bound by
                these Terms and Conditions ("Terms"). If you disagree with any part of these terms, you do not have
                permission to access the Service. These Terms constitute a legally binding agreement between you ("User,"
                "you," or "your") and SyllabusToNotes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SyllabusToNotes is an AI-powered platform that converts educational syllabi into structured study notes.
                The Service includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Free tier: Limited daily note generation with basic features and ad-supported experience</li>
                <li>Premium tier: Unlimited generations, advanced AI features, visual notes, previous year questions, custom templates, multi-format exports, cloud storage, and ad-free experience</li>
                <li>Pay-per-use option: Flexible pricing for individual syllabus processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
              <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access certain features, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account credentials</li>
                <li>Immediately notify us of any unauthorized access or security breach</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.2 Age Restrictions</h3>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 13 years old to use this Service. Users under 18 should obtain parental consent before using premium features that require payment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
              <h3 className="text-xl font-semibold mb-3">4.1 Permitted Uses</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may use the Service for personal educational purposes, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Generating study notes from your own academic syllabi</li>
                <li>Downloading and using generated notes for personal study</li>
                <li>Sharing notes with classmates for educational collaboration</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.2 Prohibited Uses</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Upload copyrighted content without permission from copyright holders</li>
                <li>Use the Service for commercial resale or redistribution of generated notes</li>
                <li>Attempt to reverse engineer, decompile, or extract our AI algorithms</li>
                <li>Use automated systems (bots, scrapers) to access the Service excessively</li>
                <li>Upload malicious files, viruses, or harmful code</li>
                <li>Impersonate others or provide false information</li>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Circumvent usage limits, paywalls, or security measures</li>
                <li>Use the Service to generate inappropriate, offensive, or illegal content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold mb-3">5.1 Our Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Service, including its original content (excluding user-uploaded syllabi), features, functionality, design, trademarks, logos, and AI technology, is owned by SyllabusToNotes and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.2 Your Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You retain ownership of syllabi and documents you upload. By uploading content, you grant us a limited, non-exclusive, worldwide license to process, analyze, and generate notes from your content. We do not claim ownership of your uploaded files or generated notes.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.3 Generated Notes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Notes generated by our AI belong to you for personal educational use. However, the underlying AI technology and formatting templates remain our intellectual property. You may not commercially redistribute generated notes without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payment and Subscription Terms</h2>
              <h3 className="text-xl font-semibold mb-3">6.1 Pricing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Current pricing is displayed on our Premium page:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Free Plan: ₹0 - 1 generation per day, basic features, ads</li>
                <li>Pay-per-use: ₹49-₹99 per syllabus (complexity-based pricing)</li>
                <li>Monthly Unlimited: ₹199/month for unlimited generations</li>
                <li>Lifetime Access: ₹499 one-time payment for permanent premium access</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to change prices with 30 days' notice. Existing subscribers will be grandfathered at their current rate for the remainder of their subscription period.
              </p>

              <h3 className="text-xl font-semibold mb-3">6.2 Billing and Payments</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Payments are processed securely through third-party payment gateways</li>
                <li>Monthly subscriptions auto-renew unless cancelled before the renewal date</li>
                <li>Lifetime purchases are one-time, non-recurring payments</li>
                <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Applicable taxes may be added at checkout based on your location</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.3 Refund Policy</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Free plan: No refunds applicable</li>
                <li>Pay-per-use: Refunds within 24 hours if notes fail to generate due to our error</li>
                <li>Monthly/Lifetime: 7-day money-back guarantee if you're unsatisfied with premium features</li>
                <li>Refund requests must be submitted to support@syllabustonotes.com with your order details</li>
                <li>Refunds are processed within 7-10 business days to the original payment method</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cancellation and Termination</h2>
              <h3 className="text-xl font-semibold mb-3">7.1 Cancellation by User</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may cancel your monthly subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. You'll retain premium access until that date. No partial refunds for unused portions of the billing cycle.
              </p>

              <h3 className="text-xl font-semibold mb-3">7.2 Termination by Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your account immediately, without prior notice, if you violate these Terms, engage in fraudulent activity, abuse the Service, or for any other reason we deem necessary. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Disclaimers and Limitations of Liability</h2>
              <h3 className="text-xl font-semibold mb-3">8.1 No Warranty</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>AI-generated notes will be 100% accurate or complete</li>
                <li>Generated notes will meet your specific academic requirements</li>
                <li>The Service will be free of viruses or harmful components</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">8.2 Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SYLLABUSTONOTES AND ITS AFFILIATES SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from reliance on AI-generated content</li>
                <li>Academic consequences from using generated notes</li>
                <li>Unauthorized access to or alteration of your transmissions or data</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Our total liability shall not exceed the amount you paid us in the past 12 months, or ₹500, whichever is greater.
              </p>

              <h3 className="text-xl font-semibold mb-3">8.3 Academic Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generated notes are study aids and should not replace attending classes, reading prescribed textbooks, or completing assignments. You are solely responsible for verifying the accuracy of generated content and complying with your institution's academic integrity policies. We are not responsible for academic consequences resulting from use of our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless SyllabusToNotes, its officers, directors, employees, contractors, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your infringement of any intellectual property or other rights of any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Governing Law and Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in [Your City, India].
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Before initiating legal proceedings, parties agree to attempt resolution through good-faith negotiation for 30 days. If resolution cannot be reached, either party may pursue legal action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email or prominent notice on the Service. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms. If you do not agree with the modified Terms, you must stop using the Service and may request account deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Miscellaneous</h2>
              <h3 className="text-xl font-semibold mb-3">12.1 Entire Agreement</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and SyllabusToNotes regarding use of the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.2 Severability</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.3 Waiver</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.4 Assignment</h3>
              <p className="text-muted-foreground leading-relaxed">
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground">
                  <strong>SyllabusToNotes Legal Team</strong>
                </p>
                <p className="text-muted-foreground mt-2">Email: legal@syllabustonotes.com</p>
                <p className="text-muted-foreground">General Support: support@syllabustonotes.com</p>
                <p className="text-muted-foreground">Response time: Within 48 hours</p>
              </div>
            </section>

            <section className="bg-primary/5 border-l-4 border-primary p-6 rounded">
              <p className="text-sm text-muted-foreground">
                <strong>Acknowledgment:</strong> By using SyllabusToNotes, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, please discontinue use of the Service immediately.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
